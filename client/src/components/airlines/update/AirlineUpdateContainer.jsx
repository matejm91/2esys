import React from 'react';
import {connect} from 'react-redux';
import {updateAirline, fetchAirlineById} from 'redux/actions/airlines.js';
import {fetchCountries} from "redux/actions/countries.js";
import AirlineForm from 'components/airlines/form/AirlineForm';

class AirlineUpdateContainer extends React.Component {
  componentDidMount () {
    this.fetchCountries();
    if (this.props.airlineId) {
      this.fetchAirlineById(this.props.airlineId);
    }
  }

  fetchAirlineById = id => {
    this.props.fetchAirlineById(id);
  }

  fetchCountries = () => {
    this.props.fetchCountries();
  }

  handleUpdateAirline = data => {
    this.props.updateAirline(data);
    this.handleCloseModal();
  };

  handleCloseModal = () => {
    this.props.onCancel();
  };

  render () {
    const {airline, countries} = this.props;
    return (
      <React.Fragment>
        {airline &&
          <AirlineForm
            airline={airline}
            countries={countries}
            onSubmit={this.handleUpdateAirline}
            onCancel={this.handleCloseModal}
          />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  airline: state.airlinesReducer.airline,
  countries: state.countriesReducer.countries,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchAirlineById: id => dispatch (fetchAirlineById (id)),
    updateAirline: data => dispatch (updateAirline(data.id, data)),
    fetchCountries: () => dispatch(fetchCountries()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AirlineUpdateContainer);
