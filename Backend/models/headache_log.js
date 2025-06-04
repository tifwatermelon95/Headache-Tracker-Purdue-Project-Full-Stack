module.exports = (sequelize, DataTypes) => {
    const headacheLog = sequelize.define("headacheLogs", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        duration: {
            type: DataTypes.INTEGER,  // Store duration in minutes
            allowNull: false,
            validate: {
                min: 0,
                max: 720  // 12 hours in minutes
            }
        },
        painStartLocation: {
            type: DataTypes.JSON, // Stores array of pain locations
            //values: ['Temples', 'Forehead', 'Back of head', 'All over'],
            allowNull: false,
            defaultValue: [],
            get(){
                const rawValue = this.getDataValue('painStartLocation');
                return rawValue ? JSON.parse(JSON.stringify(rawValue)) : [];
            }
        },
        painRadiation: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: []
        },
        painIntensity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                max: 10
            }
        },
        period: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        // Add symptoms as a JSON array
        symptoms: {
            type: DataTypes.JSON,  // Stores array of symptoms
            allowNull: false,
            defaultValue: [],
        },
        // Add triggers as a JSON array
        triggers: {
            type: DataTypes.JSON,  // Stores array of triggers
            allowNull: false,
            defaultValue: [],
        },
        medications:
        {
            type: DataTypes.JSON, // Stores array of medications
            allowNull: true,
            defaultValue: [],
        },
        medicationEffectiveness: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 0,
                max: 10
            }
            },
        }, {
            // Model options
            tableName: 'headacheLogs', // Explicitly set the table name
            timestamps: true,  // Adds createdAt and updatedAt automatically
            validate: {
                // Add any cross-field validations here if needed
            }
        });

    return headacheLog;
};