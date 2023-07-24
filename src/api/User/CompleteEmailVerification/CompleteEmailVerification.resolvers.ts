import Verification from "../../../entities/Verification";
import { CompleteEmailVerificationMutationArgs, CompleteEmailVerificationResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
    Mutation: {
        CompleteEmailVerification: async (_, args: CompleteEmailVerificationMutationArgs, { req }): Promise<CompleteEmailVerificationResponse> => {
            const { user } = req;
            const { key } = args
            try {
                if (user.email) {
                    const verification = await Verification.findOne({
                        key
                        , payload: user.email
                    })
                    if (verification) {
                        user.verifiedEmail = true,
                            user.save()
                        return {
                            ok: true,
                            error: null
                        }
                    } else {
                        return {
                            ok: false,
                            error: "email not verified yet"
                        }
                    }

                } else {
                    return {
                        ok: false,
                        error: 'There is no Email'
                    }
                }

            } catch (error) {
                return {
                    ok: false,
                    error: error.message
                }
            }
        }
    }
}
export default resolvers