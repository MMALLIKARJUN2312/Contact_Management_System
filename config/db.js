const mysql = require('mysql2/promise'); 
const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbConnectionConfig = {
  host: process.env.DB_HOST,  
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,  
  dialect: 'mysql',
  logging: false, 
});

const createDatabaseIfNotExists = async () => {
  const connection = await mysql.createConnection(dbConnectionConfig);
  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    console.log(`Database "${process.env.DB_NAME}" created or exists`);
  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    await connection.end(); 
  }
};

const connectDB = async () => {
  try {
    await createDatabaseIfNotExists(); 
    await sequelize.authenticate();
    console.log('Database connection has been established successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDB };
