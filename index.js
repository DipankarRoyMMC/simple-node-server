const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.send('First Node Server Running!!! 2023');
})

const users = [
    { id: 1, name: 'Sadia Ayman', email: 'sadia@gmail.com' },
    { id: 2, name: 'Sabnur', email: 'sabnur@gmail.com' },
    { id: 3, name: 'Moushumi', email: 'moushomi@gmail.com' }

]
// use middleware 
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send(users);
});


// user: dbUser1
//password: cMzN5HosbtFV3rBK

const uri = "mongodb+srv://dbUser1:cMzN5HosbtFV3rBK@cluster0.tmkhisl.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('simpleNode').collection('users');
        // const user = { name: 'hp laptop', email: 'hplaptop@gmail.com' };
        // const result = await userCollection.insertOne(user);
        // console.log(result);

        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        });


        app.post('/users', async (req, res) => {
            const user = req.body;
            // users.push(user);
            // console.log(user);
            const result = await userCollection.insertOne(user);
            console.log(result);
            user._id = result.insertedId;

            res.send(user);
        });

    }
    finally {

    }
}
run().catch(err => console.log(err));

// data post 
// app.post('/users', (req, res) => {
//     console.log('Post API Called');
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user);
//     console.log(user);
//     res.send(user);

//     console.log(req.body);
// });

app.listen(port, () => {
    console.log(`Simple node server Running ${port}`)
})