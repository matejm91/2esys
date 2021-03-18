import React from 'react';
import {connect} from 'react-redux';
import {Modal, Button} from '@material-ui/core';
import {fetchCountries, createCountry, updateCountry, deleteCountry} from 'redux/actions/countries.js';
import CountryList from 'components/countries/list/CountryList';
import ComponentListHeader from 'components/common/ComponentListHeader';
import CountryUpdateContainer from 'components/countries/update/CountryUpdateContainer';
import CountryCreateContainer from 'components/countries/create/CountryCreateContainer';
import 'assets/style/modalView.css';
import 'assets/style/listView.css';

class CountryListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      body: '',
    }
  }
  
  componentDidMount() {
    this.fetchCountries();
  }

  componentDidUpdate(prevProps, prevState) {
    const {countries} = this.props;
    const {countries: prevCountries} = prevProps;
    if (JSON.stringify(countries) !== JSON.stringify(prevCountries)) {
      this.fetchCountries();
    }
  }

  fetchCountries = () => {
    this.props.fetchCountries();
  }

  handleDeleteCountry = id => {
    this.props.deleteCountry(id);
    this.handleCloseModal();
  };

  handleOpenCreateModal = () => {
    const body = (
      <CountryCreateContainer
        onCancel={this.handleCloseModal}
      />
    );

    this.setState({
      modalVisible: true,
      body,
    });
  };

  handleEditClick = (id) => {
    const body = (
      <CountryUpdateContainer
        countryId={id}
        onCancel={this.handleCloseModal}
      />
    );
    this.setState({
      modalVisible: true,
      body,
    });
  };

  handleDeleteClick = id => {
    const body = (
      <div className='twoesys-modalView__deleteBody'>
        <p>Are you sure you want to delete this country?</p>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => this.handleDeleteCountry(id)}
          className='twoesys-modalView__button'
        >
          Confirm
        </Button>
        <Button onClick={this.handleCloseModal} className='twoesys-modalView__button'>Cancel</Button>
      </div>
    );
    this.setState({
      modalVisible: true,
      body,
    });
  };

  handleCloseModal = () => {
    this.setState({
      modalVisible: false,
      body: '',
    });
  };

  render() {
    const {modalVisible, body} = this.state;
    const {countries} = this.props;
    return (
      <React.Fragment>
        <ComponentListHeader onOpenCreateModal={this.handleOpenCreateModal} />
        <br/>
        {countries && countries.length > 0
          ? <CountryList
              countries={countries || []}
              onEditClick={this.handleEditClick}
              onDeleteClick={this.handleDeleteClick}
            />
          : <div className='twoesys-listView__noData'>No data to display!</div>}
        {modalVisible && 
          <Modal className='twoesys-modalView__modal' open={true} onClose={this.handleCloseModal}>
            {body}
          </Modal>
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  countries: state.countriesReducer.countries,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCountries: () => dispatch(fetchCountries()),
    deleteCountry: id => dispatch (deleteCountry(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryListContainer);