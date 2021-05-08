require('dotenv').config({ path: './config.env' });

const express = require('express');
const connectDB = require('./config/db');
const logger = require('./routes/api/logger');

connectDB();

const app = express();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/hardware', require('./routes/api/hardware'));
app.use('/api/software', require('./routes/api/software'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/logs', require('./routes/api/logs'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
