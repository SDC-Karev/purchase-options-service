import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import style from './styles.css';

import PurchaseGame from './components/PurchaseGame.jsx';
import PurchaseBundle from './components/PurchaseBundle.jsx';


var StyledApp = styled.div`
  background-color: #1b2838;
  color: #fff;
  font-family: Arial;
`;

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      game_id: null,
      game: {},
      bundles: []
    }
  }


  render() {
    return (
      <div style={style.purchase_options_wrapper} className="purchase_options_wrapper">
        <PurchaseGame />
        {/* this.state.bundles.map((bundle) => <PurchaseBundle bundle={bundle} />*/}
        <PurchaseBundle />
      </div>
    )
  }

}


ReactDOM.render(<App />, document.getElementById('app'));