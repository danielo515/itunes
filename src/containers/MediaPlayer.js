import React, { Component } from 'react';
import MobilePlaylist from '../components/PlayList/mobile';
import Player from '../components/Player/Player';
import TwoCol from '../components/TwoCol';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators as playerActions } from '../modules/player';
import { actionCreators as listActions } from '../modules/playList';
import { actionCreators as apiActions } from '../modules/api';

const mapStateToProps = ({ player, playList, api }) => ({
  playing: player.playing,
  cover: player.cover,
  current: playList.current, // TODO: make this a selected prop derived from current idx
  api,
  playList,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...playerActions, ...listActions, ...apiActions },
    dispatch
  );

class MediaPlayer extends Component {
  componentDidMount() {
    this.props.fetchSongs();
  }

  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps(nextProps) {
    if (nextProps.current.id !== this.props.current.id) {
      this.props.getCoverUrl(nextProps.current.id);
    }
  }

  render() {
    const props = this.props;
    const { playList } = props;
    return (
      <TwoCol
        left={
          <Player
            song={playList.current}
            next={props.next}
            previous={props.previous}
            cover={props.cover}
          />
        }
        right={
          <MobilePlaylist
            like={props.like}
            onSortChange={props.sortBy}
            onSelect={props.select}
            dislike={props.unlike}
            // Static props
            sortBy={playList.sortBy}
            data={playList.songs}
            favorites={playList.favorites}
            selected={playList.current.title}
            loading={props.api.loading}
          />
        }
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaPlayer);
