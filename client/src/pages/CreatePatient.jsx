import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_PROVIDER } from '../utils/queries'
import { ADD_DIAGNOSTIC } from '../utils/mutations'

const CreatePatient = () => {
  const { loading, data } = useQuery(QUERY_PROVIDER)
  const providers = data?.providers || []
  console.log(providers)
  const [addDiagnostic, { error }] = useMutation(ADD_DIAGNOSTIC)
  const [userFormData, setUserFormData] = useState({ diagnosticName: '', diagnosticCode: '', diagnosticDescription: '', diagnosticPrice: '', Provider: '' });
  // const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
    console.log(userFormData)
  };

  const handleFormSubmit = async (event) => {
    setShowAlert(false);
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log(userFormData)
    try {
      const { data } = await addDiagnostic({
        variables: { ...userFormData }
      })
      console.log(data);

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
      <div>Patient Visit</div>
      <Form noValidate onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your SignUp credentials!
        </Alert>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='diagnosticName'>patient visit concern</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your patient visit concern'
            name='diagnosticName'
            onChange={handleInputChange}
            value={userFormData.diagnosticName}
            required
          />
          <Form.Control.Feedback type='invalid'>Patient visit concern is required!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='diagnosticCode'>diagnostic code</Form.Label>
          <Form.Control
            type='text'
            placeholder='diagnosticCode'
            name='diagnosticCode'
            onChange={handleInputChange}
            value={userFormData.diagnosticCode}
            required
          />
          <Form.Control.Feedback type='invalid'>diagnostic code is required!</Form.Control.Feedback>
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
          <Form.Control.Feedback type='invalid'>diagnostic description is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='diagnosticPrice'>diagnostic price</Form.Label>
          <Form.Control
            type='text'
            placeholder='diagnosticPrice'
            name='diagnosticPrice'
            onChange={handleInputChange}
            value={userFormData.diagnosticPrice}
            required
          />
          <Form.Control.Feedback type='invalid'>diagnostic price is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='provider'>provider</Form.Label>
          <Form.Select aria-label="Providers " name="Provider" onChange={handleInputChange} value={userFormData.Provider}>
            <option value=''>Open the drop down list to select a Provider</option>
            {providers.map(provider => (
              <option key={provider._id} value={provider._id}>{provider.providerName}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type='invalid'>provider is required!</Form.Control.Feedback>
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
