import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {Input, Button} from '@material-ui/core';
import 'assets/style/formView.css';

const MyInput = ({ field, form, ...props }) => {
   return <Input className='twoesys-formView__input' {...field} {...props} />;
 };

class CountryForm extends React.Component {
  handleSubmit = data => {
    if (this.props.country && this.props.country.id) {
      data.id = this.props.country.id;
    }

    this.props.onSubmit(data);
  };

  handleCancel = () => {
    this.props.onCancel();
  };
  render () {
    const {country} = this.props;
    return (
      <Formik
        initialValues={{
          name: country && country.name ? country.name : '',
          code: country && country.code ? country.code : '',
        }}
        onSubmit={(values, {setSubmitting}) => {
          this.handleSubmit(values);
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <Field id="name" name="name" placeholder="Name" component={MyInput}/>
            <Field id="code" name="code" placeholder="Country code" component={MyInput}/>
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

export default CountryForm;
