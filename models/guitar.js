module.exports = function(sequelize, DataTypes) {
    var Guitar = sequelize.define("Guitar", {
        user_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: [1,100],
                isAlpha: true
            }
        },
        year_experience: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: true,
                val: [0,100]
            }
        },
        experience_rating: {
            type: DataTypes.INTEGER,
            allowNull:false,
            validate: {
                isNumeric:true,
                val: [1,3]
            }
        },
        distance_preference: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true,
                val: [1,300]
            }
        }
    },
    {
        classMethods: {
            associate: function(models) {
                Guitar.belongsTo(models.User, {
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Guitar;
}