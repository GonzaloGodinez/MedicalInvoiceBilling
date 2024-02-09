const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    provider: [Provider]!
  }

  type Provider {
    _id: ID
    providerName: String
    providerSpecialty: String
    createdAt: String
    patients: [Patient]!
  }

  type Patient {
    _id: ID!
    name: String!
    email: String
    ssn: String!
  }
input PatientInput {
  patientName: String!
  patientSsn: Int!
  patientEmail: String
  dob: String
}
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    providers(username: String): [Provider]
    provider(providerId: ID!): Provider
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addProvider(providerName: String!): Provider
    addPatient(providerId: ID!, patientName: String!): Provider
    removeProvider(providerId: ID!): Provider
    removePatient(providerId: ID!, patientId: ID!): Provider
  }
`;

module.exports = typeDefs;
