import React from 'react';

var PurchaseGame = (props) => (
  <div className="game=purchase_wrapper">
    <div className="game_purchase_banner">
      <h1 className="game_purchase_title">
       Some Title
      </h1>
      <p className="game_purchase_subtitle">
        Promotion details promotion date
      </p>
      <span className="plaforms-icon">Windows</span>
    </div>
    <div className="game_purchase">
      <div className="discount_amount">-50%</div>
      <div className="prices">
        <div className="original_price">$100.00</div>
        <div className="discounted_price">$50.00</div>
      </div>
      <div className="btn_add_to_cart">
        <a className="btn_purchase_link" href="#">Add To Cart</a>
      </div>
    </div>
  </div>
);

export default PurchaseGame;