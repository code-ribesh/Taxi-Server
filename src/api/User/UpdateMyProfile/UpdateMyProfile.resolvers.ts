import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/authResolver";
import User from "../../../entities/User";
import { UpdateProfileResponse, UpdateProfileMutationArgs } from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArgs";

const resolvers: Resolvers = {
    Mutation: {
      UpdateProfile: authResolver(
        async (
          _,
          args: UpdateProfileMutationArgs,
          { req }
        ): Promise<UpdateProfileResponse> => {
          const user: User = req.user;
          const notNull = cleanNullArgs(args);
            try {
            if (args.password !== null) {
                user.password = args.password;
                user.save();
              }
            await User.update({ id: user.id }, { ...notNull });
            return {
              ok: true,
              error: null
            };
          } catch (error) {
            return {
              ok: false,
              error: error.message
            };
          }
        }
      )
    }
  };


export default resolvers;