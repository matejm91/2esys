import React from 'react';
import {connect} from 'react-redux';
import {updateCountry, fetchCountryById} from 'redux/actions/countries.js';
import CountryForm from 'components/countries/form/CountryForm';

class CountryUpdateContainer extends React.Component {
  componentDidMount () {
    if (this.props.countryId) {
      this.fetchCountryById(this.props.countryId);
    }
  }

  fetchCountryById = id => {
    this.props.fetchCountryById(id);
  }

  handleUpdateCountry = data => {
    this.props.updateCountry(data);
    this.handleCloseModal();
  };

  handleCloseModal = () => {
    this.props.onCancel();
  };

  render () {
    return (
      <React.Fragment>
        {this.props.country &&
          <CountryForm
            country={this.props.country}
            onSubmit={this.handleUpdateCountry}
            onCancel={this.handleCloseModal}
          />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  country: state.countriesReducer.country,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchCountryById: id => dispatch (fetchCountryById (id)),
    updateCountry: data => dispatch (updateCountry(data.id, data)),
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (
  CountryUpdateContainer
);
