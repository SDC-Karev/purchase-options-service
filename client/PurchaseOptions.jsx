import React from 'react';
import axios from 'axios';
import faker from 'faker';

import styles from './style.css';
import { PurchaseOptionsBlock, BundleItemTooltipBlock } from './components/index.jsx';

class PurchaseOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: {},
      bundles: [],
      hoveredGames: {},
    };
  }

  componentDidMount() {
    this.fetchGameData();
  }

  onBundleItemMouseEnter(game, bundleId, e) {
    const context = e.currentTarget.getBoundingClientRect();
    const key = `${bundleId}_${game.game_id}`;
    this.addBundleItemToHoveredContent(game, key, context);
  }

  onBundleItemMouseExit(game, bundleId, e) {
    const context = e.currentTarget.getBoundingClientRect();
    const key = `${bundleId}_${game.game_id}`;
    const { hoveredGames } = this.state;
    if (!hoveredGames.hasOwnProperty(key)) {
      hoveredGames[key] = game;
    }
    hoveredGames[key].style = {
      left: context.left + context.width,
      top: context.top,
      display: 'none',
    };
    this.setState({
      hoveredGames,
    });
  }

  addBundleItemToHoveredContent(game, key, context) {
    const { hoveredGames } = this.state;
    if (!hoveredGames.hasOwnProperty(key)) {
      hoveredGames[key] = game;
    }
    hoveredGames[key].style = {
      left: context.left + context.width,
      top: context.top,
      display: 'block',
    };
    this.setState({
      hoveredGames,
    });
  }

  fetchGameData() {
    const gameId = 11;
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
    const { game, bundles, hoveredGames } = this.state;
    return (
      <div>
        <PurchaseOptionsBlock
          game={game}
          bundles={bundles}
          onBundleItemMouseEnter={this.onBundleItemMouseEnter.bind(this)}
          onBundleItemMouseExit={this.onBundleItemMouseExit.bind(this)}
        />
        <BundleItemTooltipBlock games={hoveredGames} />
      </div>
    );
  }
}

export default PurchaseOptions;
