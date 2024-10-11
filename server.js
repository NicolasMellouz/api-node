import { fastify } from 'fastify';
import cors from '@fastify/cors';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();
const databasePostgres = new DatabasePostgres;

// CORS
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})

// ENDPOINTS (CRUD):

// CREATE
server.post('/produtos', async (request, reply) => {
    const body = request.body;
    let error = {};

    if (!body.name) {
        error.name = 'O Name não foi Informado'
    } 
    
    if (!body.descricao) {
        error.descricao = 'A Descricao não foi Informada'
    } 

    if(body.name && body.descricao) {
        await databasePostgres.createProduto(body);
        return reply.status(201).send();
    } else {
        return reply.status(400).send(error);
    }

    // await databasePostgres.createProduto(body);
    // return reply.status(201).send();
})

// READ
server.get('/produtos', async () => {
    const produtos = await databasePostgres.listProdutos();
    return produtos;
});

// // UPDATE
// server.put('/produtos/:id', async (request, reply) => {
//     const produtoID = request.params.id;
//     const body = request.body;
//     await databasePostgres.updateProduto(produtoID, body);

//     let error = {};

//     if(!produtoID) {
//         error.id = 'O valor não foi informado'
//     }

//     if (!body.name) {
//         error.name = 'O Name não foi Informado'
//     } 
    
//     if (!body.descricao) {
//         error.descricao = 'A Descricao não foi Informada'
//     } 

//     if(body.name && body.descricao && produtoID) {
//         await databasePostgres.updateProduto(produtoID, body);
//         return reply.status(204).send('Alterado com sucesso');
//     } else {
//         return reply.status(400).send(error);
//     }

// })

// UPDATE
server.put('/produtos/:id', async (request, reply) => {
    const produtoID = request.params.id;
    const body = request.body;
    let error = {};

    // Validação do ID
    if (!produtoID) {
        error.id = 'O ID do produto não foi informado';
    }

    // Validação dos campos
    if (!body.name) {
        error.name = 'O Name não foi Informado';
    }
    
    if (!body.descricao) {
        error.descricao = 'A Descricao não foi Informada';
    }

    // Se houver erros, retornar 400 com as mensagens
    if (Object.keys(error).length > 0) {
        return reply.status(400).send(error);
    }

    // Se todos os dados forem válidos, atualiza o produto
    try {
        const updatedProduto = await databasePostgres.updateProduto(produtoID, body);
        
        if (updatedProduto) {
            return reply.status(204).send('Alterado com sucesso');
        } else {
            return reply.status(404).send({ error: 'Produto não encontrado' });
        }
    } catch (err) {
        return reply.status(500).send({ error: 'Erro ao atualizar o produto' });
    }
});

// DELETE
server.delete('/produtos/:id', async (request, reply) => {
    const produtoID = request.params.id;
    await databasePostgres.deleteProduto(produtoID);

    return reply.status(204).send();
})

server.listen({
    port: 3333
});
