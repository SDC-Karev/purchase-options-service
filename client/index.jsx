import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import styles from './style.css';
import { PurchaseOptions, GameInformation } from './components';

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
  }

  fetchGameData() {
    const gameId = 3;
    axios.get(`/api/gameById/${gameId}`)
      .then((res) => {
        this.setState({
          game: res.data,
        });
      })
      .then(() => axios.get(`/api/bundleByGameId/${gameId}`))
      .then((res) => {
        this.setState({
          bundles: res.data,
        });
      });
  }

  render() {
    const { game, bundles } = this.state;
    return (
      <div className={styles.game_info_wrapper}>
        <GameInformation game={game} />
        <PurchaseOptions game={game} bundles={bundles} />
      </div>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
