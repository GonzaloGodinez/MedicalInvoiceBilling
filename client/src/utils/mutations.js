import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`;
//  username, email, password, patientName, patientSsn, dob, roleType
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!, $patientName: String, $patientSsn: String, $dob: String, $roleType: String) {
    addUser(username: $username, email: $email, password: $password, patientName: $patientName, patientSsn: $patientSsn, dob: $dob, roleType: $roleType) {
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
mutation addDiagnostic($diagnosticName: String!, $diagnosticCode: String!, $diagnosticDescription: String!, $diagnosticPrice: String!, $Provider: String!) {
  addDiagnostic(diagnosticName: $diagnosticName, diagnosticCode: $diagnosticCode, diagnosticDescription: $diagnosticDescription, diagnosticPrice: $diagnosticPrice, Provider: $Provider) {
    _id
    createdAt
    diagnosticDescription
    diagnosticName
    diagnosticPrice
  }
}
`;
