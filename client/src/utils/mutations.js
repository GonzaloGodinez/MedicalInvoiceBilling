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
  mutation savePatient($patientData: patientInput!, $providerId: providerId!) {
    savePatient(patientData: $patientData, providerId: $providerId) {
      _id
      patientName
      patientSSN
      patientEmail
      dob
    }
  }
`;

export const CREATE_PATIENT = gql`
  mutation createPatient($patientData: patientInput!) {
    createPatient(patientData: $patientData) {
      _id
      patientName
      patientSSN
      patientEmail
      dob
    }
  }
`;

export const REMOVE_PATIENT = gql`
  mutation removePatient($patientId: ID!, $provider: providerId!) {
    removePatient(patientId: $patientId, providerId: $providerId) {
      _id
      patientSSN
      }
  }
`;

