import express, {json} from 'express';
import chalk from 'chalk';
import cors from 'cors';

const app = express();

app.use(cors(), json());

//persistência de dados com variaveis globais + listas de users e tweets
const users = [];
const tweets = [];

app.post('/sign-up', (req,res) => {
     const {username, avatar} = req.body;
     if (!username || !avatar) {
         res.status(400).send("Por favor, preencha todos os campos");
     }

     users.push({username,avatar});
     res.status(200).send("Usuário cadastrado!");
});


//teste
app.get('/get-users', (req,res) => {
    res.send(users);
})
app.listen(5000, () => {console.log(chalk.green("Servidor funcionando na porta 5000!"))})