import React, { useState } from 'react';
import { API_URL } from '../config';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

import temples from '../assets/Temples.png';
import forehead from '../assets/Forehead.png';
import leftEye from '../assets/Left_eye.png';
import rightEye from '../assets/Right_eye.png';
import backhead from '../assets/Back_head.png';
import neck from '../assets/Neck.png';
import shoulders from '../assets/Shoulder.png';

//{onCreateLog} is a prop that is passed to the HeadacheLog component
const HeadacheLog = ({onCreateLog}) => {
    //const[initial state, function to update state] = useState(default value)
    //formData is the form's state stored in an object stored using useState
    const [formData, setFormData] = useState({
        //Default values for the form fields
        startDate: '',
        duration: 0,
        painStartLocation: [],
        painRadiation: [],
        painIntensity: 0,
        period: false,
        symptoms: [],
        triggers: [],
        medications: [],
        medicationEffectiveness: 0
    });

    /*
    ##### UI RENDERING #####
    */

    //const painLocations = ['Temples', 'Forehead', 'Back of head', 'All over'];
    // Predefined locations for the pain
    const painLocations = [
        {name: 'Temples', img: temples},
        {name: 'Forehead', img: forehead},
        {name: 'Left Eye', img: leftEye},
        {name: 'Right Eye', img: rightEye},
        {name: 'Back of head', img: backhead},
        {name: 'Neck', img: neck},
        {name: 'Shoulders', img: shoulders}
    ];

    // Predefined locations for the radiation of pain
    const radiationLocations = [
        {name: 'Temples', img: temples},
        {name: 'Forehead', img: forehead},
        {name: 'Left Eye', img: leftEye},
        {name: 'Right Eye', img: rightEye},
        {name: 'Back of head', img: backhead},
        {name: 'Neck', img: neck},
        {name: 'Shoulders', img: shoulders}
    ];


    /*
    ##### EVENT HANDLERS #####
    */


    const symptomsList = ['Nausea', 'Vomiting', 'Sensitivity to light', 'Sensitivity to sound', 'Anxiety', 'Increased in blood pressure', 'Visual disturbances', 'Fatigue', 'Mood changes', 'Increased hunger or thirst', 'Dizziness', 'Nasal congestion', 'Neck pain', 'Scalp tenderness', 'Sweating', 'Aura', 'Other'];
    const triggersList = ['Caffeine', 'Lack of sleep', 'Dehydration', 'Stress', 'Bright Lights', 'Loud Noises', 'Pharmaceutical drug', 'Alcohol', 'Skipped Meals', 'Cheese', 'Odours', 'Weather Changes', 'Strenuous physical activity', 'Smoking', 'Other'];


    const medicationsList = [
        { value: 'ibuprofen 200mg', label: 'Ibuprofen 200mg' },
        { value: 'ibuprofen 400mg', label: 'Ibuprofen 400mg' },
        { value: 'paracetamol 500mg', label: 'Paracetamol 500mg' },
        { value: 'paracetamol 1g', label: 'Paracetamol 1g' },
        { value: 'paracetamol 500mg/codeine 15mg', label: 'Paracetamol + Codeine (500mg/15mg)'},
        { value: 'paracetamol 500mg/codeine 30mg', label: 'Paracetamol + Codeine (500mg/30mg)'},
        { value: 'aspirin 300mg', label: 'Aspirin 300mg' },
        { value: 'aspirin 600mg', label: 'Aspirin 600mg' },
        { value: 'aspirin 900mg', label: 'Aspirin 900mg' },
        { value: 'naproxen 250mg', label: 'Naproxen 250mg' },
        { value: 'naproxen 500mg', label: 'Naproxen 500mg' },
        { value: 'naproxen 750mg', label: 'Naproxen 750mg' },
        { value: 'sumatriptan 50mg', label: 'Sumatriptan 50mg' },
        { value: 'sumatriptan 50mg', label: 'Sumatriptan 100mg' },
        { value: 'rizatriptan 10mg', label: 'Rizatriptan ODT 10mg' },
        { value: 'naratriptan 2.5mg', label: 'Naratriptan 2.5mg' },
        { value: 'eletriptan 40mg', label: 'Eletriptan 40mg' },
        
    ];

    const [medications, setMedications] = useState("");

    // Function to handle the change event for the medications dropdown
    const handleMedicationsChange = (newValue) => {
        setMedications(newValue);
        setFormData(prev => ({
            ...prev,
            // If newValue is not null, map array of selected options to an array of values
            medications: newValue ? newValue.map(option => option.value) : []
        }));
    };

    // Yes/No for Period dropdown selection
    const options = [
        {value: "yes", label: "Yes"},
        {value: "no", label: "No"}
    ];
    

    // async is used to write functions that handle asynchronous operations like HTTP requests
    // without blocking the main thread/rest of the code
    // async - tasks that take time to complete
    // async is paired with await to manage how Javascript waits for the completion of the tasks
    const handleSubmit = async (e) => { // triggered when the form is submitted
        e.preventDefault(); // prevents the default action of the form
        try {
            console.log('Submitting data:', formData); // Debugging
            
             // Convert data to match backend expectations
            const submissionData = {
                ...formData,
                startDate: new Date(formData.startDate).toISOString()
            };
            console.log('Submitting data:', submissionData); // Debug log
            
            // fetch - used to make HTTP requests (submitting the form data to the server)
            // Use the onCreateLog prop instead of fetch
            await onCreateLog(submissionData); // Call the onCreateLog function with the form data
            //await onCreateLog(formData); // Call the onCreateLog function with the form data
            
            // If successful
            alert('Headache log saved successfully!');
            // Reset form
            /*
            setFormData({
                startDate: '',
                duration: 0,
                painStartLocation: [],
                painRadiation: [],
                painIntensity: 0,
                period: false,
                symptoms: [],
                triggers: [],
                medications: []
            });
            setMedications([]); // Reset medications
            */

        } catch (error) {
            console.error('Error saving headache log:', error);
            alert(error.message);
        }
    };


    // Function is called to handle when user clicks on one of the pain locations
    // using image buttons. (e.g. Temples/Forehead)
     const handlePainLocationClick2 = (locationName) => {
        //locationName is the name of pain location that the user clicked on
        setFormData((prev) => ({
            // Checks if locationName is already in the painStartLocation array
            ...prev,
            // painStartLocation: is the key in the formData object being returned
            // prev.painStartLocation.includes(locationName) checks if the 
            // locationName is already in the array.
            // If true, need to remove it. If false, need to add it.
            painStartLocation: prev.painStartLocation.includes(locationName)
            // array.filter((element, index, array) item repr each 'element'
            // in prev.painStartLocation array
            ? prev.painStartLocation.filter((item) => item !== locationName)
            : [...prev.painStartLocation, locationName]
            }));
    };

    const handleRadiationLocationClick = (locationName) => {
        setFormData((prev) => ({
            ...prev, // copies all key-value pairs from the previous state
            painRadiation: prev.painRadiation.includes(locationName)
            ? prev.painRadiation.filter((item) => item !== locationName)
            : [...prev.painRadiation, locationName] 
        }));
    };

    // Function to handle the checkbox change event for symptoms and triggers
    // Type is either 'symptoms' or 'triggers'
    // Value is the symptom or trigger that the user is selecting/deselecting

    const handleCheckboxClick = (type, value, isChecked) => {
        setFormData(prev => { //prev is the previous state of the form data
            let updatedArray = [...prev[type]]; //creates a copy of the array of Sx or triggers
            if (isChecked){
                // If box is checked, add the value to the array
                // .push means add to the end of the array
                updatedArray.push(value); 
            } else {
                // If box is unchecked, remove the value from the array
                // .filter removes the value from the array
                updatedArray = updatedArray.filter(item => item !==value); 
            }
            return {
                ...prev, //retains existing values in the formData state/object.
                [type]: updatedArray //[type] is either symptoms or triggers
            };
        });
    }

 

    return (
        <form className="headache-log" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>When did your headache start?</label>
                <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({
                        ...prev,
                        startDate: e.target.value //updates the startDate value to the date selected
                    }))}
                    required //makes the field mandatory
                />
            </div>

            <div className="form-group">
                <label>How long did it last?</label>
                <div className="slider-container">
                    <input
                        type="range"
                        min="0"
                        max="720"
                        value={formData.duration}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            duration: parseInt(e.target.value)
                        }))}
                    />
                    <div className="slider-labels">
                        <span>0 mins</span>
                        <span>{formData.duration} mins</span>
                        <span>&gt; 12 hrs</span> 
                    </div>
                </div>
            </div>
            
            <div className="form-group">
                <label>Pain starting location:</label>
                <div className="location-grid">
                    {painLocations.map((location) => (
                        <div
                            key={location.name}
                            className={`location-item ${formData.painStartLocation.includes(location.name) ? 'selected' : ''}`}
                            onClick={() => handlePainLocationClick2(location.name)}
                            style={{
                                cursor: 'pointer',
                                border: formData.painStartLocation.includes(location.name) ? '2px solid #000' : 'none',
                                borderRadius: '50%',
                                padding: '5px'
                            }}
                        >
                            <img src={location.img} alt={location.name} className="location-image" />
                            <div>{location.name}</div>
                        </div>
                    ))}
                </div>
            </div>


            <div className="form-group">
                <label>Where else did the pain radiate to?</label>
                <div className="location-grid">
                    {painLocations.map((location) => (
                        <div
                            key={location.name + '-radiation'}
                            className={`location-item ${formData.painRadiation.includes(location.name) ? 'selected' : ''}`}
                            onClick={() => handleRadiationLocationClick(location.name)}
                            style={{
                                cursor: 'pointer',
                                border: formData.painRadiation.includes(location.name) ? '2px solid #000' : 'none',
                                borderRadius: '50%',
                                padding: '5px'
                            }}
                        >
                            <img src={location.img} alt={location.name} className="location-image" />
                            <div>{location.name}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label>Pain Intensity:</label>
                <div className="slider-container">
                    <input
                        type="range"
                        min="0"
                        max="10"
                        value={formData.painIntensity}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            painIntensity: parseInt(e.target.value)
                        }))}
                    />
                    <div className="slider-labels">
                        <span>0</span>
                        <span>{formData.painIntensity}</span>
                        <span>10</span>
                    </div>
                </div>
            </div>
            

            <div className = "form-group">
                <label>Are you currently on your period?</label>
                <Select 
                    options = {options}
                    value = {options.find(option => option.value === (formData.period ? 'yes' : 'no'))}
                    onChange = {(selectedOption) => {
                        setFormData(prev => ({
                            ...prev,
                            period: selectedOption.value === 'yes'
                        }));
                    }}
                /> 
            </div>

            <div className="form-group">
                <label>What symptoms did you experience?</label>
                <div className="checkbox-grid">
                    {symptomsList.map(symptom => (
                        <label key={symptom} className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={formData.symptoms.includes(symptom)}
                                onChange={(e) => handleCheckboxClick('symptoms', symptom, e.target.checked)}
                            />
                            {symptom}
                        </label>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label>Triggers?</label>
                <div className="checkbox-grid">
                    {triggersList.map(trigger => (
                        <label key={trigger} className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={formData.triggers.includes(trigger)}
                                onChange={(e) => handleCheckboxClick('triggers', trigger, e.target.checked)}  
                            />
                            {trigger}
                        </label>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label>Medications Taken: </label>
                <CreatableSelect
                    isMulti
                    options = {medicationsList}
                    value = {medications}
                    onChange = {handleMedicationsChange}
                    placeholder = "Select or type to add medications..."
                />
            </div>

            <div className="form-group">
                <label>How effective were the medications on a scale of 1 to 10?</label>
                <label style = {
                    {display: "block", 
                    fontSize: "0.7em", 
                    fontFamily: "Garamond",
                    fontStyle: "italic",
                    marginTop: '4px'}
                }>(1 being not effective at all and 10 being very effective)</label>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={formData.medicationEffectiveness}
                    onChange={(e) => setFormData(prev => ({
                        ...prev,
                        medicationEffectiveness: parseInt(e.target.value)
                    }))}   
                />
                <div className="slider-labels">
                    <span>0</span>
                    <span>{formData.medicationEffectiveness}</span>
                    <span>10</span>
                    </div>
            </div>
            {/* The type = "submit" tells the browser this button submits the form 
                and triggers the onSubmit event on the form. 
                React sees onSubmit = {handleSubmit} and calls the handleSubmit function
            */}
            <button type="submit" className="submit-button">Log Headache</button>
        </form>
    );
}

export default HeadacheLog;
