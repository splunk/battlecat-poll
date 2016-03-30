import 'isomorphic-fetch';

/**
 * Helper for sending data to a Splunk HTTP input
 */
export default class SplunkHttp {

    constructor({host='localhost', port=8088, ssl=true, token=null}) {
        let proto = ssl ? 'https' : 'http';
        this.url = `${proto}://${host}:${port}/services/collector`;
        this.token = token;
        this.status = null;
        this.statusCallbacks = [];
    }

    setStatus(newStatus) {
        if (newStatus !== this.status) {
            this.status = newStatus;
            for (let cb of this.statusCallbacks) {
                cb(newStatus);
            }
        }
    }

    onStatusChange(cb, scope) {
        if (scope) {
            cb = cb.bind(scope);
        }
        this.statusCallbacks(cb);
    }
    
    send(data) {
        if (DEBUG) {
            console.log('Sending', data);
        }
        return new Promise((resolve, reject) =>
            this.xhr({
                method: 'POST',
                url: this.url,
                data: typeof data === 'string' ? data : JSON.stringify({event: data}),
                headers: {
                    'Authorization': `Splunk ${this.token}`
                },
                success: (data, status, xhr) => {
                    this.setStatus('connected');
                    resolve(data);
                },
                error: (xhr, status, error) => {
                    this.setStatus('disconnected');
                    reject(error);
                }
            })
        );
    }

    xhr({method, url, data, headers, success, error}) {
        fetch(url, {
            method: method,
            headers: new Headers(headers),
            mode: 'cors',
            redirect: 'error',
            cache: 'no-cache',
            body: data
        }).then(success).catch(error);
    }

}
