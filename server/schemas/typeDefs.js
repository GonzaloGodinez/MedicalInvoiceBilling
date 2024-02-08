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
    _id: ID
    patientName: String
    patientSS: String
    createdAt: String
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
    addProvider(providerName: String!): User
    addPatient(providerId: ID!, patientName: String!): User
    removeProvider(providerId: ID!): User
    removePatient(providerId: ID!, patientId: ID!): User
  }
`;

module.exports = typeDefs;
