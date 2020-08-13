import React from 'react';
import { shallow } from 'enzyme';

import { PurchaseOptions } from '../client/components/index.jsx';
import results from './expectedResults.js'

let renderedApp;

beforeAll((done) => {
  renderedApp = shallow(<PurchaseOptions game={ results.gameById.exists } bundles={ results.bundleByGameId.exists }/>);
  done();
});

test('should have a single top level <div> tag', (done) => {
  expect(renderedApp.length).toBe(1);
  expect(renderedApp.name()).toBe('div');
  done();
});

test('<div> tag should always have one child: "PurchaseGame"', (done) => {
  expect(renderedApp.children().length).toBe(2);

  expect(renderedApp.childAt(0).name()).toBe('PurchaseGame');

  expect(renderedApp.childAt(1).name()).toBe('PurchaseBundle');

  done();
});
