import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
//import { SAVE_PATIENT } from '../utils/mutations';
import { QUERY_USERS, QUERY_PROVIDER } from '../utils/queries';
// import { QUERY_ME } from '../utils/queries';

import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

import Auth from '../utils/auth';

// import { savePatientIds, getSavedPatientIds } from '../utils/localStorage'; 


const SearchProviders = () => {
  // create state for holding returned google api data
  const [searchedProviders, setsearchedProviders] = useState([]);
  // const [searchedPatients, setSearchedPatients] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  const [savedPatientIds, setPatientIds] = useState([]);
  // const {loading, data} = useQuery(QUERY_PROVIDER);
  // const providers = data?.providers || []
  // console.log (providers)
  const {loading, data} = useQuery(QUERY_USERS);
  const users = data?.users || []
  console.log (users)
  // set up useEffect hook to save `savedPatientIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  // useEffect(() => {
  //  const userData = data?.users || {};
    console.log("userData")
    // console.log(data)
    // return () => savePatients(savedPatientIds);
  //  },[data]);  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // {data, loading, error}
    if (!searchInput) {
      return false;
    }
    console.log ("items");
    try {
      // const patientData = items.map((patient) => ({
      //   patientId: patient._id,
      //   patient: patient.Name || ['No patient to display'],
      //   SSN: patient.SSN,
      //   DOB: patient.DOB
      // }));
// make the query d o n e
// loop thru them d o n e
// console.log them done
// perform the drop down menu displaying all patients
// on select call the searchProviders
// when  the provider is selected then we map the patients in html
      // setProvider(providerData);
      // setSearchInput(''); 95% done
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a patient to our database
  const handlesaveProvider = async (patientId) => {
    // find the patient in `Provider` state by the matching id
    const patientToSave = searchedProviders.find((patient) => patient.patientId === patientId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
     // const response = await savePatient(patientToSave, token);
     // need to update this funtionality to save the patient info including the diagnostic
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
          {searchedProviders.length
            ? `Viewing ${searchedProviders.length} results:`
            : 'Search for a patient to begin'}
        </h2>
        <Row>
          {users.map((patient) => {
            return (
              <Col md="4" key={patient._id}>
                <Card border='dark'>
                  {patient.image ? (
                    <Card.Img src={patient.image} alt={`The cover for ${patient.title}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{patient.patientName}</Card.Title>
                    <p className='small'>Patient Name: {patient.username}</p>
                    <Card.Text>{patient.patientSsn}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedPatientIds?.some((savedPatientId) => savedPatientId === patient.patientId)}
                        className='btn-block btn-info'
                        onClick={() => handlesaveProvider(patient._id)}>
                        {savedPatientIds?.some((savedPatientId) => savedPatientId === patient._id)
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
