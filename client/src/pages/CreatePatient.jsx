// see SignupForm.js for comments
import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

// import { loginUser } from '../utils/API';
import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';

const CreatePatient = () => {
  const [userFormData, setUserFormData] = useState({  diagnosticName:'', diagnosticCode: '', diagnosticDescription: '', diagnosticPrice: '' });
  // const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
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
     const {data} = await addUser ({
      variables: {...userFormData}
     }) 
      console.log(data);
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      diagnosticName: '',
      diagnosticCode: '',
      diagnosticDescription: '', 
      diagnosticPrice: '', 
      
    });
  };

  return (
    <>
      <div>Create Patient</div>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your SignUp credentials!
        </Alert>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='diagnosticName'>diagnostic Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your diagnostic name'
            name='diagnosticName'
            onChange={handleInputChange}
            value={userFormData.diagnosticName}
            required
          />
          <Form.Control.Feedback type='invalid'>Diagnostic Name is required!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='diagnosticCode'>diagnosticCode</Form.Label>
          <Form.Control
            type='text'
            placeholder='diagnosticCode'
            name='diagnosticCode'
            onChange={handleInputChange}
            value={userFormData.diagnosticCode}
            required
          />
          <Form.Control.Feedback type='invalid'>diagnosticCodeis required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='diagnosticDescription'>diagnostic Description</Form.Label>
          <Form.Control
            type='text'
            placeholder='diagnosticDescription'
            name='diagnosticDescription'
            onChange={handleInputChange}
            value={userFormData.diagnosticDescription}
            required
          />
          <Form.Control.Feedback type='invalid'>diagnosticDescriptionis required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='diagnosticPrice'>Patients Social</Form.Label>
          <Form.Control
            type='text'
            placeholder='diagnosticPrice'
            name='diagnosticPrice'
            onChange={handleInputChange}
            value={userFormData.patientSsn}
            required
          />
          <Form.Control.Feedback type='invalid'>diagnosticPrice is required!</Form.Control.Feedback>
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

export default CreatePatient;
