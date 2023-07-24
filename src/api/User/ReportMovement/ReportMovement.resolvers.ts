import User from "../../../entities/User";
import { ReportMovementMutationArgs, ReportMovementResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import cleanNullArgs from "../../../utils/cleanNullArgs";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
    Mutation: {
        ReportMovement: privateResolver(async (_, args: ReportMovementMutationArgs, { req, pubSub }): Promise<ReportMovementResponse> => {
            const user: User = req
            const notNull = cleanNullArgs(args)
            try {
                await User.update({ id: user.id }, { ...notNull })
                const updateUser = await User.findOne(user.id)
                pubSub.publish("driverUpdate", { DriversSubscription: updateUser })
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