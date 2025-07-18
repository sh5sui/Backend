const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const bannedUsers = new Set();

app.post('/ban', (req, res) => {
    const username = req.body.username;
    if (!username) return res.status(400).send("No username provided");
    bannedUsers.add(username.toLowerCase());
    res.send({ success: true, message: `${username} banned.` });
});

app.post('/unban', (req, res) => {
    const username = req.body.username;
    if (!username) return res.status(400).send("No username provided");
    bannedUsers.delete(username.toLowerCase());
    res.send({ success: true, message: `${username} unbanned.` });
});

app.get('/checkban', (req, res) => {
    const username = req.query.username;
    if (!username) return res.status(400).send("No username provided");
    const banned = bannedUsers.has(username.toLowerCase());
    res.send({ banned });
});

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
