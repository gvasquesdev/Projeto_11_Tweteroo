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
         return;
     }
    
     users.push({username,avatar});
     res.status(201).send("Usuário cadastrado!");
});

app.post("/tweets", (req, res) => {
    const {tweet, username} = req.body;

    if(!username || !tweet) {
      res.status(400).send("Por favor, preencha todos os campos");
    }

    const findUser = users.find(user => user.username === username);
    const avatar = findUser.avatar;
    console.log(avatar);
    tweets.push({username, tweet, avatar});
    res.status(201).send("Tweet enviado!");
  
  });


  app.get("/tweets", (req, res) => {
    if(tweets.length <= 10) {   
        res.send([... tweets].reverse());
    } else{
        res.send([... tweets].reverse().splice(0,10));
    }
    console.table(users);
  });

  app.get("/tweets/:username", (req, res) => {
    const {username} =  req.params;
    const filteredTweets = tweets.filter(tweet => tweet.username === username);
    res.send(filteredTweets);
  })


//teste
app.get('/get-users', (req,res) => {
    res.send(usuarios);
})
app.listen(5000, () => {console.log(chalk.green("Servidor funcionando na porta 5000!"))})