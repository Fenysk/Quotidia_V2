import { treatEntry } from "./quickEntryService.js";
import { middlewareToken } from "../../middleware/token.js";

export default function quickEntryRoutes(app) {

    app.post(

        '/quickEntry', // Route

        { preHandler: middlewareToken }, // Middleware

        async (request, reply) => { // Handler
            console.log('POST /quickEntry');
            
            const entry = request.body.entry;
            const treatedEntry = await treatEntry(request.userId, entry);

            reply.send(treatedEntry);
        });

}