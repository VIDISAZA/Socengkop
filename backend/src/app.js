const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const routes = require('./routes');
app.use('/api', routes);

app.get('/', (req, res) => res.json({ name: 'SocengKOP API', status: 'Running' }));

app.listen(PORT, () => {
  console.log(`🚀 SocengKOP Backend running on http://localhost:${PORT}`);
});
