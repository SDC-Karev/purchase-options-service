import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import styles from './style.css';

import PurchaseGame from './components/PurchaseGame.jsx';
import PurchaseBundle from './components/PurchaseBundle.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: {},
      bundles: [],
    };
  }

  componentDidMount() {
    this.fetchGameData();
    console.log(this.state);
  }

  fetchGameData() {
    const gameId = 5;
    axios.get(`/api/gameById/${gameId}`)
      .then((res) => {
        this.setState({
          game: res.data,
        });
      })
      .then(() => axios.get(`/api/bundleByGameId/${gameId}`))
      .then((res) => {
        console.log(res.data);
        this.setState({
          bundles: res.data,
        });
      });
  }

  render() {
    const { game, bundles } = this.state;
    return (
      <div className={styles.purchase_options_wrapper}>
        <PurchaseGame game={game} />
        {bundles.map((bundle) => <PurchaseBundle key={bundle.bundle_id} bundle={bundle} />)}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
