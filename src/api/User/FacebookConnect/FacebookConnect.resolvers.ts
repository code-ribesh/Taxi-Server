import { Resolvers } from "src/types/resolvers";
import User from "../../../../src/entities/User";
import creatJWT from "../../../utils/createJWT";

import {
  FacebookConnectMutationArgs,
  FacebookConnectResponse,
} from "src/types/graph";



const resolvers: Resolvers = {
  Mutation: {
    FacebookConnect: async (
      _,
      args: FacebookConnectMutationArgs
    ): Promise<FacebookConnectResponse> => {
      const { fbId } = args;
      //checking existing user
      try {
        const existingUser = await User.findOne({ fbId });
        if (existingUser) {
          return {
            ok: true,
            error: null,
            token: "Comming soon, already",
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null,
        };
      }

      try {
         const newUser =  await User.create({
          ...args,
          profilePhoto: `http://graph.facebook.com/${fbId}/pictures?type=square`,
        }).save();
        const token = creatJWT(newUser.id);

        return {
          ok: true,
          error: null,
          token
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null,
        };
      }
    },
  },
};

export default resolvers;
