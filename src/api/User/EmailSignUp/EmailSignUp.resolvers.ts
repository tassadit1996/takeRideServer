
import User from "../../../entities/User";
import Verification from "../../../entities/Verification";
import { EmailSignUpMutationArgs, EmailSignUpResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../utils/createJWT";
import { sendVerificationEmail } from "../../../utils/sendEmail";

const resolvers: Resolvers = {
    Mutation: {
        EmailSignUp: async (_, args: EmailSignUpMutationArgs): Promise<EmailSignUpResponse> => {
            const { email } = args;
            try {
                const existingUser = await User.findOne({ email })
                if (existingUser) {
                    return {
                        ok: false,
                        error: 'You should Login instead',
                        token: null
                    }
                } else {
                    const phoneNumberVerification = await Verification.findOne({ payload: args.phoneNumber, verified: true })
                    if (phoneNumberVerification) {
                        const newUser = await User.create({ ...args }).save()
                        if (newUser.email) {
                            const verificationEmail = await Verification.create({ payload: newUser.email, target: "EMAIL" }).save()
                            await sendVerificationEmail(newUser.fullName, verificationEmail.key)
                        }
                        const token = createJWT(newUser.id)
                        return {
                            ok: true,
                            error: null,
                            token
                        }
                    } else {
                        return {
                            ok: false,
                            error: "You haven't verify your email",
                            token: null
                        }
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