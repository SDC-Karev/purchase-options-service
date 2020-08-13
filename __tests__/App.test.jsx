import React from 'react';
import { shallow } from 'enzyme';

import App from '../client/App.jsx';

let renderedApp;

beforeAll((done) => {
  renderedApp = shallow(<App />);
  done();
});

test('should have a single top level <div> tag', (done) => {
  expect(renderedApp.length).toBe(1);
  expect(renderedApp.name()).toBe('div');
  done();
});

test('should have two children of the <div> tag for left & right columns', (done) => {
  expect(renderedApp.children().length).toBe(2);

  expect(renderedApp.childAt(0).name()).toBe('GameInformation');

  expect(renderedApp.childAt(1).name()).toBe('PurchaseOptions');

  done();
});