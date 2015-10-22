import assert from 'power-assert';

import * as login from '../../src/actions/auth';
import * as types from '../../src/constants/authActionTypes';


describe('actions/auth', () => {
  describe('receiveToken', () => {
    it('apiClient の戻り値を受け取って payload に入れる', () => {
      const action = login.receiveToken('dummy');
      assert.deepEqual(action, {
        type: types.RECEIVE_TOKEN,
        payload: 'dummy'
      });
    });
  });
});
