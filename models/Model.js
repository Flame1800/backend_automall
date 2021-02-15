module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define("Car_model", {
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mark_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        timestamps: false,
    });

    return Model;
}