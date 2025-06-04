// Routes use MODELS to interact with the database
// Models are automatically loaded by the Sequelize ORM in the models/index.js file - through db.ModelName
// Backend/routes/headache.js
const express = require('express');
const router = express.Router();
const db = require('../models');
const { Op, Sequelize } = require('sequelize'); // Sequelize operators


// Endpoint for stats with date filtering
router.get('/stats', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        
        const headaches = await db.headacheLogs.findAll({
            where: {
                startDate: {
                    [Op.between]: [new Date(startDate), new Date(endDate)]
                }
            },
            order: [['startDate', 'DESC']]
        });
        
        res.json(headaches);
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint for stats
router.get('/headaches', async (req, res) => {
    try{
        const headaches = await db.headacheLogs.findAll({
            order: [['startDate', 'DESC']] // Sort by startDate in descending order
        });
        res.json(headaches);
    } catch (error) {
        console.error('Error fetching headaches:', error);
        res.status(500).json({ error: error.message });
    }
});

// Create new headache log
router.post('/headache-entry', async (req, res) => {
    try {
        console.log('Received headache data:', req.body);
        const headache = await db.headacheLogs.create(req.body);
        res.status(201).json(headache);
    } catch (error) {
        console.error('Error creating headache:', error);
        res.status(400).json({ error: error.message });
    }
});

// Get all headache entries
// Reminder: whatever chosen '/all-headache-data', frontend needs to match
// const response = await axios.get('http://localhost:8080/api/my-headache-data')
router.get('/all-headache-data', async (req, res) => {
    try {
        const headaches = await db.headacheLogs.findAll({
            order: [['startDate', 'DESC']] // Sort by startDate in descending order
        });
        res.json(headaches);
    } catch (error) {
        console.error('Error fetching headaches:', error);
        res.status(400).json({ error: error.message });
    }
});

// Get single headache log by ID
router.get('/headaches/:id', async (req, res) => {
    try {
        const log = await db.headacheLogs.findByPk(req.params.id);
        if (!log) {
            return res.status(404).json({ error: 'Headache log not found' });
        }
        res.json(log);
    } catch (error) {
        console.error('Error fetching headache log:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get most common trigger
router.get('/most-common-trigger', async (req, res) => {
    try {
        const triggersData = await db.headacheLogs.findAll({
            attributes: ['triggers'],
            raw: true
        });

        const triggerCount = {};
        triggersData.forEach((headache) => {
            const triggers = headache.triggers;
            if (Array.isArray(triggers)) {
                triggers.forEach((trigger) => {
                    if (!triggerCount[trigger]) {
                        triggerCount[trigger] = 0;
                    }
                    triggerCount[trigger]++;
                });
            }
        });

        const sortedTriggers = Object.entries(triggerCount)
            .sort((a, b) => b[1] - a[1])
            .map(([trigger, count]) => ({ trigger, count }));

        const mostCommonTrigger = sortedTriggers.length > 0 ? sortedTriggers[0] : null;

        res.json(mostCommonTrigger);
    } catch (error) {
        console.error('Error fetching most common trigger:', error);
        res.status(500).json({ error: error.message });
    }
});

// 
router.delete('/headache-entry/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedHeadache = await db.headacheLogs.destroy({
            where: { id: id }
        });
        if (deletedHeadache) {
            res.json({ message: 'Headache log deleted successfully' });
        } else {
            res.status(404).json({ error: 'Headache log not found' });
        }
    } catch (error) {
        console.error('Error deleting headache log:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/average-pain-intensity', async (req, res) => {
    try{
        const result = await db.headacheLogs.findAll({
            attributes: [
                // Get the average pain intensity and alias it as averagePainIntensity
                // Using the column 'painIntensity'
                [Sequelize.fn('AVG', Sequelize.col('painIntensity')), 'averagePain']
            ],
            raw: true // This means that the result will be plain JSON objects
        });

        // Return average pain intensity formatted 
        // result[0] is the first row of the result
        const averagePain = result[0].averagePain ? Number(result[0].averagePain).toFixed(1) : '0.0';

        // Debugging
        console.log('Average pain calculation result:', result);
        console.log('Formatted average pain:', averagePain);
        
        res.json({ averagePain }); 
    } catch (error) {
        console.error('Error calculating average pain intensity:', error);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
