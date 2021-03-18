import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
import 'assets/style/tableView.css';

class AirportList extends React.Component {
  handleEditClick = (id) => {
    this.props.onEditClick(id);
  }

  handleDeleteClick = (id) => {
    this.props.onDeleteClick(id);
  }

  render () {
    const {airports} = this.props;
    return (
      <TableContainer component={Paper}>
        <Table
          components={{
            Body: props => (
              <div>
                <button>Add an Add</button>
              </div>
            ),
          }}
        >
          <TableHead className='twoesys-tableView__tableHead'>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {airports.map (airport => (
              <TableRow key={airport.name}>
                <TableCell>{airport.name}</TableCell>
                <TableCell>{airport.country}</TableCell>
                <TableCell>{airport.location}</TableCell>
                <TableCell><Edit onClick={() => this.handleEditClick(airport.id)}/>&nbsp;<Delete onClick={() => this.handleDeleteClick(airport.id)}/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default AirportList;
