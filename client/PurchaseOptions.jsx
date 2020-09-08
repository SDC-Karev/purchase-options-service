import React from 'react';
import axios from 'axios';

import { PurchaseOptionsBlock, BundleItemTooltipBlock } from './components/index';

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
    const context = e.currentTarget;
    const key = `${bundleId}_${game.game_id}`;
    this.addBundleItemToHoveredContent(game, key, context);
  }

  onBundleItemMouseExit(game, bundleId, e) {
    const context = e.currentTarget;
    const key = `${bundleId}_${game.game_id}`;
    const { hoveredGames } = this.state;
    if (!hoveredGames.hasOwnProperty(key)) {
      hoveredGames[key] = game;
    }
    hoveredGames[key].style = {
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
    const c = context.getBoundingClientRect();
    hoveredGames[key].style = {
      left: c.left - (c.width / 3) * 2,
      top: 610,
      display: 'block',
    };
    this.setState({
      hoveredGames,
    });
  }

  fetchGameData() {
    const gameId = this.props.gameId;
    console.log(gameId);
    axios.get(`/api/gameById/${gameId}`)
      .then((res) => {
        this.setState({
          game: res.data,
        });
      })
      .then(() => axios.get(`/api/bundlesByGameId/${gameId}`))
      .then((res) => {
        this.setState({
          bundles: res.data,
        });
      })
      .catch();
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
