import { treatEntry } from "./quickEntryService.js";
import { middlewareToken } from "../../middleware/token.js";

export default function quickEntryRoutes(app) {

    app.post(

        '/quickEntry',

        { preHandler: middlewareToken },

        async (request, reply) => {
            console.log('POST /quickEntry');

            const entry = await treatEntry(request.body.entry);

            reply.send(entry);
        });

}