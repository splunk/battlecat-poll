import {assert} from 'chai';
import {parseQueryString} from 'querystring';

describe('querystring utility', () => {

    describe('parseQueryString()', () => {

        it("parses simple query string", () => {
            let parsed = parseQueryString('?foo=bar');
            assert.deepEqual(parsed, {foo: 'bar'});

            parsed = parseQueryString('?foo=bar&ding=baz');
            assert.deepEqual(parsed, {foo: 'bar', ding: 'baz'});
        });

        it("overrides properties if contained multiple times in the query string", () => {
            let parsed = parseQueryString('?foo=bar&foo=baz&ding=foo');
            assert.deepEqual(parsed, {foo: 'baz', ding: 'foo'});
        });

        it("ignores a string that does not start with ?", () => {
            assert.deepEqual(parseQueryString('foo=bar'), {});
        });

    });

});