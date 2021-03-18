import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@material-ui/icons/Room';
import {Input, MenuItem, Select, Button} from '@material-ui/core';
import 'assets/style/formView.css';

const MyInput = ({ field, form, ...props }) => {
   return <Input className='twoesys-formView__input' {...field} {...props} />;
 };

 const MySelect = ({ field, form, ...props}) => {
  return <Select displayEmpty labelId='helper-label' className='twoesys-formView__input' {...field} {...props} />;
};

class AirportForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapZoom: 12,
      draggable: true,
      lat: this.props.airport === undefined ? 45.746686123840526 : parseFloat(this.props.airport.location.split(', ')[0]),
      lng: this.props.airport === undefined ? 16.045964602812305 : parseFloat(this.props.airport.location.split(', ')[1]),
    };

    this.googleMaps = null;
  }

  handleSubmit = data => {
    data.location = `${this.state.lat}, ${this.state.lng}`

    if (this.props.airport && this.props.airport.id) {
      data.id = this.props.airport.id;
    }

    this.props.onSubmit(data);
  };

  handleCancel = () => {
    this.props.onCancel();
  };

  mapLoaded = (map) => {
    this.googleMaps = map;
  };

  onMarkerMove = (key, currentValues, newValues) => {
    this.setState({
      draggable: false,
    });
    this.changeLatitude(null, newValues.lat);
    this.changeLongitude(null, newValues.lng);
  };

  onMarkerDown = () => {
    this.setState({
      draggable: true,
    });
  };

  changeLatitude = (e, val) => {
    this.setState({
      lat: val,
    });
  };

  changeLongitude = (e, val) => {
    this.setState({
      lng: val,
    });
  };

  render () {
    const {airport, countries} = this.props;

    const marker = {
      id: airport === undefined ? null : airport.id,
      size: { width: 62, height: 60 },
      origin: { x: 15 / 62, y: 1 },
      withText: false,
    };

    return (
      <Formik
        initialValues={{
          name: airport && airport.name ? airport.name : '',
          country: airport && airport.country ? airport.country : '',
          departingFrom: airport && airport.departingFrom ? airport.departingFrom : '',
          landingTo: airport && airport.landingTo ? airport.landingTo : '',
        }}
        onSubmit={(values) => {
          this.handleSubmit(values);
        }}
      >
          <Form>
            <Field id="name" name="name" placeholder="Name" component={MyInput}/>
            <Field id="country" name="country" placeholder="Country" component={MySelect}>
              <MenuItem value='' selected disabled>Choose Country</MenuItem>
              {countries.map(country => (<MenuItem key={country.id} value={country.name}>{country.name}</MenuItem>))}
            </Field>
            <Field
              id="departingFrom"
              name="departingFrom"
              placeholder="Departing from"
              component={MyInput}
            />
            <Field id="landingTo" name="landingTo" placeholder="Landing to" component={MyInput} />
            <label htmlFor="location">Location</label>
              <div className='twoesys-formView__map'>
                <GoogleMapReact
                  bootstrapURLKeys={{key: 'AIzaSyCE_hqyzF4Zm4T3py8ieljazaeyiwa678A'}}
                  name="map"
                  defaultZoom={10}
                  center={{
                    lat: airport === undefined ? 45.746686123840526 : parseFloat(airport.location.split(', ')[0]),
                    lng: airport === undefined ? 16.045964602812305 : parseFloat(airport.location.split(', ')[1]),
                  }}
                  onChildMouseUp={this.onMarkerDown}
                  onChildMouseMove={this.onMarkerMove}
                  onGoogleApiLoaded={this.mapLoaded}
                  yesIWantToUseGoogleMapApiInternals
                  draggable={this.state.draggable}
                >
                  <RoomIcon
                    key={airport === undefined ? null : airport.id}
                    marker={marker}
                    lat={this.state.lat}
                    lng={this.state.lng}
                  />
                </GoogleMapReact>
              </div>
            <br />
            <Button className='twoesys-formView__button' type="submit" color="primary" variant="contained">
              Submit
            </Button>
            <Button className='twoesys-formView__button' variant="contained" onClick={this.handleCancel}>
              Cancel
            </Button>
          </Form>
      </Formik>
    );
  }
}

export default AirportForm;
