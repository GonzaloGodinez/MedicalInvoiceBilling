import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`;

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!, $patientName: String, $patientSsn: String, $dob: String, $Role_type: String) {
  addUser(username: $username, email: $email, password: $password, patientName: $patientName, patientSsn: $patientSsn, dob: $dob, Role_type: $Role_type) {
    token
  }
}
`;

export const ADD_PROVIDER = gql`
mutation AddProvider($providerName: String!, $providerSpecialty: String!) {
  addProvider(providerName: $providerName, providerSpecialty: $providerSpecialty) {
    _id
    createdAt
    providerName
    providerSpecialty
  }
}
`;

export const ADD_DIAGNOSTIC = gql`
mutation AddDiagnostic($diagnosticName: String!, $diagnosticCode: String!, $diagnosticDescription: String!, $diagnosticPrice: String!) {
  addDiagnostic(diagnosticName: $diagnosticName, diagnosticCode: $diagnosticCode, diagnosticDescription: $diagnosticDescription, diagnosticPrice: $diagnosticPrice) {
    _id
    createdAt
    diagnosticDescription
    diagnosticName
    diagnosticPrice
  }
}
`
