const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException',err => {
  console.log(err.name,err.message);
  console.log('Uncaught Exception! 💥 Shutting down!');
  process.exit();
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  //.connect(process.env.DATABASE_LOCAL,{ 
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB Connection successful!'))
  //.catch(err => console.log('DB Connection Error'));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});

process.on('unhandledRejection',err => {
  console.log(err.name,err.message);
  console.log('Unhandled Rejection! 💥 Shutting down!');
  server.close(() => {
    process.exit();
  }); 
});

