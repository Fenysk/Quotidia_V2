import { getNotes, getNoteById, updateNote, deleteNote, getTodayNotes, createNote } from './notesService.js';
import { middlewareToken } from '../../middleware/token.js';

export default function notesRoutes(app) {

    app.get(

        '/notes', // Route

        { preHandler: middlewareToken }, // Middleware

        async (request, reply) => { // Handler

            const userId = request.userId;

            console.log('GET /notes');
            const notes = await getNotes(userId);

            reply.send(notes);
        });

    app.get(

        '/notes/today', // Route

        { preHandler: middlewareToken }, // Middleware

        async (request, reply) => { // Handler

            const userId = request.userId;

            console.log('GET /notes/today');
            const notes = await getTodayNotes(userId);

            reply.send(notes);
        });


    app.get(

        '/notes/:id', // Route

        { preHandler: middlewareToken }, // Middleware

        async (request, reply) => { // Handler

            const noteId = Number(request.params.id);

            console.log('GET /notes/:id');
            const note = await getNoteById(noteId);

            reply.send(note);
        });


    app.post(

        '/notes', // Route

        { preHandler: middlewareToken }, // Middleware

        async (request, reply) => { // Handler

            const userId = request.userId;
            const noteData = request.body;

            console.log('POST /notes');
            const note = await createNote(userId, noteData);

            reply.send(note);
        });


    app.patch(

        '/notes/:id', // Route

        { preHandler: middlewareToken }, // Middleware

        async (request, reply) => { // Handler

            const userId = request.userId;
            const noteId = Number(request.params.id);
            const noteData = request.body;

            console.log('PATCH /notes/:id');
            const note = await updateNote(userId, noteId, noteData);

            reply.send(note);
        });


    app.delete(

        '/notes/:id', // Route

        { preHandler: middlewareToken }, // Middleware

        async (request, reply) => { // Handler

            const userId = request.userId;
            const noteId = Number(request.params.id);

            console.log('DELETE /notes/:id');
            const note = await deleteNote(userId, noteId);

            reply.send(note);
        });


}
