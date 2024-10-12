import  { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv'

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_NAME,process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
  });

  
// Test database connection
sequelize.authenticate()
.then(() => console.log('Connection to MySQL has been established successfully.'))
.catch(err => console.error('Unable to connect to the database:', err));

const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false  
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false  
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true  
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false  
    }
  });
  // Sync the model with the database (create the table if it doesn't exist)
  sequelize.sync()
    .then(() => console.log('Product table has been synced.'))
    .catch(err => console.error('Error syncing table:', err));

export default Product;