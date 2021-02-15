module.exports = (sequelize, DataTypes) => {
    const Mark = sequelize.define("Car_mark", {
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        timestamps: false
    });

    return Mark;
}