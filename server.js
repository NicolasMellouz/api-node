
import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { DatabasePostgres } from './database-postgres.js'
import { DatabaseProdutos } from './database.js';

const server = fastify();
const database = new DatabaseProdutos;

// CORS
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})

// ENDPOINTS (CRUD):

// CREATE
server.post('/produtos', async (request, reply) => {
    const body = request.body;
    await database.createProduto(body);
    return 201
})


// READ
server.get('/', () => {
    return 'Mamma';
});

server.get('/produtos', () => {
    return 'Mamma spaghetti';
});


// UPDATE


// DELETE


server.listen({
    port: 3333
});
