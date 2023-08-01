import jsonServer from 'json-server';
import { readFile, writeFile } from 'fs/promises';

const server = jsonServer.create();
const router = jsonServer.router('build/db/app.json');
const middlewares = jsonServer.defaults({
  static: 'build',
  noCors: true
});
const port = process.env.PORT || 3131;

server.use(middlewares);
server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}));

// Obsługa żądań DELETE dla endpointu usuwania tabeli
server.delete('/removetable/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const dbFile = await readFile('build/db/app.json', 'utf-8');
    const data = JSON.parse(dbFile);
    data.tables = data.tables.filter(table => table.id !== id);
    await writeFile('build/db/app.json', JSON.stringify(data, null, 2), 'utf-8');
    res.sendStatus(200);
  } catch (error) {
    console.log('Error:', error);
    res.sendStatus(500);
  }
});

server.use(router);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
