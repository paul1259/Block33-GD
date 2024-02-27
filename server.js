const express = require('express')
const app = express()
const port = process.env.PORT || 3000
process.env.DATABASE_URL || 'postgres://localhost/acme_notes_categories_db'
app.use(express.json())
app.use(require('morgan')('dev'))

const init = async () => {
    await client.connect()
    const SQL = `
    DROP TABLE IF EXISTS notes;
    DROP TABLE IF EXISTS categories;
    CREATE TABLE categories(
      id SERIAL PRIMARY KEY,
      name VARCHAR(100)
    );
    CREATE TABLE notes(
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      updated_at TIMESTAMP DEFAULT now(),
      ranking INTEGER DEFAULT 3 NOT NULL,
      txt VARCHAR(255) NOT NULL,
      category_id INTEGER REFERENCES categories(id) NOT NULL
    );
    `
    await client.query(SQL)
  console.log('data init')
    }

    const seed = async () => {
        await client.connect()
        const SQL = `
            INSERT INTO categories(name) VALUES('SQL');
            INSERT INTO categories(name) VALUES('Express');
            INSERT INTO categories(name) VALUES('Shopping');
            INSERT INTO notes(txt, ranking, category_id) VALUES('learn express', 5, (SELECT id FROM categories WHERE name='Express'));
            INSERT INTO notes(txt, ranking, category_id) VALUES('add logging middleware', 5, (SELECT id FROM categories WHERE name='Express'));
            INSERT INTO notes(txt, ranking, category_id) VALUES('write SQL queries', 4, (SELECT id FROM categories WHERE name='SQL'));
            INSERT INTO notes(txt, ranking, category_id) VALUES('learn about foreign keys', 4, (SELECT id FROM categories WHERE name='SQL'));
            INSERT INTO notes(txt, ranking, category_id) VALUES('buy a quart of milk', 2, (SELECT id FROM categories WHERE name='Shopping'));
            `
        await client.query(SQL)
      console.log('data seeded')
    }






app.listen(port, () => console.log(`listening on port ${port}`))
app.get('/api/categories', async (req, res, next) => { try {res.send()} catch (ex) {next(ex)}})
app.get('/api/notes', async (req, res, next) => { try {res.send()} catch (ex) {next(ex)}})
app.post('/api/notes', async (req, res, next) => { try {res.send()} catch (ex) {next(ex)}})
app.put('/api/notes/:id', async (req, res, next) => { try {res.send()} catch (ex) {next(ex)}})
app.delete('/api/notes/:id', async (req, res, next) => { try {res.sendStatus()} catch (ex) {next(ex)}})

init ()