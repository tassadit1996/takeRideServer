import { Between, getRepository } from "typeorm";
import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import Ride from "../../../entities/Ride";
import { GetNearbyRideResponse } from "../../../types/graph";

const resolvers: Resolvers = {
    Query: {
        GetNearbyRide: privateResolver(async (_, __, { req }): Promise<GetNearbyRideResponse> => {
            const user: User = req.user
            if (user.isDriving) {
                try {
                    const ride1 = await getRepository(Ride).findOne({
                        status: "REQUESTING",
                        pickUpLat: Between(user.lastLat - 0.05, user.lastLat + 0.05),
                        pickUpLng: Between(user.lastLng - 0.05, user.lastLng + 0.05)
                    })
                    if (ride1) {
                        return {
                            ok: true,
                            error: null,
                            ride: ride1 as any
                        }
                    } else {
                        return {
                            ok: true,
                            error: "ride not found",
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
            } else {
                return {
                    ok: false,
                    error: "You are not driving",
                    ride: null
                }
            }


        })
    }
}
export default resolvers