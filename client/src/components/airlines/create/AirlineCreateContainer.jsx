import React from 'react';
import {connect} from 'react-redux';
import {createAirline} from 'redux/actions/airlines.js';
import {fetchCountries} from "redux/actions/countries.js";
import AirlineForm from 'components/airlines/form/AirlineForm';

class AirlineCreateContainer extends React.Component {
  componentDidMount() {
    this.fetchCountries();
  }

  handleCreateAirline = data => {
    this.props.createAirline (data);
    this.handleCloseModal();
  };

  handleCloseModal = () => {
    this.props.onCancel();
  }

  fetchCountries = () => {
    this.props.fetchCountries();
  }

  render() {
    const {countries} = this.props;
    return (
      <React.Fragment>
        {countries && <AirlineForm
          countries={countries}
          onSubmit={this.handleCreateAirline}
          onCancel={this.handleCloseModal}
        />}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  countries: state.countriesReducer.countries,
})

const mapDispatchToProps = dispatch => {
  return {
    createAirline: data => dispatch (createAirline(data)),
    fetchCountries: () => dispatch(fetchCountries()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AirlineCreateContainer);