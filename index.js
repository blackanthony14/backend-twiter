const express = require("express");
const morgan = require("morgan");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const { add } = require("functools");

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.listen(5000);
console.log("Server on port 5000");

app.get("/", (req, res) => {
  res.send("Servidor Iniciado con Express.js");
});

app.get("/tweets", async (req, res) => {
  const tweets = await prisma.tweets.findMany();
  res.json(tweets);
});
app.post("/createTweet", async (req, res) => {
  const { displayName, username, text, image, avatar, verified } = req.body;
  const libro = await prisma.tweets.create({
    data: {
      displayName: displayName,
      username: username,
      text: text,
      image: image,
      avatar: avatar,
      verified: verified,
    },
  });
  res.json(libro);
});
app.get("/cuentas/:username", async (req, res) => {
  const id = req.params.username;
  const libro = await prisma.cuenta.findFirst({
    where: {
      username: id,
    },
  });
  res.json(libro);
});
app.get("/tweetsId/:id", async (req, res) => {
    const id = Number(req.params.id);
    const tweets = await prisma.tweets.findUnique({
        where: {
            id: id,
          },
    });
    res.json(tweets);
  });
app.post("/createAcount", async (req, res) => {
  const { displayName, username, verified, correo, avatar, password } =
    req.body;
  const libro = await prisma.cuenta.create({
    data: {
      displayName: displayName,
      username: username,
      password: password,
      verified: verified,
      correo: correo,
      avatar: avatar,
      followers: [],
      fallowed: []
    },
  });
  res.json(libro);
});
app.get("/cuentas", async (req, res) => {
  const libro = await prisma.cuenta.findMany();
  res.json(libro);
});

app.put("/cuentaEdit/:id", async (req, res) => {
  const tweets = req.body;
  const id = Number(req.params.id);
  const updateLibro = await prisma.cuenta.update({
    where: {
      id: id,
    },
    data: {
      tweets: tweets
    },
  });
  res.json(updateLibro);
});
app.put("/tweetEdit/:id", async (req, res) => {
    const coments = req.body;
    const id = Number(req.params.id);
    const updateLibro = await prisma.tweets.update({
      where: {
        id: id,
      },
      data:{
        coments: coments
      }
      ,
    });
    res.json(updateLibro);
  });
  app.get("/tweetComents/:id", async (req, res) => {
    const id = Number(req.params.id);
    const libro = await prisma.tweets.findUnique({
      where: {
        id: id,
      },
    });
    res.json(libro);
  });
  app.put("/tweetEditLikes/:id", async (req, res) => {
    const likes = req.body;
    const id = Number(req.params.id);
    const updateLibro = await prisma.tweets.update({
      where: {
        id: id,
      },
        data:{
            likes: likes
        },
    });
    res.json(updateLibro);
  });

  app.delete('/tweets', async(req,res)=>{
    const delLibros = await prisma.tweets.deleteMany();
    res.json(delLibros);
})
app.delete('/cuenta', async(req,res)=>{
    const delLibros = await prisma.cuenta.deleteMany();
    res.json(delLibros);
})
app.delete('/teewtsDel/:id', async(req, res) =>{
    const id = Number(req.params.id);
    const deleteUser = await prisma.tweets.delete({
        where:{
            id: id,
        },
    });
    res.json(deleteUser);
});
app.delete('/cuentaDel/:id', async(req, res) =>{
    const id = Number(req.params.id);
    const deleteUser = await prisma.cuenta.delete({
        where:{
            id: id,
        },
    });
    res.json(deleteUser);
});
app.get("/cuentasGet/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const libro = await prisma.cuenta.findUnique({
        where: {
            id:id
        }
    });
    res.json(libro);
  });

  app.put("/setFollowers/:id", async (req, res) => {
    const followers = req.body;
    const id = Number(req.params.id);
    const updateLibro = await prisma.cuenta.update({
      where: {
        id: id,
      },
        data:{
            followers: followers
        },
    });
    res.json(updateLibro);
  });

  app.put("/setFallowed/:id", async (req, res) => {
    const fallowed = req.body;
    const id = Number(req.params.id);
    const updateLibro = await prisma.cuenta.update({
      where: {
        id: id,
      },
        data:{
            fallowed: fallowed
        },
    });
    res.json(updateLibro);
  });