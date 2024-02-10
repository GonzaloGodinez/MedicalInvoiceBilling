const { User, Provider } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('providers');
    },
    user: async (parent, { patientName, patientSsn, dob }) => {
      return User.findOne({ patientName, patientSsn, dob  }).populate('providers');
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
        return User.findOne({ _id: context.user._id }).populate('providers');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
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
    addProvider: async (parent, { providerName }, context) => {
      if (context.user) {
        const provider = await Provider.create({
          providerName,
          providerSpecialty: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { providers: provider._id } }
        );

        return provider;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    
    removeProvider: async (parent, { providerId }, context) => {
      if (context.user) {
        const provider = await Provider.findOneAndDelete({
          _id: providerId,
          providerSpecialty: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { providers: provider._id } }
        );

        return provider;
      }
      throw AuthenticationError;
    },
    removePatient: async (parent, { providerId, patientId }, context) => {
      if (context.user) {
        return Provider.findOneAndUpdate(
          { _id: providerId },
          {
            $pull: {
              patients: {
                _id: patientId,
                patientAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },

  },
};

module.exports = resolvers;
