/* eslint camelcase: 0 */
import assert from 'power-assert';
import moment from 'moment';
import nock from 'nock';
import {API_ENDPOINT} from '../../src/constants/togglAPI';
import proxyquire from 'proxyquire';
import sinon from 'sinon';


describe('helpers/TogglAPIClient', () => {
  const dummyAPIToken = 'dummy_token';
  let APIClient = null;
  let apiClient = null;
  let sandbox = null;
  let mockServer = null;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    APIClient = proxyquire('../../src/helpers/TogglAPIClient', {});
    apiClient = new APIClient(dummyAPIToken);
    mockServer = nock(API_ENDPOINT);
  });
  afterEach(() => {
    sandbox.restore();
    nock.cleanAll();
  });

  describe('api methods', () => {
    const stubs = {
      ins: {},
      cls: {}
    };
    const stubRets = {
      ins: {
        get: 'called ins get method',
        post: 'called ins post method'
      },
      cls: {
        get: 'called cls get method'
      }
    };
    beforeEach(() => {
      stubs.ins.get = sandbox.stub(apiClient, 'get', () => stubRets.ins.get);
      stubs.ins.post = sandbox.stub(apiClient, 'post', () => stubRets.ins.post);
      stubs.cls.get = sandbox.stub(APIClient, 'get', () => stubRets.cls.get);
    });

    it('.login()', () => {
      const ret = APIClient.login('user', 'pass');
      assert(ret === stubRets.cls.get);
      assert(stubs.cls.get.args.length === 1);
      assert.deepEqual(stubs.cls.get.args[0], [
        '/me', {
          headers: {
            Authorization: 'Basic dXNlcjpwYXNz'
          }
        }
      ]);
    });

    it('#getTimeEntries()', () => {
      const start = new Date('2015-09-08');
      const end = new Date('2015-09-09');
      const ret = apiClient.getTimeEntries(start, end);
      assert(ret === stubRets.ins.get);
      assert(stubs.ins.get.args.length === 1);
      assert.deepEqual(stubs.ins.get.args[0], [
        '/time_entries', {
          query: {
            start_date: moment(start).format('YYYY-MM-DDTHH:mm:ssZ'),
            end_date: moment(end).format('YYYY-MM-DDTHH:mm:ssZ')
          }
        }
      ]);
    });
  });

  describe('base methods', () => {
    describe('#get()', () => {
      it('headers に api_token を含む', () => {
        mockServer.get('/dummy').reply(200, {dummy: 'dummy'});
        return apiClient.get('/dummy').then(ret => {
          const token = 'Basic ZHVtbXlfdG9rZW46YXBpX3Rva2Vu';
          assert(ret.request.headers.Authorization === token);
        });
      });
    });
    describe('.get', () => {
      it('headers に api_token を含まない', () => {
        mockServer.get('/dummy').reply(200, {dummy: 'dummy'});
        return APIClient.get('/dummy').then(ret => {
          assert(ret.request.headers[dummyAPIToken] === undefined);
        });
      });

      it('opts.headers が指定された場合 headers をセットする', () => {
        mockServer.get('/dummy').reply(200, {dummy: 'dummy'});
        const headers = {
          hoge: 'fuga',
          foo: 'bar'
        };
        return APIClient.get('/dummy', {headers}).then(ret => {
          assert(ret.request.headers.hoge === headers.hoge);
          assert(ret.request.headers.fuga === headers.fuga);
        });
      });

      it('opts.query が指定された場合 query をセットする', () => {
        mockServer.get('/dummy').query(true).reply(200, {dummy: 'dummy'});
        const query = {
          hoge: 'fuga',
          foo: 'bar'
        };
        return APIClient.get('/dummy', {query}).then(ret => {
          assert.deepEqual(ret.request.query, query);
        });
      });
    });

    describe('.post', () => {
      it('opst.data が指定された場合 json を送信する', () => {
        mockServer.post('/dummy').reply(200, {dummy: 'dummy'});
        const data = {
          hoge: 'fuga',
          foo: 'bar'
        };
        return APIClient.post('/dummy', {data}).then(ret => {
          assert.deepEqual(ret, {
            body: {dummy: 'dummy'},
            headers: {'content-type': 'application/json'},
            request: {
              data,
              headers: {},
              query: {}
            }
          });
        });
      });
    });
  });
});
