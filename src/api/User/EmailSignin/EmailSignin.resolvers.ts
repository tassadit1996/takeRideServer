import User from "../../../entities/User";
import { EmailSignInMutationArgs, EmailSignInResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
    Mutation: {
        EmailSignIn: async (_, args: EmailSignInMutationArgs): Promise<EmailSignInResponse> => {
            const { email, password } = args;

            try {
                const user = await User.findOne({ email })
                console.log(user);

                if (!user) {
                    return {
                        ok: false,
                        error: 'User not found',
                        token: null
                    }
                }
                const checkPassword = await user.comparePassword(password);
                if (checkPassword) {
                    const token = createJWT(user.id)
                    return {
                        ok: true,
                        error: null,
                        token
                    }
                } else {
                    return {
                        ok: false,
                        error: 'wrong password',
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