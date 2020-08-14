import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import styles from './style.css';
import { PurchaseOptions, GameInformation } from './components/index.jsx';

const BundleItemTooltip = ({ game, style }) => (
  <div className={styles.game_tooltip} style={style}>
    <div className={styles.game_tooltip_spacer}></div>
    <div className={styles.game_tooltip_content}>
      <h4 className={styles.game_tooltip_title}>{game.game_name}</h4>
      <div className={styles.game_tooltip_releasedate}>
        <span>{`${new Date(game.game_release_date).toDateString(). substring(4, 7)} ${new Date(game.game_release_date).getDay()}, ${new Date(game.game_release_date).getFullYear()}`}</span>
      </div>
      <p className={styles.game_tooltip_body_content}>{`Contains 1 item: ${game.game_name}`}</p>
      <div className={styles.game_tooltip_tag_block}>
        User Tags:
        <div className={styles.game_tooltip_tag_row}>
          {game.tags.map((tag) => <div key={tag.tag_id} className={styles.game_tooltip_tag}>{tag.tag_name}</div>)}
        </div>
      </div>
    </div>
  </div>
);

const BundleTooltip = ({ games }) => (
  <div className={styles.game_tooltip_wrapper}>
    <div className={styles.game_tooltip_container}>
      {Object.keys(games).map((gameKey) => <BundleItemTooltip key={ games[gameKey].game_id } game={ games[gameKey] } style={ games[gameKey].style } />)}
    </div>
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: {},
      bundles: [],
      hovered_games: {},
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

  addBundleItemToHoveredContent (game, bundle_id, context) {
    const games = this.state.hovered_games;
    if (!game.hasOwnProperty(game.game_id)) {
      games[`${bundle_id}_${game.game_id}`] = game;
    };
    games[`${bundle_id}_${game.game_id}`] .style = {
      left: context.left + context.width,
      top: context.top,
    };
    this.setState({
      hovered_games: games,
    });
  }

  onBundleItemHover(game, bundle_id, e) {
    const context = e.currentTarget.getBoundingClientRect();
    this.addBundleItemToHoveredContent(game, bundle_id, context);
  }

  render() {
    const { game, bundles, hovered_games } = this.state;
    return (
      <div>
        <div className={styles.game_info_wrapper}>
          <GameInformation game={game} />
          <PurchaseOptions game={game} bundles={bundles} onBundleItemHover={this.onBundleItemHover.bind(this)}/>
        </div>
        <BundleTooltip games={ hovered_games }/>
      </div>
    );
  }
}

export default App;
