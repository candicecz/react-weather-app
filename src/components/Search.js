import React, {Component} from 'react';
import { browserHistory as history } from 'react-router/lib';
import GOOGLE_MAPS_API_KEY from './GoogleMapsKey';


class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  // _handleSearch = (e) => {
  //   fetch(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`)
  //   .then(res => {
  //     var input = e.target.value
  //     var searchBox = new google.maps.places.SearchBox(input);
  //
  //
  //   })
  //
  // }

  _handleSubmit = () => {
    history.push(`/location/${this.refs.userInput.value}`)
  }


  render() {
    return (
      <div className='searchBody'>
        <form onSubmit={this._handleSubmit}>
          <input placeholder='Enter Your Location' className="searchBar" ref="userInput" type="text" />
          <button className="searchButton">Search The Weather</button>
        </form>
      </div>
    );
  }
}

export default Search;
