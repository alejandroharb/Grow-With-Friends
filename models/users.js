module.exports = function(sequelize, DataTypes) { 
    var User = sequelize.define("User", {
        first_name: {
            type: DataTypes.STRING(100),
            allowNull:false,
            validate: {
                len: [1,100],
                isAlpha: true
            }
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull:false,
            validate: {
                len: [1,100],
                isAlpha: true
            }
        },
        user_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: [1,100],
                isAlphanumeric: true
            }
        },
        address: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: [1,100]
            }
        },
        image: DataTypes.STRING,
        description: {
            type: DataTypes.STRING(300),
            allowNull: true,
            validate: {
                len: [0,300]
            }
        }
    },
    {
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Craft, {
                    onDelete: 'cascade'
                });
            }
        }
    });
    return User;
}