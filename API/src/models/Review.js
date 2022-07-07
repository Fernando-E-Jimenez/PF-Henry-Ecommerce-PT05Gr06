const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo temperamento
    sequelize.define('review', {
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
        star: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
        {
            timestamps: true,
            createdAt: true,
        }
    );
}