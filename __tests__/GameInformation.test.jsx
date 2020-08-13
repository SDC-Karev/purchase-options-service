import React from 'react';
import { shallow } from 'enzyme';

import { GameInformation } from '../client/components/index.jsx';

let renderedApp;

beforeAll((done) => {
  renderedApp = shallow(<GameInformation />);
  done();
});

test('should have a single top level <div> tag', (done) => {
  expect(renderedApp.length).toBe(1);
  expect(renderedApp.name()).toBe('div');
  done();
});

test('should have one child <img> tag (temporary)', (done) => {
  expect(renderedApp.children().length).toBe(1);

  expect(renderedApp.childAt(0).name()).toBe('img');

  done();
});
