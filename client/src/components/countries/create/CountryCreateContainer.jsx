import React from 'react';
import {connect} from 'react-redux';
import {createCountry} from 'redux/actions/countries.js';
import CountryForm from 'components/countries/form/CountryForm';

class CountryCreateContainer extends React.Component {
  handleCreateCountry = data => {
    this.props.createCountry (data);
    this.handleCloseModal();
  };

  handleCloseModal = () => {
    this.props.onCancel();
  }

  render() {
    return (
      <CountryForm 
        onSubmit={this.handleCreateCountry}
        onCancel={this.handleCloseModal}
      />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createCountry: data => dispatch(createCountry(data)),
  }
}

export default connect(null, mapDispatchToProps)(CountryCreateContainer);