import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_PATIENT = gql`
  mutation savePatient($PatientData: PatientInput!) {
    savePatient(patientData: $patientData) {
      _id
      username
      email
      patientCount
      savedPatients {
      patientId
      authors
      description
      title
      image
      link
      }
    }
  }
`;

export const RETRIEVE_PATIENT = gql`
  mutation savePatient($PatientData: PatientInput!) {
    savePatient(patientData: $patientData) {
      _id
      username
      email
      patientCount
      savedPatients {
      patientId
      authors
      description
      title
      image
      link
      }
    }
  }
`;

export const REMOVE_PATIENT = gql`
  mutation removePatient($patientId: ID!) {
    removePatient(patientId: $patientId) {
      _id
      username
      email
      patientCount
      savedPatients {
        patientId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

