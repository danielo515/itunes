import React, { Component, Fragment } from 'react';
import MediaPlayer from './MediaPlayer';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import About from '../components/About';
import Error from '../components/Error';

const mapStateToProps = ({ api }) => ({
  // intentional non strict comparsion
  error: api.error == null ? false : true,
});

class App extends Component {
  state = {
    tab: 'player',
  };

  changeTab = (el, name) => {
    this.setState({ tab: name });
  };

  render() {
    const Toolbar = (
      <Tabs value={this.state.tab} onChange={this.changeTab} fullWidth centered>
        <Tab label="Player" value="player" />
        <Tab label="About" value="about" />
      </Tabs>
    );
    return (
      <Fragment>
        <Error
          open={this.props.error}
          message="Sorry, seems that our servers are having problems. We recommend you to refresh your browser in a while"
        />
        <Layout
          appIcon={PlayArrowIcon}
          appName={'MusicPlayer'}
          toolbar={Toolbar}
        >
          {/* we don't want to re-render this component on tab change, so just hide it */}
          <div
            style={{ display: this.state.tab === 'player' ? 'block' : 'none' }}
          >
            <MediaPlayer />
          </div>

          {this.state.tab === 'about' && <About />}
        </Layout>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(App);
