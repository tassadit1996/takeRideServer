import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import {
    RequestRideMutationArgs,
    RequestRideResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
    Mutation: {
        RequestRide: privateResolver(
            async (
                _,
                args: RequestRideMutationArgs,
                { req, pubSub }
            ): Promise<RequestRideResponse> => {
                const user: User = req.user;
                if (!user.isRiding && !user.isDriving) {
                    try {
                        const ride1 = await Ride.create({ ...args, passenger: user } as any).save();
                        pubSub.publish("rideRequest", { DriversSubscription: ride1 })
                        user.isRiding = true;
                        user.save()
                        return {
                            ok: true,
                            error: null,
                            ride: ride1 as any
                        };
                    } catch (error) {
                        return {
                            ok: false,
                            error: error.message,
                            ride: null
                        };
                    }
                } else {
                    return {
                        ok: false,
                        error: "You can't request two rides or drive and request",
                        ride: null
                    };
                }
            }
        )
    }
};

export default resolvers;