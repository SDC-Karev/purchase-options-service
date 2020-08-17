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

test('should have a single top level <div> tag', (done) => {
  expect(renderedApp.childAt(0).length).toBe(1);
  expect(renderedApp.childAt(0).name()).toBe('div');
  expect(renderedApp.childAt(0).hasClass('game_info_wrapper')).toBe(true);

  expect(renderedApp.childAt(1).name()).toBe('BundleItemTooltipBlock');

  done();
});

test('div.game_info_wrapper should have 2 children of the <div> tag for left & right columns', (done) => {
  const child = renderedApp.childAt(0);
  expect(child.children().length).toBe(2);

  expect(child.childAt(0).name()).toBe('GameInformation');

  expect(child.childAt(1).name()).toBe('PurchaseOptions');

  done();
});