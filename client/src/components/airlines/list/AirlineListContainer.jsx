import React from 'react';
import {connect} from 'react-redux';
import {Modal, Button} from '@material-ui/core';
import {fetchAirlines, deleteAirline} from 'redux/actions/airlines.js';
import AirlineList from 'components/airlines/list/AirlineList';
import ComponentListHeader from 'components/common/ComponentListHeader';
import AirlineUpdateContainer from 'components/airlines/update/AirlineUpdateContainer';
import AirlineCreateContainer from 'components/airlines/create/AirlineCreateContainer';
import 'assets/style/modalView.css';
import 'assets/style/listView.css';

class AirlineListContainer extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      modalVisible: false,
      body: '',
    };
  }

  componentDidMount() {
    this.fetchAirlines();
  }

  componentDidUpdate (prevProps, prevState) {
    const {airlines} = this.props;
    const {airlines: prevAirlines} = prevProps;
    if (JSON.stringify(airlines) !== JSON.stringify(prevAirlines)) {
      this.fetchAirlines();
    }
  }

  fetchAirlines = () => {
    this.props.fetchAirlines();
  };

  handleDeleteAirline = id => {
    this.props.deleteAirline (id);
    this.handleCloseModal();
  };

  handleOpenCreateModal = () => {
    const body = (
      <AirlineCreateContainer
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
      <AirlineUpdateContainer
        airlineId={id}
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
        <p>Are you sure you want to delete this airline?</p>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => this.handleDeleteAirline (id)}
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
    const {airlines} = this.props;
    const {modalVisible, body} = this.state;
    return (
      <React.Fragment>
        <ComponentListHeader onOpenCreateModal={this.handleOpenCreateModal} />
        <br />
        {airlines && airlines.length > 0
          ? <AirlineList
              airlines={airlines || []}
              onEditClick={this.handleEditClick}
              onDeleteClick={this.handleDeleteClick}
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
  airlines: state.airlinesReducer.airlines,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchAirlines: () => dispatch (fetchAirlines()),
    deleteAirline: id => dispatch (deleteAirline(id)),
  };
};

export default connect (mapStateToProps, mapDispatchToProps)(AirlineListContainer);
