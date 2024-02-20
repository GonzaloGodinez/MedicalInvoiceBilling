// see SignupForm.js for comments
// https://reactrouter.com/en/main/hooks/use-params
import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import {useParams} from "react-router-dom"

// import { loginUser } from '../utils/API';
import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';

const PatientInfo = () => {
  // const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  // const [validated] = useState(false);
  const {id}=useParams()
  console.log (id)
  const [showAlert, setShowAlert] = useState(false);

  return (
    <>
      <div>Patient Info</div>
    </>
  );
};

export default PatientInfo;
