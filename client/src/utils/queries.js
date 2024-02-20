import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query User($username: String!) {
    user(username: $username) {
      _id
      username
      email
      patients {
        _id
        patientName
        dob
        Role_type
        createdAt
      }
    }
  }
`;

export const QUERY_USERS = gql`
query Users {
  users {
    _id
    email
    dob
    Role_type
    patientName
    patientSsn
    Diagnostic {
      _id
      createdAt
      diagnosticDescription
      diagnosticName
      diagnosticPrice
    }
    Providers {
      _id
      createdAt
      providerName
      providerSpecialty
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
query Me {
  me {
    Providers {
      _id
      createdAt
      providerName
      providerSpecialty
    }
    patientName
    patientSSN
    dob
    email
  }
}
`;

export const QUERY_PROVIDER = gql`
query Providers {
  providers {
    _id
    createdAt
    providerName
    providerSpecialty
  }
}
`
