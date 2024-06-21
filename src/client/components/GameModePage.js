import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faUsers} from '@fortawesome/free-solid-svg-icons';
import {getGroupUsers} from "../api/GroupUserApi";
import {getQuestions} from "../api/QuestionApi";
import {getEvents} from "../api/EventApi";

const GameModePage = () => {
    const storedUser = JSON.parse(localStorage.getItem('loginUser'));
    const loginUser = storedUser || null;

    const [selection, setSelection] = useState(null);
    const [eventList, setEventList] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');


    const handleSelection = (value) => {
        setSelection(value);
    };

    const handleConfirmButton = () => {
        // Set the selected event ID in the session storage
        sessionStorage.setItem('selectedEventId', selectedEvent);

        // Redirect to the appropriate page based on the selection
        if (selection === 'team') {
            window.location.href = '/team';
        } else {
            window.location.href = '/contest';
        }
    };


    const getEventList = async () => {
        try {
            const response = await getEvents(loginUser.accessToken);
            setEventList(response.data);
        } catch (error) {
            console.error('Failed to get events:', error);
        }
    };

    useEffect(() => {
        getEventList()

        const intervalId = setInterval(() => {
            getEventList()
        }, 5000);

        // 在组件卸载时清除定时器，防止内存泄漏
        return () => clearInterval(intervalId);
    }, []);


    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '100vw',
                height: '100vh',
                backgroundColor: '#F1FEC9'
            }}
        >

            <h1 style={{marginTop: '10px'}}>Event</h1>

            <div style={{width: '200px'}}>
                <select style={{height: '50px', fontSize: '20px'}}
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setSelectedEvent(e.target.value)}
                    value={selectedEvent}
                >
                    <option value="" disabled>Select an event</option>
                    {eventList.map((event) => {
                        if (event.status === "O") {
                            return (
                                <option key={event.id} value={event.id}>
                                    {event.name}
                                </option>
                            );
                        }
                        return null; // or you can omit this line to skip rendering the option
                    })}
                </select>
            </div>


            <h1 style={{marginTop: '10px'}}>Mode</h1>

            <div style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <FontAwesomeIcon icon={faUsers}
                                 style={{
                                     width: '20vw',
                                     height: '30vh',
                                     display: 'flex',
                                     justifyContent: 'center',
                                     alignItems: 'center',
                                     margin: '50px',
                                 }}
                                 onClick={() => handleSelection('team')}
                >
                    <h4>Team</h4>
                </FontAwesomeIcon>

                <FontAwesomeIcon icon={faUser}
                                 style={{
                                     width: '20vw',
                                     height: '30vh',
                                     display: 'flex',
                                     justifyContent: 'center',
                                     alignItems: 'center',
                                     margin: '50px',
                                 }}
                                 onClick={() => handleSelection('individual')}
                >
                    <h4>Individual</h4>
                </FontAwesomeIcon>
            </div>


            <div>
                <h1>You choose {selection === 'team' ? 'Team' : 'Individual'}</h1>
            </div>
            {(
                <button
                    style={{
                        margin: '30px',
                        width: '200px',
                        height: '50px',
                        fontSize: 14,
                        backgroundColor: '#198754'
                    }}
                    type="button" className="btn btn-primary"
                    onClick={handleConfirmButton}
                >
                    Confirm
                </button>
            )}


        </div>
    );
};


export default GameModePage;