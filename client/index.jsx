import React from 'react';
import ReactDOM from 'react-dom';
import styles from './style.css';

import PurchaseGame from './components/PurchaseGame';
import PurchaseBundle from './components/PurchaseBundle';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game_id: null,
      game: {},
      bundles: [],
    };
  }

  render() {
    return (
      <div className={styles.purchase_options_wrapper}>
        <PurchaseGame />
        {/* this.state.bundles.map((bundle) => <PurchaseBundle bundle={bundle} /> */}
        <PurchaseBundle />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
