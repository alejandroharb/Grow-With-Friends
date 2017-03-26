module.exports = function(sequelize, DataTypes) {
    var Craft = sequelize.define("Craft", {
        user_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: [1,100],
                isAlpha: true
            }
        },
        craft: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true,
                len: [1,100]
            }
        },
        year_experience: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: true,
                len: [0,100]
            }
        },
        experience_rating: {
            type: DataTypes.INTEGER,
            allowNull:false,
            validate: {
                isNumeric:true,
                len: [1,3]
            }
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true,
                len: [1,300]
            }
        }
    },
    {
        classMethods: {
            associate: function(models) {
                Craft.belongsTo(models.User, {
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Craft;
}