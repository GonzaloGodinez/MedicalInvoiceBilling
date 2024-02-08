import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      patients {
        _id
        patientText
        createdAt
      }
    }
  }
`;

export const QUERY_PATIENTS = gql`
  query getPatients {
    patients {
      _id
      patientName
      patientSSN
  }
`;

export const QUERY_SINGLE_PATIENT = gql`
  query getSinglePatient($patientId: ID!) {
    patient(patientId: $patientId) {
      _id
      patientName
      patientSSN
      }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      providers{
        
      }
    }
  }
`;
