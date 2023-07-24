import Chat from "../../../entities/Chat";
import User from "../../../entities/User";
import { GetChatQueryArgs, GetChatResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
    Query: {
        GetChat: privateResolver(async (_, args: GetChatQueryArgs, { req }): Promise<GetChatResponse> => {
            const user: User = req.user
            try {
                const chat = await Chat.findOne({ id: args.chatId }, { relations: ['messages'] }) as any
                if (chat) {
                    if (chat.driverId === user.id || chat.passengerId === user.id) {
                        return {
                            ok: true,
                            error: null,
                            chat
                        }

                    } else {
                        return {
                            ok: false,
                            error: "Not authorized",
                            chat: null
                        }
                    }

                } else {
                    return {
                        ok: false,
                        error: "No chat found",
                        chat: null
                    }
                }

            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    chat: null
                }
            }


        })
    }
}
export default resolvers