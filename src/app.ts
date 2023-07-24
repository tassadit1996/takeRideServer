import cors from "cors"
import { GraphQLServer, PubSub } from "graphql-yoga"
import helmet from "helmet"
import logger from "morgan"
import schema from "./schema"
import decodeJWT from "./utils/decodeJWT"

class App {
    public app: GraphQLServer;
    public pubSub: any;
    constructor() {
        this.pubSub = new PubSub();
        this.pubSub.ee.setMaxListeners(99);
        this.app = new GraphQLServer({
            schema,
            context: req => {
                const { connection: { context = null } = {} } = req;
                return {
                    req: req.request,
                    pubSub: this.pubSub,
                    context
                };
            }
        });
        this.middlewares();
    }
    private middlewares = (): void => {
        this.app.use(cors());
        this.app.use(logger("dev"));
        this.app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
        this.app.use(this.jwt);

    }
    private jwt = async (req, res, next): Promise<void> => {
        const token = req.get("X-JWT")
        if (token) {
            const user = await decodeJWT(token)
            if (user) {
                req.user = user

            } else {
                req.user = undefined
            }
        }
        next()
    }
}
export default new App().app