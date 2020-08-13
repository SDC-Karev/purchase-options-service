import React from 'react';
import { shallow } from 'enzyme';

import PurchaseGame from '../client/components/PurchaseGame.jsx';
import results from './expectedResults.js'

let renderedApp;

beforeAll((done) => {
  renderedApp = shallow(<PurchaseGame game={ results.gameById.exists } />);
  done();
});

test('should have a single top level <div> tag with className "game_purchase_wrapper"', (done) => {
  expect(renderedApp.length).toBe(1);
  expect(renderedApp.name()).toBe('div');
  expect(renderedApp.hasClass('game_purchase_wrapper')).toBe(true);

  done();
});

test('<div> tag should have one child: "div.game_purchase_block"', (done) => {
  expect(renderedApp.children().length).toBe(1);

  expect(renderedApp.childAt(0).name()).toBe('div');
  expect(renderedApp.childAt(0).hasClass('game_purchase_block')).toBe(true);

  done();
});

test('div.game_purchase_block tag should have two children: ["div.game_purchase_banner", "div.game_purchase"]', (done) => {
  const child = renderedApp.childAt(0);
  expect(child.children().length).toBe(2);

  expect(child.childAt(0).name()).toBe('div');
  expect(child.childAt(0).hasClass('game_purchase_banner')).toBe(true);

  expect(child.childAt(1).name()).toBe('PurchaseButtonBlock');

  done();
});

test('div.game_purchase_banner tag should have two children: ["h1", "p.game_purchase_subtitle"]', (done) => {
  const child = renderedApp.childAt(0).childAt(0);
  expect(child.children().length).toBe(2);

  expect(child.childAt(0).name()).toBe('h1');

  expect(child.childAt(1).name()).toBe('p');
  expect(child.childAt(1).hasClass('game_purchase_subtitle')).toBe(true);

  done();
});
