import User from "../../../entities/User";
import Verification from "../../../entities/Verification";
import { CompletePhoneVerificationMutationArgs, CompletePhoneVerificationResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../utils/createJWT";


const resolvers: Resolvers = {
    Mutation: {
        CompletePhoneVerification: async (_, args: CompletePhoneVerificationMutationArgs): Promise<CompletePhoneVerificationResponse> => {
            const { phoneNumber, key } = args;
            try {
                const verification = await Verification.findOne({ payload: phoneNumber, key })
                if (!verification) {
                    return {
                        ok: false,
                        error: "verification key not valide",
                        token: null
                    }
                }

            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                }
            }
            try {
                const user = await User.findOne({ phoneNumber })
                if (user) {
                    const token = createJWT(user.id)
                    user.verifiedPhoneNumber = true
                    user.save()
                    return {
                        ok: true,
                        error: null,
                        token
                    }
                } else {
                    return {
                        ok: true,
                        error: null,
                        token: null
                    }
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                }
            }
        }
    }
}
export default resolvers