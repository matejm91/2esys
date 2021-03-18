import React, {forwardRef} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {Input, MenuItem, Select, Button} from '@material-ui/core';
import 'assets/style/formView.css';

const MyInput = ({ field, form, ...props }) => {
   return <Input className='twoesys-formView__input' {...field} {...props} />;
 };

 const MySelect = ({ field, form, ...props}) => {
  return <Select displayEmpty labelId='helper-label' className='twoesys-formView__input' {...field} {...props} />;
};

class AirlineForm extends React.Component {
  handleSubmit = data => {
    if (this.props.airline && this.props.airline.id) {
      data.id = this.props.airline.id;
    }

    this.props.onSubmit(data);
  };

  handleCancel = () => {
    this.props.onCancel();
  };
  render () {
    const {airline, countries} = this.props;
    return (
      <Formik
        initialValues={{
          name: airline && airline.name ? airline.name : '',
          country: airline && airline.country ? airline.country : '',
        }}
        onSubmit={(values, {setSubmitting}) => {
          this.handleSubmit(values);
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <Field id="name" name="name" placeholder="Name" component={MyInput} />
            <Field id="country" name="country" placeholder="Country" component={MySelect}>
              <MenuItem value="" disabled selected>Choose country</MenuItem>
              {countries.length && countries.map(country => (<MenuItem key={country.id} value={country.name}>{country.name}</MenuItem>))}
            </Field>
            <Button className='twoesys-formView__button' type="submit" color="primary" variant="contained">
              Submit
            </Button>
            <Button className='twoesys-formView__button' variant="contained" onClick={this.handleCancel}>
              Cancel
            </Button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default AirlineForm;
