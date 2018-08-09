import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseArrowIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import {connect} from "react-redux";
import {selectedSong, fetchRecommendations} from '../../actions/userActions'

const styles = theme => ({
  card: {
    display: 'flex',
    backgroundColor:'black',

  },
  details: {
    display: 'flex',
    flexDirection: 'column',

  },
  content: {
    flex: '1 0 auto',

  },
  cover: {
    width: 151,
    height: 151,

  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    marginLeft:920,
    color:'white'
  },

  playIcon: {
    height: 38,
    width: 38,
    color:'white',

  },
  pauseIcon: {
    height: 38,
    width: 38,
    color:'white',

  },

  controlIcons:{
    height: 88,
    width: 38,
    color:'white',

  },

  albumimage:{
    height:600,
    marginLeft:700
  },
  headline:{
    color:'white',
    marginLeft:840
  }
});

class MediaControlCard extends PureComponent {
  
  audio=new Audio();
  state={playing:false}

  playTrack = (song) => {
 
    this.setState({playing:true})
      
    this.props.selectedSong(song)
    this.audio.src =song.preview_url
    this.audio.play()
    // if(this.props.currentSong.id!==song.id)
    this.props.fetchRecommendations(this.props.token, song.artists[0].id, song.id)
  }

    pauseTrack=()=>{

      this.setState({playing:false})
      this.audio.pause()
    }

  

   render()
   {

    const currentTrack = this.props.currentSong;
  
    const { classes, theme } = this.props;

   if(!currentTrack)
   return null

   return (
    <div>
      <Card className={classes.card}>
        <div className={classes.details}> Currently Playing
          <CardContent className={classes.content}>
            <img src={currentTrack.album.images[0].url} alt='song' className={classes.albumimage}/>
            <Typography className={classes.headline} variant="headline">{currentTrack.album.name}</Typography>
            <Typography className={classes.headline} variant="subheading" color="textSecondary">
              {currentTrack.artists[0].name}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton className={classes.controlIcons} aria-label="Previous">
              {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
            </IconButton>
            <IconButton  aria-label="Play/pause">
              {this.state.playing? <PauseArrowIcon className={classes.pauseIcon} onClick={this.pauseTrack}/>:
              <PlayArrowIcon className={classes.playIcon} onClick={()=>this.playTrack(currentTrack)}/>}
         
            </IconButton>
            <IconButton  className={classes.controlIcons} aria-label="Next">
              {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
            </IconButton>
          </div>
        </div>
        <CardMedia
          className={classes.cover}
          image="/static/images/cards/live-from-space.jpg"
          title="Live from space album cover"
        />
      </Card>
    </div>
  );
}
}

const mapStateToProps = (state) => {

  return {
    token: state.tokenReducer.token,
    currentSong: state.currentSongReducer.currentSong
  };

};

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps,{selectedSong,fetchRecommendations})(MediaControlCard));