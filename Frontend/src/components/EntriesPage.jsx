import React from 'react';
import { useNavigate } from 'react-router-dom';
import brainImage from '../assets/brain.png';

/*
In App.jsx - passing headache logs like this:
<Route path="/entries" element={
    <EntriesPage logs={headacheLogs} onGetLog={getHeadacheLog} />
} />

To access the logs in EntriesPage.jsx, we need to destructure the props object and extract the logs array.
Can be done with (props) or without destructuring ({logs})
*/

function EntriesPage({ logs, onDeleteLog }) {
    // Can use logs directly in this component
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this entry?')) {
            await onDeleteLog(id);
        }
    };

    // Date formatting function
    // (date) is a parameter that represents the date to be formatted
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-GB', { 
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        });
    };


    return (
        <div className="entries-page">
             <div className="brain-image-container">
                    <img src={brainImage} alt="brain" className="brain-image" />
                </div>
            <h1 className="entries-title">Entries 📖</h1>
            <div className="nav-buttons">
                {/* When clicked, navigates to the home page. Makes use of 
                 the useNavigate hook from react-router-dom */}
                <button onClick={() => navigate('/')} className="nav-button">HOME</button>
                <button onClick={() => navigate('/stats')} className="nav-button">STATS</button>
            </div>

            
            <div className="entries-container">
                {/* logs - array of headache entries from database.
                    .map() - Transforms each item in an array into something else.
                    In this case, it transforms each entry into a div element.
                    key - unique identifier for each entry
                */}
                {logs.map((entry) => (
                    //(entry) is a parameter that represents the current entry in the array
                    // entry.id - unique identifier for each entry
                    <div key={entry.id} className="entry-card">
                        <div className = "entry-actions">
                            <button
                                onClick={() => handleDelete(entry.id)}
                                className = "delete-button"
                                >
                                    Delete
                                </button>
                        </div>

                        {/* Left section (entry-date) 
                            - Date is split into two parts: date-number & month-year
                        */}
                        <div className="entry-date">
                            <div className="date-number">
                                {new Date(entry.startDate).getDate()}
                            </div>
                            <div className="month-year">
                                {new Date(entry.startDate).toLocaleDateString('en-GB', { 
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </div>
                        </div>
                        {/* Right section (entry-details) 
                            - Contains details of the entry
                        */}
                        <div className="entry-details">
                            <div className="detail-row">
                                <strong>Date:</strong> {formatDate(entry.startDate)}
                            </div>
                            <div className="detail-row">
                                <strong>Duration:</strong> {entry.duration} mins
                            </div>
                            <div className="detail-row">
                                <strong>Pain Starting Location:</strong> {entry.painStartLocation.join(', ')}
                            </div>
                            <div className="detail-row">
                                <strong>Pain Radiated to:</strong> {entry.painRadiation.join(', ')}
                            </div>
                            <div className="detail-row">
                                <strong>Pain Intensity:</strong> {entry.painIntensity}/10
                            </div>
                            <div className="detail-row">
                                <strong>Period:</strong> {entry.period ? 'Yes' : 'No'}
                            </div>
                            <div className="detail-row">
                                <strong>Symptoms:</strong> {entry.symptoms.join(', ')}
                            </div>
                            <div className="detail-row">
                                <strong>Triggers:</strong> {entry.triggers.join(', ')}
                            </div>
                            <div className="detail-row">
                                <strong>Medications:</strong> {entry.medications.join(', ')}
                            </div>
                            <div className="detail-row">
                                <strong>Medication Effectiveness:</strong> {entry.medicationEffectiveness}/10
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EntriesPage;