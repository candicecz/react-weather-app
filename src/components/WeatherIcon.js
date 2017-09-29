import React, {Component} from 'react';
import cloudy from '../images/Cloud.svg';
import cloudyday from '../images/Cloud-Sun.svg';
import cloudynight from '../images/Cloud-Moon.svg';
import fog from '../images/Cloud-Fog-Alt.svg';
import moon from '../images/Moon.svg';
import none from '../images/Cloud-Fog.svg'
import rain from '../images/Cloud-Drizzle-Alt.svg';
import snow from '../images/Cloud-Snow.svg';
import sleet from '../images/Cloud-Drizzle.svg';
import sun from '../images/Sun.svg';
import thunderstorm from '../images/Cloud-Lightning.svg';
import tornado from '../images/Tornado.svg';
import wind from '../images/Cloud-Wind.svg';
import UNSPLASH_APPLICATION_ID from './UnsplashKey';


class WeatherIcon extends Component {
  constructor(props){
    super(props);
    this.state = {
      query:this.props.icon,
      random: Math.floor(Math.random()*5 + 1)
    }
  }

  componentDidMount(){
    this._fetchData()
  }

  _fetchData = () => {
    fetch(`https://api.unsplash.com/search/photos/?page=1&per_page=10&query=weather-${this.state.query}&client_id=${UNSPLASH_APPLICATION_ID}`)
    .then(response => response.json())
    .then(data => {
      this.props.backgroundImage(data.results[this.state.random])
    })
  }

  render() {
    let image = this.state.image

    switch(this.props.icon) {
      case 'clear-day' :
          image = sun;
      break;
      case 'clear-night' :
          image = moon;
      break;
      case 'cloudy' :
          image = cloudy;
      break;
      case 'fog' :
          image = fog;
      break;
      case 'partly-cloudy-day' :
          image = cloudyday;
      break;
      case 'partly-cloudy-night' :
          image = cloudynight;
      break;
      case 'rain' :
          image = rain;
      break;
      case 'snow' :
          image = snow;
      break;
      case 'sleet' :
          image = sleet;
      break;
      case 'thunderstorm' :
          image = thunderstorm;
      break;
      case 'tornado' :
          image = tornado;
      break;
      case 'wind' :
          image = wind;
      break;
      default:
          image = none;
      break;

    }

    return (
      <div>
        {this.props.icon ?
          <img src={image} alt= "weatherIcon"/> : <img src={none} alt= "weatherIcon"/>}
      </div>
    );
  }
}

export default WeatherIcon;
