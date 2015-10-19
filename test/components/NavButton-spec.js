import assert from 'power-assert';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ShallowTestUtils from 'react-shallow-testutils';

import {ReactNative as MockRN} from '../helpers/mock';


/** @test {NavButton} */
describe('components/NavButton', () => {
  let NavButton = null;
  let sandbox = null;
  let renderer = null;
  let label = null;
  let onPress = null;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    NavButton = proxyquire('../../src/components/NavButton', {
      'react-native': Object.assign({}, MockRN, {
        '@noCallThru': true
      })
    });
    renderer = TestUtils.createRenderer();
    label = 'button label';
    onPress = sandbox.spy();
    renderer.render(
      <NavButton
        label={label}
        onPress={onPress}
      />
    );
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('#render()', () => {
    let output = null;
    beforeEach(() => {
      output = renderer.getRenderOutput();
    });

    describe('> TouchableHighlight', () => {
      let touchableHighlight = null;
      beforeEach(() => {
        touchableHighlight = ShallowTestUtils.findWithType(output, MockRN.TouchableHighlight);
      });

      it('is TouchableHighlight', () => {
        assert(touchableHighlight);
      });

      it('onPress は #props.onPress になる', () => {
        touchableHighlight.props.onPress('dummy');
        assert(onPress.args.length === 1);
        assert.deepEqual(onPress.args[0], ['dummy']);
      });
    });

    describe('> TouchableHighlight > Text', () => {
      let text = null;
      beforeEach(() => {
        const parent = ShallowTestUtils.findWithType(output, MockRN.TouchableHighlight);
        text = ShallowTestUtils.findWithType(parent, MockRN.Text);
      });

      it('is Text', () => {
        assert(text);
      });

      it('children は #props.label になる', () => {
        assert(text.props.children, output.props.label);
      });
    });
  });
});
