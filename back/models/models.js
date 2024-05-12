const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' }
});

const Book = sequelize.define('Book', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  publication_year: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  cover_image: { type: DataTypes.STRING, allowNull: false },
  bestseller: { type: DataTypes.BOOLEAN, defaultValue: false },
  isNew: { type: DataTypes.BOOLEAN, defaultValue: false },
  discount: { type: DataTypes.BOOLEAN, defaultValue: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
});

const Genre = sequelize.define('Genre', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  genre: { type: DataTypes.STRING, allowNull: false },
  cover_image: { type: DataTypes.STRING, allowNull: false },
});


const Application = sequelize.define('Application', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  paymentMethod: { type: DataTypes.STRING, allowNull: false },
  delivery: { type: DataTypes.BOOLEAN, defaultValue: false },
  processed: { type: DataTypes.BOOLEAN, defaultValue: false },
});

Genre.hasMany(Book);
Book.belongsTo(Genre);

module.exports = {
  User, Book, Application, Genre
};





