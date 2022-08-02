require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DATABASE_URL } = process.env;

const sequelize = new Sequelize(
  // `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/vinos`,
  DATABASE_URL || `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/vinos`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Category, Order, Product, Review, Rol, User, State, Car } = sequelize.models;

// Aca vendrian las relaciones

//State - User
State.hasMany(User, {
  foreignKey: 'stateId'
});
User.belongsTo(State);

//State - Category
State.hasMany(Category, {
  foreignKey: 'stateId'
});
Category.belongsTo(State);

//State - Order
State.hasMany(Order, {
  foreignKey: 'stateId'
});
Order.belongsTo(State);

//State - Product
State.hasMany(Product, {
  foreignKey: 'stateId'
});
Product.belongsTo(State);

//State - Review
State.hasMany(Review, {
  foreignKey: 'stateId'
});
Review.belongsTo(State);

//State - Rol
State.hasMany(Rol, {
  foreignKey: 'stateId'
});
Rol.belongsTo(State);

//Rol - User
Rol.hasMany(User, {
  foreignKey: 'rolId'
});
User.belongsTo(Rol);

// Product.hasMany(Reviews);

// Product - Category;

Product.belongsToMany(Category, { through: "productXcategory" });
Category.belongsToMany(Product, { through: "productXcategory" });

// // Product - Reviews;
Product.hasMany(Review);

//Order - User
User.hasMany(Order);
Order.belongsTo(User);

// productXorder -> Tabla intermedia para las ordenes

const productXorder = sequelize.define("productXorder", {
  cant: Sequelize.INTEGER,
});

// Product - User -> Carrito

Product.belongsToMany(User, { through: Car });
User.belongsToMany(Product, { through: Car });

// Product - user  -> Favoritos;

Product.belongsToMany(User, { as: 'Favorite', through: "favorites" });
User.belongsToMany(Product, { as: 'Favorite', through: "favorites" });

// Product - Order;

Product.belongsToMany(Order, { through: productXorder });
Order.belongsToMany(Product, { through: productXorder });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
