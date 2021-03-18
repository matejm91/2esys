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

class AirlineList extends React.Component {
  handleEditClick = (id) => {
    this.props.onEditClick(id);
  }

  handleDeleteClick = (id) => {
    this.props.onDeleteClick(id);
  }

  render () {
    const {airlines} = this.props;
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
              <TableCell>Airline country</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {airlines.map (airline => (
              <TableRow key={airline.name}>
                <TableCell>{airline.name}</TableCell>
                <TableCell>{airline.country}</TableCell>
                <TableCell><Edit onClick={() => this.handleEditClick(airline.id)}/>&nbsp;<Delete onClick={() => this.handleDeleteClick(airline.id)}/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default AirlineList;
