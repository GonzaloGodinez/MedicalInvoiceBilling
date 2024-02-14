const typeDefs = `
  type User {
    _id: ID
    username: String
    patientName: String
    patientSsn: String
    dob: String
    email: String
    password: String
    Role_type: String
    Providers: [Provider]
    Diagnostic: [Diagnostic]
  }

  type Provider {
    _id: ID
    providerName: String
    providerSpecialty: String
    createdAt: String
  }

  type Diagnostic {
    _id: ID
    diagnosticName: String
    diagnosticDescription: String
    diagnosticPrice: String
    Provider: Provider
    createdAt: String
  }
input PatientInput {
  patientName: String!
  patientSsn: String!
  email: String
  dob: String
  roleType: String
  username: String
  password: String
}
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(patientName: String!, patientSsn: String!, dob: String): User
    providers: [Provider]
    provider(providerId: ID!): Provider
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!,password: String!, patientName: String, patientSsn: String, dob: String, roleType: String): Auth
    addProvider(providerName: String!, providerSpecialty: String!): Provider
    addDiagnostic(diagnosticName: String!, diagnosticCode: String!, diagnosticDescription: String!, diagnosticPrice: String!, Provider: String!): Diagnostic
    removeProvider(providerId: ID!): Provider
    removePatient(providerId: ID!, patientId: ID!): Provider
    addProvidertoPatient(Provider: ID!): User
    addDiagnostictoPatient(Diagnostic: ID!): User
  }
`;

module.exports = typeDefs;
