import React from 'react';
import {connect} from 'react-redux';
import {Modal, Button} from '@material-ui/core';
import {fetchAirports, deleteAirport} from 'redux/actions/airports.js';
import AirportList from 'components/airports/list/AirportList';
import ComponentListHeader from 'components/common/ComponentListHeader';
import AirportCreateContainer from 'components/airports/create/AirportCreateContainer';
import AirportUpdateContainer from 'components/airports/update/AirportUpdateContainer';
import 'assets/style/modalView.css';
import 'assets/style/listView.css';

class AirportListContainer extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      modalVisible: false,
      body: '',
    };
  }

  componentDidMount() {
    this.fetchAirports();
  }

  componentDidUpdate(prevProps, prevState) {
    const {airports} = this.props;
    const {airports: prevAirports} = prevProps;
    if (JSON.stringify(airports) !== JSON.stringify(prevAirports)) {
      this.fetchAirports();
    }
  }

  fetchAirports = () => {
    this.props.fetchAirports();
  };

  handleDeleteAirport = id => {
    this.props.deleteAirport (id);
    this.handleCloseModal();
  };

  handleOpenCreateModal = () => {
    const body = (
      <AirportCreateContainer onCancel={this.handleCloseModal}/>
    );

    this.setState({
      modalVisible: true,
      body,
    });
  };

  handleOpenEditModal = (id) => {
    const body = (
      <AirportUpdateContainer
        airportId={id}
        onCancel={this.handleCloseModal}
      />
    );
    this.setState({
      modalVisible: true,
      body,
    });
  };

  handleOpenDelete = id => {
    const body = (
      <div className='twoesys-modalView__deleteBody'>
        <p>Are you sure you want to delete this airport?</p>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => this.handleDeleteAirport (id)}
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
    const {airports} = this.props;
    const {modalVisible, body} = this.state;
    return (
      <React.Fragment>
        <ComponentListHeader onOpenCreateModal={this.handleOpenCreateModal} />
        <br />
        {airports && airports.length > 0
          ? <AirportList
              airports={airports || []}
              onEditClick={this.handleOpenEditModal}
              onDeleteClick={this.handleOpenDelete}
            />
          : <div className='twoesys-listView__noData'>No data to display!</div>}
        {modalVisible &&
          <Modal
            className="twoesys-modalView__modal"
            open={true}
            onClose={this.handleCloseModal}
          >
            {body}
          </Modal>}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  airports: state.airportsReducer.airports,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchAirports: () => dispatch (fetchAirports()),
    deleteAirport: id => dispatch (deleteAirport(id)),
  };
};

export default connect (mapStateToProps, mapDispatchToProps)(AirportListContainer);
