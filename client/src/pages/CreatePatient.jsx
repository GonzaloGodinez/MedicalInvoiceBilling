// see SignupForm.js for comments
import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

// import { loginUser } from '../utils/API';
import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';

const CreatePatient = () => {
  // const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  // const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);


  return (
    <>
      <div>Create Patient</div>
    </>
  );
};

export default CreatePatient;
