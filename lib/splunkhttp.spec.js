import {assert} from 'chai';
import SplunkHttp from 'splunkhttp';

describe('SplunkHttp', () => {

    describe('send()', ()=> {

        let fakeXHR, fakeRequestCount = 0, lastRequest;

        before(() => {
            fakeRequestCount = 0;
            lastRequest = null;
            fakeXHR = sinon.useFakeXMLHttpRequest();
            fakeXHR.onCreate = req => {
                fakeRequestCount++;
                lastRequest = req;
            }
        });

        after(() => {
            fakeXHR.restore();
        });

        it('sends a request to the splunk http event collector endpoint', () => {
            var splunk = new SplunkHttp({host: 'some.host', port: 4711, ssl: false, token: 'C0FFEE-C0FFEE-C0FFEE'});
            splunk.send({test: 123});
            assert.equal(fakeRequestCount, 1);
            assert.equal(lastRequest.url, 'http://some.host:4711/services/collector');
            assert.equal(lastRequest.method, 'POST');
            assert.isDefined(lastRequest.requestHeaders.Authorization);
            assert.equal(lastRequest.requestHeaders.Authorization, 'Splunk C0FFEE-C0FFEE-C0FFEE');
            assert.equal(lastRequest.requestBody, '{"event":{"test":123}}');
        });

    });

});