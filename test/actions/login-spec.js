import assert from 'power-assert';

import * as login from '../../src/actions/login';


describe('actions/login', () => {
  describe('receiveToken', () => {
    it('token を受け取って action.token を返す', () => {
      const action = login.receiveToken('token');
      assert(action.token === 'token');
    });
  });
});
