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
  }

  type Provider {
    _id: ID
    providerName: String
    providerSpecialty: String
    createdAt: String
  }

input PatientInput {
  patientName: String!
  patientSsn: String!
  email: String
  dob: String
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
    providers(username: String): [Provider]
    provider(providerId: ID!): Provider
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, patientName: String, patientSsn: String, dob: String, Role_type: String): Auth
    addProvider(providerName: String!, providerSpecialty: String!): Provider
    removeProvider(providerId: ID!): Provider
    removePatient(providerId: ID!, patientId: ID!): Provider
  }
`;

module.exports = typeDefs;
