import React, {useContext, useEffect, useState} from 'react';
import {Navbar} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleUser} from '@fortawesome/free-solid-svg-icons';
import {getEventQuestions} from "../api/EventQuestionApi";
import {getQuestions} from "../api/QuestionApi";
import {getEventUser, getEventUsers} from "../api/EventUserApi";
import {getUsers} from "../api/UserApi";
import {getEventByid, getEvents} from "../api/EventApi";
import {signInUser} from "../api/AuthApi";
import {Redirect} from "react-router-dom";
import CountdownTimer from "./Timer";

export default function TopNavBar() {
    const storedUser = JSON.parse(localStorage.getItem('loginUser'));
    const loginUser = storedUser || null;
    const [eventUserList, setEventUserList] = useState(undefined);
    const selectedEventId = sessionStorage.getItem('selectedEventId');
    const [eventName, setEventName] = useState("");
    const [redirectToNext, setRedirectToNext] = useState(false);
    const [redirectToDash, setRedirectToDash] = useState(false);

    const getEventUserList = async () => {
        try {
            await getEventById(selectedEventId);
            const response = await getEventUser(loginUser.accessToken, selectedEventId)
            console.log(response.data)
            setEventUserList(response.data);
        } catch (error) {
            console.error('Failed to get questions:', error);
        }
    };

    const getEventById = async (id) => {
        try {
            const response = await getEventByid(loginUser.accessToken, id);
            setEventName(response.data.name)
        } catch (error) {
            console.error('Failed to get events:', error);
        }
    };

    useEffect(() => {
        if (loginUser) {
            getEventUserList()
        }
    }, []);

    const handleLogout = () => {
        try {
            localStorage.removeItem('loginUser');
            setRedirectToNext(true);
        } catch (error) {
            console.error('logout error', error);
        }
    };

    if (redirectToNext) {
        return <Redirect to="/login"/>;
    }

    const handleDashboard = () => {
        const confirmMessage = 'DO YOU FINISH YOU ANSWER ?';
        const userConfirmed = window.confirm(confirmMessage);
        if (userConfirmed) {
            setRedirectToDash(true);
        } else {

        }
    };

    if (redirectToDash) {
        return <Redirect to="/ranking"/>;
    }


    return (
        <>
            <Navbar
                style={{
                    backgroundColor: '#8AC453',
                    width: '100vw',
                    height: '80px',
                    position: 'sticky',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    top: 0,
                    zIndex: 999,
                }}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    {eventName ?
                        <div style={{
                            display: 'flex',
                            fontSize: "30px",
                            marginRight: '30px'
                        }}>
                            {eventName}
                        </div>
                        :
                        <div className="spinner-border" role="status"
                             style={{
                                 width: '3rem',
                                 height: '3rem',
                                 marginRight: '30px'
                             }}
                        />

                    }

                    <div>
                        {eventUserList ?
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <FontAwesomeIcon
                                    icon={faCircleUser}
                                    style={{
                                        color: '#FFD43B',
                                        marginRight: '30px',
                                    }}
                                    size="4x"
                                />
                                <div>
                                    <span style={{
                                        fontSize: '3em',
                                        marginRight: '30px'
                                    }}>
                                    {eventUserList.firstName || "You are not in this content"}
                                    </span>
                                </div>
                            </div> :
                            <div className="spinner-border" role="status"
                                 style={{
                                     width: '3rem',
                                     height: '3rem',
                                     marginRight: '30px'
                                 }}
                            />
                        }
                    </div>

                    <CountdownTimer/>

                    <div>
                        <button
                            style={{
                                backgroundColor: '#198754',
                                marginRight: '30px'
                            }}
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={handleDashboard}
                        >
                            Dashboard
                        </button>

                        <button
                            style={{
                                marginLeft: '2px',
                                backgroundColor: '#198754',
                                marginRight: '30px'
                            }}
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>

            </Navbar>
        </>
    )
        ;
}
