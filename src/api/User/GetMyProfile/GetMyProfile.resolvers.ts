import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/authResolver";

const resolvers: Resolvers = {
  Query: {
    GetMyProfile: authResolver(async (_, __, { req }) => {
      const { user } = req;
      return {
        ok: true,
        error: null,
        user,
      };
    }),
  },
};

export default resolvers;
