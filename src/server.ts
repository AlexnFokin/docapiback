<<<<<<< HEAD
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
=======

import config from "./config/config";
import app from "./app";

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
>>>>>>> 4be350b (added express)
});