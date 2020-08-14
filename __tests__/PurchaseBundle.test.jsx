import React from 'react';
import { shallow } from 'enzyme';

import PurchaseBundle from '../client/components/PurchaseBundle.jsx';
import results from './expectedResults.js'

let renderedApp;

beforeAll((done) => {
  renderedApp = shallow(<PurchaseBundle bundle={ results.bundleByGameId.exists[0] } />);
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

test('div.game_purchase_block tag should have four children: ["div.game_platforms", "BasicTooltip", "p.bundle_info", "div.bundle_contents", "BurchaseButtonBlock"]', (done) => {
  const child = renderedApp.childAt(0);
  expect(child.children().length).toBe(5);

  expect(child.childAt(0).name()).toBe('div');
  expect(child.childAt(0).hasClass('game_platforms')).toBe(true);

  expect(child.childAt(1).name()).toBe('BasicTooltip');

  expect(child.childAt(2).name()).toBe('p');
  expect(child.childAt(2).hasClass('bundle_info')).toBe(true);

  expect(child.childAt(3).name()).toBe('div');
  expect(child.childAt(3).hasClass('bundle_contents')).toBe(true);

  expect(child.childAt(4).name()).toBe('PurchaseButtonBlock');

  done();
});

test('div.bundle_contents tag should have one child: ["div.bundle_items_block"]', (done) => {
  const child = renderedApp.childAt(0).childAt(3);
  expect(child.children().length).toBe(1);

  expect(child.childAt(0).name()).toBe('div');
  expect(child.childAt(0).hasClass('bundle_items_block')).toBe(true);

  done();
});

test('div.bundle_items_block tag should have one child: ["div.bundle_contents_items"]', (done) => {
  const child = renderedApp.childAt(0).childAt(3).childAt(0);
  expect(child.children().length).toBe(1);

  expect(child.childAt(0).name()).toBe('div');
  expect(child.childAt(0).hasClass('bundle_contents_items')).toBe(true);

  done();
});

test('div.bundle_items_block tag should have one child: ["GameTooltip"]', (done) => {
  const child = renderedApp.childAt(0).childAt(3).childAt(0).childAt(0);
  expect(child.children().length).toBe(1);

  expect(child.childAt(0).name()).toBe('GameTooltip');

  done();
});
