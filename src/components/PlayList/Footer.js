import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  toolbar: {
    alignItems: 'center',
  },
  grow: {
    flexGrow: 1,
  },
});

class Footer extends PureComponent {
  render() {
    const { props } = this;
    const { totalSongs, totalFavorites, classes } = props;
    return (
      <div className={props.classes.root}>
        <AppBar position="static" color="default">
          <Toolbar classes={{ root: classes.toolbar }} variant="dense">
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Songs: {totalSongs}
            </Typography>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Favorites: {totalFavorites}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Footer.propTypes = {
  totalFavorites: PropTypes.number.isRequired,
  totalSongs: PropTypes.number.isRequired,
};

export default withStyles(styles)(Footer);
