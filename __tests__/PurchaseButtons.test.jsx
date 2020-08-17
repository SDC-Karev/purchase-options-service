import React from 'react';
import { shallow } from 'enzyme';

import { PurchaseButton, SalePurchaseButton, PurchaseButtonBlock } from '../client/components/PurchaseButtons.jsx';
import results from './expectedResults.js'

let renderedApp;

describe('PurchaseButton Tests', () => {
  beforeAll((done) => {
    renderedApp = shallow(<PurchaseButton price={ 5000 } />);
    done();
  });

  test('should have a single top level <div> tag with className "game_purchase_data"', (done) => {
    expect(renderedApp.length).toBe(1);
    expect(renderedApp.name()).toBe('div');
    expect(renderedApp.hasClass('game_purchase_data')).toBe(true);

    done();
  });

  test('div.game_purchase_data tag should have two children: ["div.prices", "div.green_btn"', (done) => {
    expect(renderedApp.children().length).toBe(2);

    expect(renderedApp.childAt(0).name()).toBe('div');
    expect(renderedApp.childAt(0).hasClass('prices')).toBe(true);

    expect(renderedApp.childAt(1).name()).toBe('div');
    expect(renderedApp.childAt(1).hasClass('green_btn')).toBe(true);

    done();
  });

  test('div.prices tag should have one child: "div.nosale_original_price"', (done) => {
    const child = renderedApp.childAt(0);
    expect(child.children().length).toBe(1);

    expect(child.childAt(0).name()).toBe('div');
    expect(child.childAt(0).hasClass('nosale_original_price')).toBe(true);

    done();
  });

  test('div.green_btn tag should have one child: "a.btn_purchase"', (done) => {
    const child = renderedApp.childAt(1);
    expect(child.children().length).toBe(1);

    expect(child.childAt(0).name()).toBe('a');
    expect(child.childAt(0).hasClass('btn_purchase')).toBe(true);

    done();
  });

  test('a.btn_purchase tag should have one child: "span"', (done) => {
    const child = renderedApp.childAt(1).childAt(0);
    expect(child.children().length).toBe(1);

    expect(child.childAt(0).name()).toBe('span');

    done();
  });

})

describe('SalePurchaseButton Tests', () => {
  beforeAll((done) => {
    renderedApp = shallow(<SalePurchaseButton price={ 5000 } saleAmount={ -50 }/>);
    done();
  });

  test('should have a single top level <div> tag with className "game_purchase_data"', (done) => {
    expect(renderedApp.length).toBe(1);
    expect(renderedApp.name()).toBe('div');
    expect(renderedApp.hasClass('game_purchase_data')).toBe(true);

    done();
  });

  test('div.game_purchase_data tag should have three children: ["div.discount_pct_amount","div.prices", "div.green_btn"', (done) => {
    expect(renderedApp.children().length).toBe(3);

    expect(renderedApp.childAt(0).name()).toBe('div');
    expect(renderedApp.childAt(0).hasClass('discount_pct_amount')).toBe(true);

    expect(renderedApp.childAt(1).name()).toBe('div');
    expect(renderedApp.childAt(1).hasClass('prices')).toBe(true);

    expect(renderedApp.childAt(2).name()).toBe('div');
    expect(renderedApp.childAt(2).hasClass('green_btn')).toBe(true);

    done();
  });

  test('div.prices tag should have two child: ["div.original_price", "div.discounted_price"', (done) => {
    const child = renderedApp.childAt(1);
    expect(child.children().length).toBe(2);

    expect(child.childAt(0).name()).toBe('div');
    expect(child.childAt(0).hasClass('original_price')).toBe(true);

    expect(child.childAt(1).name()).toBe('div');
    expect(child.childAt(1).hasClass('discounted_price')).toBe(true);

    done();
  });

  test('div.green_btn tag should have one child: "a.btn_purchase"', (done) => {
    const child = renderedApp.childAt(2);
    expect(child.children().length).toBe(1);

    expect(child.childAt(0).name()).toBe('a');
    expect(child.childAt(0).hasClass('btn_purchase')).toBe(true);

    done();
  });

  test('a.btn_purchase tag should have one child: "span"', (done) => {
    const child = renderedApp.childAt(2).childAt(0);
    expect(child.children().length).toBe(1);

    expect(child.childAt(0).name()).toBe('span');

    done();
  });

});

describe('PurchaseButtonBlock Tests', () => {
  test('should have a single top level <div> tag with className "game_purchase"', (done) => {
    renderedApp = shallow(<PurchaseButtonBlock price={ 5000 } saleAmount={ -50} />);

    expect(renderedApp.length).toBe(1);
    expect(renderedApp.name()).toBe('div');
    expect(renderedApp.hasClass('game_purchase')).toBe(true);

    done();
  });

  test('div.game_purchase tag should have one child (if there is a sale): ["SalePurchaseButton"]', (done) => {
    renderedApp = shallow(<PurchaseButtonBlock price={ 5000 } saleAmount={ -50} />);

    expect(renderedApp.childAt(0).name()).toBe('SalePurchaseButton');

    done();
  });

  test('div.game_purchase tag should have one child (if there is no sale): ["PurchaseButton"]', (done) => {
    renderedApp = shallow(<PurchaseButtonBlock price={ 5000 } saleAmount = { 0 } />);

    expect(renderedApp.childAt(0).name()).toBe('PurchaseButton');

    done();
  });
});