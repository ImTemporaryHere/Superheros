import express from 'express';
import config from 'config';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';

import superheroesRouter from './routes/superheroes';

const app = express()

app.use(cors())

app.use(express.json({ extended: true }))

app.use(express.static('public'));

app.use('/api/superheroes', superheroesRouter)


if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = config.get('port') || 5000

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()

