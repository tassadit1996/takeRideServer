import Place from "../../../entities/Place";
import User from "../../../entities/User";
import { DeletePlaceMutationArgs, DeletePlaceResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
    Mutation: {
        DeletePlace: privateResolver(async (_, args: DeletePlaceMutationArgs, { req }): Promise<DeletePlaceResponse> => {
            const user: User = req.user
            const place = await Place.findOne(args.placeId)
            if (place) {
                if (place.userId === user.id) {
                    await place.remove()
                    return {
                        ok: true,
                        error: null
                    }

                } else {
                    return {
                        ok: false,
                        error: "not authorized"
                    }
                }

            } else {
                return {
                    ok: false,
                    error: "place not found"
                }
            }

        })
    }
}
export default resolvers