import User from "../../../entities/User";
import { UpdateProfileMutationArgs, UpdateProfileResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import cleanNullArgs from "../../../utils/cleanNullArgs";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
    Mutation: {
        RequestEmailVerification: privateResolver(
            async (_, args: UpdateProfileMutationArgs, { req }): Promise<UpdateProfileResponse> => {
                const { user } = req
                const notNull = cleanNullArgs(args)
                try {
                    if (args.password) {
                        user.password = args.password;
                        user.save()
                    }
                    await User.update({ id: user.id }, { ...notNull })
                    return {
                        ok: true,
                        error: null
                    }
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message
                    }
                }

            })
    }
}
export default resolvers