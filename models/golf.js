module.exports = function(sequelize, DataTypes) {
    var Golf = sequelize.define("Golf", {
        user_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: [1,100],
                isAlpha: true
            }
        },
        rating_holes_quantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isAlpha:true
            }
        },
        rating_score: {
            type: DataTypes.INTEGER,
            allowNull:true,
            validate: {
                isAlpha:true
            }
        }
    },
    {
        classMethods: {
            associate: function(models) {
                Golf.belongsTo(models.User, {
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Golf;
}