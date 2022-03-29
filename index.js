const express = require('express')
const mongoose = require('mongoose')
const dns = require('dns')
const os = require('os')
const cors = require('cors')

const settings = {
  PORT: process.env.PORT || 5000,
  HOST: process.env.HOST || '0.0.0.0',
  dbURL: "mongodb+srv://admin:admin@cluster0.lmi1q.mongodb.net/db_rabs?retryWrites=true&w=majority",
}
const { dbURL, HOST, PORT } = settings

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', require('./routes/router'))

mongoose
  .connect(dbURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
})
  .then(() => {
    app.listen(PORT, HOST, () => {
      dns.lookup(os.hostname(), function (error, host) {
        if (error) {
          console.log(error)
        } else {
          console.log(`📎 Network:  http://${host}:${PORT}`)
          console.log(`📎 Localhost:  http://localhost:${PORT}`)
        }
      })
    })
  })
  .catch((error) => {
    throw new Error(error)
  })