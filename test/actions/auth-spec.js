import assert from 'power-assert';
import proxyquire from 'proxyquire';
import clearRequire from 'clear-require';


describe('actions/auth', () => {
  let actions = null;
  let types = null;

  before(() => {
    clearRequire('dacho');
    types = require('../../src/constants/authActionTypes');
  });
  beforeEach(() => {
    actions = proxyquire('../../src/actions/auth', {
      '../helpers/storageUtils': {
        getItem: () => {},
        setItem: () => {},
        '@noCallThru': true
      }
    });
  });

  describe('receiveToken', () => {
    it('apiClient の戻り値を受け取って payload に入れる', () => {
      const action = actions.receiveToken('dummy');
      assert.deepEqual(action, {
        type: types.RECEIVE_TOKEN,
        payload: 'dummy'
      });
    });
  });
});
