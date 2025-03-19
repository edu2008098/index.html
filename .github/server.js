const cors = require('cors');
   const bodyParser = require('body-parser');
   const fs = require('fs');

   const app = express();
   app.use(cors());
   app.use(bodyParser.json());

   const PORT = 3000;
   const FILE_PATH = './data/agendamentos.json';

   // Create data directory and file if they don't exist
   if (!fs.existsSync('./data')) {
       fs.mkdirSync('./data');
   }
   if (!fs.existsSync(FILE_PATH)) {
       fs.writeFileSync(FILE_PATH, '[]');
   }

   app.post('/agendar', (req, res) => {
       const { nome, data } = req.body;
       const agendamentos = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
       agendamentos.push({ nome, data });
       fs.writeFileSync(FILE_PATH, JSON.stringify(agendamentos, null, 2));
       res.status(201).send('Agendamento salvo!');
   });

   app.get('/agendamentos', (req, res) => {
       const agendamentos = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
       res.json(agendamentos);
   });

   app.listen(PORT, () => {
       console.log(`Servidor rodando em http://localhost:${PORT}`);
   });