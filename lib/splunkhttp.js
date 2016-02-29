import $ from 'jquery';

export default class SplunkHttp {

    constructor({host='localhost', port=8088, ssl=true, token=null}) {
        let proto = ssl ? 'https' : 'http';
        this.url = `${proto}://${host}:${port}/services/collector`;
        this.token = token;
    }

    send(data) {
        console.log('Sending', data);
        return new Promise((resolve, reject) =>
            this.xhr({
                method: 'POST',
                url: this.url,
                data: typeof data === 'string' ? data : JSON.stringify({event: data}),
                headers: {
                    'Authorization': `Splunk ${this.token}`
                },
                success: (data, status, xhr) => resolve(data),
                error: (xhr, status, error) => reject(error)
            })
        );
    }

    xhr({method, url, data, headers, success, error}) {
        // TOOD: Replace with plain XHR instead of jquery
        $.ajax({
            method: method,
            url: url,
            data: data,
            headers: headers,
            success: success,
            error: error
        });
    }

}
