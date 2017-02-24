module.exports = function(sequelize, DataTypes) {
    var Spanish = sequelize.define("Spanish", {
        user_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: [1,100],
                isAlpha: true
            }
        },
        rating_knowledge: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isAlpha:true
            }
        },
        rating_teaching: {
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
                Spanish.belongsTo(models.User, {
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Spanish;
}