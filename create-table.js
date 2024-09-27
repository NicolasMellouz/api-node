import { sql } from './db.js'

sql`
  CREATE TABLE produtos (
      id text PRIMARY KEY,
      name character varying(255),
      descricao character varying(255)
  );
`.then(() => {
  console.log('tabela criada');
})