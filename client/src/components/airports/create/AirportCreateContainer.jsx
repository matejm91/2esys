import React from 'react';
import {connect} from 'react-redux';
import {createAirport, fetchAirports} from 'redux/actions/airports.js';
import {fetchCountries} from "redux/actions/countries.js";
import AirportForm from 'components/airports/form/AirportForm';

class AirportCreateContainer extends React.Component {
  componentDidMount() {
    this.fetchCountries();
  }

  handleCreateAirport = data => {
    this.props.createAirport(data);
    this.handleCloseModal();
  };

  handleCloseModal = () => {
    this.props.onCancel();
  }

  fetchCountries = () => {
    this.props.fetchCountries();
  }

  render() {
    const {countries, airports} = this.props;
    return (
      <React.Fragment>
        {countries && <AirportForm
          countries={countries}
          onSubmit={this.handleCreateAirport}
          onCancel={this.handleCloseModal}
        />}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  countries: state.countriesReducer.countries,
  airports: state.airportsReducer.airports,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchAirports: () => dispatch(fetchAirports()),
    createAirport: data => dispatch(createAirport(data)),
    fetchCountries: () => dispatch(fetchCountries()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AirportCreateContainer);