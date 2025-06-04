import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import brainImage from '../assets/brain.png';
import axios from 'axios';


function StatsHeader() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        thisWeekCount: 0,
        thisMonthCount: 0,
        weekDateRange: '',
        monthDateRange: '',
        mostCommonTrigger: 'None',
        averagePainIntensity: '0.0'
    });

    const[topTriggers, setTopTriggers] = useState([]);

    const fetchStats = async () => {
        try {
            // Fetch all headache data
            const response = await axios.get('http://localhost:8080/api/all-headache-data');
            const headaches = response.data;
            
            // Get current date
            const now = new Date();
            
            // Calculate week range
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1));
            startOfWeek.setHours(0, 0, 0, 0);
            
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(endOfWeek.getDate() + 6);
            endOfWeek.setHours(23, 59, 59, 999);

            // Calculate month range
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            endOfMonth.setHours(23, 59, 59, 999);

            // Count headaches
            const weekHeadaches = headaches.filter(headache => {
                const headacheDate = new Date(headache.startDate);
                return headacheDate >= startOfWeek && headacheDate <= endOfWeek;
            });
            
            const monthHeadaches = headaches.filter(headache => {
                const headacheDate = new Date(headache.startDate);
                return headacheDate >= startOfMonth && headacheDate <= endOfMonth;
            });

            // Debug logging
            console.log('Current date:', now);
            console.log('Week range:', startOfWeek, 'to', endOfWeek);
            console.log('Month range:', startOfMonth, 'to', endOfMonth);
            console.log('All headaches:', headaches);
            console.log('Week headaches:', weekHeadaches);
            console.log('Month headaches:', monthHeadaches);

             // Fetch the most common trigger
            const commonTriggerResponse = await axios.get('http://localhost:8080/api/most-common-trigger');
            const commonTrigger = commonTriggerResponse.data;
            console.log('Most common trigger:', commonTrigger); // Debug logging
            
            // Fetch average pain intensity
            const painResponse = await axios.get('http://localhost:8080/api/average-pain-intensity');
            const averagePain = painResponse.data.averagePain;

            // Set stats state
            const formatDate = (date) => {
                return date.toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
            };

            setStats({
                thisWeekCount: weekHeadaches.length,
                thisMonthCount: monthHeadaches.length,
                weekDateRange: `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`,
                monthDateRange: `${formatDate(startOfMonth)} - ${formatDate(endOfMonth)}`,
                 mostCommonTrigger: commonTrigger ? `${commonTrigger.trigger}` : 'None',
                 averagePainIntensity: averagePain
            });

        } catch (error) {
            console.error('Error fetching headache stats:', error);
        }
    };

    useEffect(() => {
        fetchStats(); 
        const interval = setInterval(fetchStats, 60000); // Refresh stats every minute
        return () => clearInterval(interval);
    }, []);


    return (
        <div className="stats-page">
            <div className="stats-header">
                <div className="brain-image-container">
                    <img src={brainImage} alt="brain" className="brain-image" />
                </div>
                <h1 className="header-title">Statistics 📈</h1>
                <nav className = "stat-nav-buttons">
                    <button onClick={() => navigate('/')} className = "s-nav-buttons">HOME</button>
                    <button onClick={() => navigate('/entries')} className = "s-nav-buttons">ENTRIES</button>
                </nav>
            </div>

                <div className="stat-card">
                    <h3>This Week's Headaches 🤕:</h3>
                    <span className="stat-number">{stats.thisWeekCount}</span>
                    <p className="date-range">{stats.weekDateRange}</p>
                </div>

                <div className="stat-card">
                    <h3>This Month's Headaches 📆:</h3>
                    <span className="stat-number">{stats.thisMonthCount}</span>
                    <p className="date-range">{stats.monthDateRange}</p>
                </div>

                <div className="stat-card">
                    <h3>Most Common Trigger ⚡:</h3>
                    <span className="stat-number">{stats.mostCommonTrigger}</span>
                </div>

                <div className="stat-card">
                    <h3>Average Pain Intensity ❤️‍🩹:</h3>
                    <span className="stat-number"> 
                    {stats.averagePainIntensity !== undefined ? stats.averagePainIntensity : '0.0'}
                    </span>
                    
            </div>
        </div>
    );
}

export default StatsHeader;