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
        password: {
            type: DataTypes.STRING(100),
            allowNull:false,
            validate: {
                len: [6,100],
                isAlphanumeric: true
            }
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: [1,100],
                isEmail: true
            },
        },
        address: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: [1,100]
            }
        },
        image: DataTypes.STRING
    },
    {
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Golf, {
                    onDelete: 'cascade'
                });
            },
            associate: function(models) {
                User.hasMany(models.Guitar, {
                    onDelete: 'cascade'
                });
            }
        }
    });
    return User;
}