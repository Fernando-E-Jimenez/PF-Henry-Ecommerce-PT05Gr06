const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo temperamento
  sequelize.define(
    "order",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mont: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payment_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      payment_status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      external_reference: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      merchant_order_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      createdAt: false,
    }
  );
};
