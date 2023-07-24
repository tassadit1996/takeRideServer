import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
    Query: {
        GetRide: privateResolver(async (_, args, { req }) => {
            const user: User = req.user
            try {
                const ride = await Ride.findOne({ id: args.rideId })
                if (ride) {
                    if (ride.passengerId === user.id || ride.driverId === user.id) {
                        return {
                            ok: true,
                            error: null,
                            ride
                        }
                    } else {
                        return {
                            ok: false,
                            error: "Not authorized",
                            ride: null
                        }
                    }

                } else {
                    return {
                        ok: false,
                        error: "No ride has found",
                        ride: null
                    }
                }

            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    ride: null
                }
            }

        })
    }

}
export default resolvers