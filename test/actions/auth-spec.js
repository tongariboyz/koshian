import assert from 'power-assert';

import * as login from '../../src/actions/auth';


describe('actions/auth', () => {
  describe('receiveToken', () => {
    it('token を受け取って action.token を返す', () => {
      const action = login.receiveToken('token');
      assert(action.token === 'token');
    });
  });
});
