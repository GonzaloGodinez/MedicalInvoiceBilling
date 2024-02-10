// see SignupForm.js for comments
import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

// import { SignUpUser } from '../utils/API';
import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import {ADD_USER} from '../utils/mutations'

const SignUpForm = () => {
  const [userFormData, setUserFormData] = useState({ username: "", patientName: "", patientSsn: "", dob: "", email: '', password: '', Role_type: "" });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [AddUser, {error} ] = useMutation(ADD_USER)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
     const {data} = await SignUp ({
      variables: {...userFormData}
     }) 
      console.log(data);
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      email: '',
      password: '',
      username: "", 
      patientName: "", 
      patientSsn: "", 
      dob: "", 
      Role_type
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your SignUp credentials!
        </Alert>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='username'>User Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your user name'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>User Name is required!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>User Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='patientName'>Patients Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your name'
            name='patientName'
            onChange={handleInputChange}
            value={userFormData.patientName}
            required
          />
          <Form.Control.Feedback type='invalid'>Patients Name is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='patientSsn'>Patients Social</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your social'
            name='patientSsn'
            onChange={handleInputChange}
            value={userFormData.patientSsn}
            required
          />
          <Form.Control.Feedback type='invalid'>Patiens Social is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='dob'>Patients DOB </Form.Label>
          <Form.Control
            type='text'
            placeholder='Your dob'
            name='dob'
            onChange={handleInputChange}
            value={userFormData.dob}
            required
          />
          <Form.Control.Feedback type='invalid'>Patiens DOB is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='Role_type'>Role Type </Form.Label>
          <Form.Control
            type='text'
            placeholder='Your Role Type'
            name='Role_type'
            onChange={handleInputChange}
            value={userFormData.Role_type}
            required
          />
          <Form.Control.Feedback type='invalid'>Patiens Role Type is required!</Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          // disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignUpForm;
