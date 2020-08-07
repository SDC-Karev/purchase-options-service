import React from 'react';

var PurchaseBundle = (props) => (
  <div className="game=purchase_wrapper">
    <h1 className="game_purchase_title">
      Some Title
      <span className="plaforms_icon"> Windows</span>

    </h1>
    <p className="bundle_contents">
      Promotion details promotion date
      <div className="bundle_contents_items">
        <a href="item">
          Item 1
          <img src="#" />
        </a>
        <a href="item">
          Item 2
          <img src="#" />
        </a>
        <a href="item">
          Item 2
          <img src="#" />
        </a>
      </div>
    </p>
    <div className="game_purchase">
      <div className="discount_amount">-50%</div>
      <div className="prices">
        <div className="original_price">$100.00</div>
        <div className="discounted_price">$50.00</div>
      </div>
      <div className="btn_add_to_cart">
        <a className="btn_green btn_purchase" href="#">Add To Cart</a>
      </div>
    </div>
  </div>
);

export default PurchaseBundle;