import { useState, useEffect } from 'react'
import React from 'react'
import Header from './components/Header'
import HeadacheLog from './components/HeadacheLog'
import './App.css'
import axios from 'axios'
import StatsHeader from './components/stats_header'
import EntriesPage from './components/EntriesPage'
import { Routes, Route } from 'react-router-dom'

function App() {
  const [headacheLogs, setHeadacheLogs] = useState([]);
  
  // Wait for axios to fetch the data from the server
  const fetchHeadacheLogs = async() => {
    try {
      const response = await axios.get('http://localhost:8080/api/all-headache-data');
      setHeadacheLogs(response.data);
      console.log('Headache logs:', response.data);
    } catch (error) {
      console.error('Error fetching headache logs:', error);
    }
  }

  // Creates a new headache log
  // This gets passed down as a prop to the HeadacheLog component
  // async function that sends a POST request to the server
  // logData - object containing the new log data
  const createHeadacheLog = async(logData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/headache-entry', logData);
      console.log('Created new headache log:', response.data);
      // Refresh the list after creating a new log
      fetchHeadacheLogs();
    } catch (error) {
      console.error('Error creating headache log:', error);
    }
  }

  // Get a single headache log by ID
  const getHeadacheLog = async(id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/headaches/${id}`);
      console.log('Single headache log:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching single headache log:', error);
    }
  }

  const deleteHeadacheLog = async(id) => {
    try {
        await axios.delete(`http://localhost:8080/api/headache-entry/${id}`);
        // Refresh the list after deleting
        fetchHeadacheLogs();
    } catch (error) {
        console.error('Error deleting headache log:', error);
    }
}

  // Fetch logs when component mounts
  useEffect(() => {
    fetchHeadacheLogs();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <HeadacheLog 
              logs={headacheLogs}
              onCreateLog={createHeadacheLog}
              onGetLog={getHeadacheLog}
            />
          </>
        } />
        {/* Stats Route '/stats */}
        <Route path="/stats" element={<StatsHeader />} />

         {/* Stats Route '/entries */}
        <Route path="/entries" element={
          <EntriesPage 
            logs={headacheLogs} 
            onGetLog={getHeadacheLog}
            onDeleteLog={deleteHeadacheLog}
            />
        } />
      </Routes>
    </div>
  );
}

export default App;