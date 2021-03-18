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

class CountryList extends React.Component {
  handleEditClick = (id) => {
    this.props.onEditClick(id);
  }

  handleDeleteClick = (id) => {
    this.props.onDeleteClick(id);
  }

  render () {
    const {countries} = this.props;
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
              <TableCell>Country code</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countries.map (country => (
              <TableRow key={country.name}>
                <TableCell>{country.name}</TableCell>
                <TableCell>{country.code}</TableCell>
                <TableCell><Edit onClick={() => this.handleEditClick(country.id)}/>&nbsp;<Delete onClick={() => this.handleDeleteClick(country.id)}/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default CountryList;
