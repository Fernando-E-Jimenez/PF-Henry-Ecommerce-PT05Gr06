const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo temperamento
    sequelize.define('rol', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
          type: DataTypes.STRING,
          allowNull: false,
      }
    },
        {
            timestamps: false,
            createdAt: false,
        }
    );
}