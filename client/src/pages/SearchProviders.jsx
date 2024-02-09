import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_PATIENT } from '../utils/mutations';

import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

import Auth from '../utils/auth';

//import { searchGooglePatients } from '../utils/API'; 
// import { savePatientIds, getSavedPatientIds } from '../utils/localStorage'; 


const SearchProviders = () => {
  // create state for holding returned google api data
  const [Provider, setProvider] = useState([]);
  // const [searchedPatients, setSearchedPatients] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // set up useEffect hook to save `savedPatientIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const patientData = items.map((patient) => ({
        patientId: patient.id,
        authors: patient.volumeInfo.authors || ['No patient to display'],
        title: patient.volumeInfo.title,
        description: patient.volumeInfo.description,
        image: patient.volumeInfo.imageLinks?.thumbnail || '',
      }));
console.log 
// make the query
// loop thru them
// console.log them
// perform the drop down menu
// on select call the providers
// when  the provider is selected then we map the patients in html
      setProvider(providerData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a patient to our database
  const handlesaveProvider = async (patientId) => {
    // find the patient in `Provider` state by the matching id
    const patientToSave = Provider.find((patient) => patient.patientId === patientId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
     // const response = await savePatient(patientToSave, token);
          const response = await useMutation(SAVE_PATIENT)(patientToSave, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // if patient successfully saves to user's account, save patient id to state
      setSavedPatientIds([...savedPatientIds, patientToSave.patientId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Patients!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a patient'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {Provider.length
            ? `Viewing ${Provider.length} results:`
            : 'Search for a patient to begin'}
        </h2>
        <Row>
          {Provider.map((patient) => {
            return (
              <Col md="4" key={patient.patientId}>
                <Card border='dark'>
                  {patient.image ? (
                    <Card.Img src={patient.image} alt={`The cover for ${patient.title}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{patient.title}</Card.Title>
                    <p className='small'>Authors: {patient.authors}</p>
                    <Card.Text>{patient.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedPatientIds?.some((savedPatientId) => savedPatientId === patient.patientId)}
                        className='btn-block btn-info'
                        onClick={() => handlesavePatient(patient.patientId)}>
                        {savedPatientIds?.some((savedPatientId) => savedPatientId === patient.patientId)
                          ? 'This patient has already been saved!'
                          : 'Save this Patient!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SearchProviders;
