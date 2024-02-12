const { User, Provider, Diagnostic } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('Providers').populate('Diagnostic');
    },
    user: async (parent, { patientName, patientSsn, dob }) => {
      return User.findOne({ patientName, patientSsn, dob  }).populate('Providers').populate('Diagnostic');
    },
    providers: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Provider.find(params).sort({ createdAt: -1 });
    },
    provider: async (parent, { providerId }) => {
      return Provider.findOne({ _id: providerId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('Providers').populate('Diagnostic');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password, patientName, patientSsn, dob}) => {
      const user = await User.create({ username, email, password, patientName, patientSsn, dob });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addProvider: async (parent, { providerName, providerSpecialty}, context) => {
      if (context.user) {
        const provider = await Provider.create({
          providerName,
          providerSpecialty,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { Providers: provider._id } }
        );

        return provider;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    addDiagnostic: async (parent, { diagnosticName, diagnosticCode, diagnosticDescription, diagnosticPrice}, context) => {
      if (context.user) {
        const diagnostic = await Diagnostic.create({
          diagnosticName,
          diagnosticCode,
          diagnosticDescription,
          diagnosticPrice,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { Diagnostic: diagnostic._id } }
        );

        return diagnostic;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    // removeProvider: async (parent, { providerId }, context) => {
    //   if (context.user) {
    //     const provider = await Provider.findOneAndDelete({
    //       _id: providerId,
    //       providerSpecialty: context.user.username,
    //     });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: { providers: provider._id } }
    //     );

    //     return provider;
    //   }
    //   throw AuthenticationError;
    // },

  },
};

module.exports = resolvers;
