const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const db = new sqlite3.Database(':memory:'); // In-memory database

// Middleware
app.use(bodyParser.json());

// Initialize database
db.serialize(() => {
    db.run("CREATE TABLE contacts (id INTEGER PRIMARY KEY, name TEXT, phone TEXT, email TEXT)");
});

// Routes
app.get('/contacts', (req, res) => {
    db.all("SELECT * FROM contacts", (err, rows) => {
        if (err) {
            res.status(500).send('Error fetching contacts');
        } else {
            res.json(rows);
        }
    });
});

app.post('/contacts', (req, res) => {
    const { name, phone, email } = req.body;
    db.run("INSERT INTO contacts (name, phone, email) VALUES (?, ?, ?)", [name, phone, email], function(err) {
        if (err) {
            res.status(500).send('Error adding contact');
        } else {
            db.all("SELECT * FROM contacts", (err, rows) => {
                res.json(rows);
            });
        }
    });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
