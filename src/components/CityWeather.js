import React, {Component} from 'react';
import GOOGLE_MAPS_API_KEY from './GoogleMapsKey';
import DARKSKY_API_KEY from './DarkSkyKey';
import WeatherIcon from './WeatherIcon';

class CityWeather extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading:false,
      icon:"",
      imgLoading:false
    }
  }


  componentDidMount() {
    this.setState({
      loading:true,
      imgLoading:false
    })
    this._fetchCityCoords()
  }

//fetches city coordinates
  _fetchCityCoords = () => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.props.params.city}&key=${GOOGLE_MAPS_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      var location = data.results[0].formatted_address
      var lat = data.results[0].geometry.location.lat
      var lng = data.results[0].geometry.location.lng
      this._fetchWeather(lat, lng, location)
    })
  }

//uses city coordinates to fetch weather
  _fetchWeather = (lat, lng, location) => {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${lat},${lng}?units=si`)
    .then(response => response.json())
    .then(data => {
      this.setState({
        location:location,
        currentTemp:Math.round(data.currently.temperature),
        summary: data.currently.summary,
        humidity: Math.round(data.currently.humidity*100),
        precipitationPercentage:Math.round(data.daily.data[0].precipProbability*100),
        precipitationType:data.daily.data[0].precipType,
        icon:data.currently.icon,
        loading:false,
      })
    })
    .catch(console.error('fetching weather failed'))
  }


  _retrieveBackgroundImage = (data) => {
    if(data) {
      this.setState({
        backgroundImage: data.urls.regular,
        photographerCredit:data.user.name,
        photographerProfileURL:data.user.links.html,
        imgLoading:true
      })
    }
    else {
      console.error('Unsplash is not returning an image')
    }
  }
//&deg;C
  render() {
    return (
      <div className='weatherInformation'>
          {this.state.loading && !this.state.imgLoading? <h2 className='loading'>L O A D I N G</h2> :
            <div>
              <div className = "row" style = {{
                'minHeight':'100vh',
                'minWidth': '100vh',
                'backgroundImage':`url(${this.state.backgroundImage})`,
                'backgroundSize':'cover',
                'backgroundRepeat': 'no-repeat'}}>
                <div className="section">
                  <div className="container">
                    <h2 className="temp">{this.state.currentTemp}&deg;C</h2>
                    <h2>{this.state.location}</h2>
                    <h2>{this.state.summary}</h2>
                    <h2>humidity: {this.state.humidity}%</h2>
                    {this.state.precipitationPercentage == 0 ? <h2> {this.state.precipitationPercentage}% chance of precipitation</h2> : <h2>{this.state.precipitationPercentage}% chance of {this.state.precipitationType}</h2>}
                    <WeatherIcon
                      icon = {this.state.icon}
                      backgroundImage = {this._retrieveBackgroundImage}
                    />
                  </div>
                </div>
                <h6>Photo <a href={this.state.photographerProfileURL}>{this.state.photographerCredit}</a> / <a href="https://unsplash.com/"> Unsplash </a></h6>
              </div>
          </div>
          }
        </div>

    );
  }
}

export default CityWeather;
