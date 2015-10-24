import assert from 'power-assert';
import proxyquire from 'proxyquire';

import * as types from '../../src/constants/authActionTypes';


describe('actions/auth', () => {
  let actions = null;

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
