import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
  } from 'react-places-autocomplete';

class Places extends Component {
    constructor(props) {
    super(props);
    this.state = { address: '' ,fulladdr: {}};
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => {
          this.setState({
            fulladdr : results
          })
           return getLatLng(results[0])

      })
      .then(t => {
          console.log(t)
          this.callparent(t)
      })
      .catch(error => console.error('Error', error));
  };

  callparent(cord)
  {
      let i = Object.keys(this.props).indexOf("onPosition");
      if(i!=-1)
      {
          console.log(this.state.fulladdr)
          
              let tempdata = {}
              let _t = this.state.fulladdr[0]['address_components'];
              console.log(_t);
              for(var t = 0; t < _t.length; t++)
              {
                    if(_t[t]['types'].indexOf('country')!=-1)
                    {
                        tempdata['country'] = _t[t]['long_name'];
                    }
                    if(_t[t]['types'].indexOf('administrative_area_level_1')!=-1)
                    {
                        tempdata['state'] = _t[t]['long_name'];
                    }
                    if(_t[t]['types'].indexOf('locality')!=-1)
                    {
                        tempdata['city'] = _t[t]['short_name'];
                    }
                    if(_t[t]['types'].indexOf('postal_code')!=-1)
                    {
                        tempdata['zipcode'] = _t[t]['long_name'];
                    }
              }
              //tempdata['latitude'] = coord
              console.log(tempdata);
              let address =  {
                "street": (this.state.fulladdr[0]['formatted_address']?this.state.fulladdr[0]['formatted_address']:''),
                "city": (tempdata.city?tempdata.city:''),
                "country": (tempdata.country?tempdata.country:''),
                "zipcode": (tempdata.zipcode?tempdata.zipcode:''),
                "coordinates": {
                  "latitude": (cord.lat?cord.lat:''),
                  "longitude": (cord.lng?cord.lng:'')
                }
              };
    
          this.props.onPosition(address);
      }
  }

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        onError={this._handleError}
        clearItemsOnError={true}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input form-control',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' , padding : '10px'}
                  : { backgroundColor: '#ffffff', cursor: 'pointer' , padding : '10px'};
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default Places;