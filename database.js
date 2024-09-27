import { sql } from './db.js'
import { randomUUID } from 'crypto'

export class DatabaseProdutos {
    async createProduto(produto) {
        const id = randomUUID();
        const name = produto.name;
        const descricao = produto.descricao;

        await sql`insert into produtos (id, name, descricao)
        values (${id}, ${name}, ${descricao})`
    }
}