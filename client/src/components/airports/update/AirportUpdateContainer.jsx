import React from 'react';
import {connect} from 'react-redux';
import {updateAirport, fetchAirportById} from 'redux/actions/airports.js';
import {fetchCountries} from "redux/actions/countries.js";
import AirportForm from 'components/airports/form/AirportForm';

class AirportUpdateContainer extends React.Component {
  componentDidMount () {
    this.fetchCountries();
    if (this.props.airportId) {
      this.fetchAirportById(this.props.airportId);
    }
  }

  fetchAirportById = id => {
    this.props.fetchAirportById(id);
  }

  fetchCountries = () => {
    this.props.fetchCountries();
  }

  handleUpdateAirport = data => {
    this.props.updateAirport(data);
    this.handleCloseModal();
  };

  handleCloseModal = () => {
    this.props.onCancel();
  };

  render() {
    const {airport, countries} = this.props;
    return (
      <React.Fragment>
        {airport &&
          <AirportForm
            airport={airport}
            countries={countries}
            onSubmit={this.handleUpdateAirport}
            onCancel={this.handleCloseModal}
          />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  airport: state.airportsReducer.airport,
  countries: state.countriesReducer.countries,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchAirportById: id => dispatch(fetchAirportById(id)),
    updateAirport: data => dispatch(updateAirport(data.id, data)),
    fetchCountries: () => dispatch(fetchCountries()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AirportUpdateContainer);
