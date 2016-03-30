import {assert} from 'chai';
import SplunkHttp from 'splunkhttp';

describe('SplunkHttp', () => {

    describe('send()', ()=> {

        let fakeFetch;

        before(() => {
            fakeFetch = sinon.stub(window, 'fetch');
        });

        after(() => {
            fakeFetch.restore();
        });

        it('sends a request to the splunk http event collector endpoint', () => {
            var splunk = new SplunkHttp({host: 'some.host', port: 4711, ssl: false, token: 'C0FFEE-C0FFEE-C0FFEE'});
            splunk.send({test: 123});
            assert.ok(fakeFetch.calledOnce);
            assert.equal(fakeFetch.firstCall.args[0], 'http://some.host:4711/services/collector');
            var fetchParams = fakeFetch.firstCall.args[1];
            assert.ok(!!fetchParams);
            assert.equal(fetchParams.method, 'POST');
            assert.isDefined(fetchParams.headers);
            assert.equal(fetchParams.headers.get('Authorization'), 'Splunk C0FFEE-C0FFEE-C0FFEE');
            assert.equal(fetchParams.body, '{"event":{"test":123}}');
        });

    });

});