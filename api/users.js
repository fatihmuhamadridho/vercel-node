const express = require('express');
const cors = require('cors');
const { Users } = require('../config');

const app = express();

app.use(express.json());
app.use(cors());

module.exports = async(req, res) => {
    if (req.method === 'GET') {
        const snapshot = await Users.get();
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) )
        res.send(list);
    }
}