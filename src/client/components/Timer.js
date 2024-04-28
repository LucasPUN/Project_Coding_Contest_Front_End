import React, { useState, useEffect } from 'react';
import {getEventByid, putEventById} from "../api/EventApi";

const CountdownTimer = () => {
    const storedUser = JSON.parse(localStorage.getItem('loginUser'));
    const loginUser = storedUser || null;
    const selectedEventId = sessionStorage.getItem('selectedEventId');

    const [eventEndTime, setEventEndTime] = useState();
    const [time, setTime] = useState({ hours: 1, minutes: 0, seconds: 0 });

    const calculateTimeRemaining = (endTime) => {
        const now = new Date();
        const endTimeObj = new Date(endTime);
        const timeDifference = endTimeObj - now;

        if (timeDifference <= 0) {
            reset();
            return { hours: 0, minutes: 0, seconds: 0 };
        }

        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        return { hours, minutes, seconds };
    };

    const tick = () => {
        setTime(prevTime => {
            if (prevTime.hours === 0 && prevTime.minutes === 0 && prevTime.seconds === 0) {
                reset();
                return { hours: 0, minutes: 0, seconds: 0 };
            } else if (prevTime.minutes === 0 && prevTime.seconds === 0) {
                return {
                    hours: prevTime.hours - 1,
                    minutes: 59,
                    seconds: 59,
                };
            } else if (prevTime.seconds === 0) {
                return {
                    hours: prevTime.hours,
                    minutes: prevTime.minutes - 1,
                    seconds: 59,
                };
            } else {
                return {
                    hours: prevTime.hours,
                    minutes: prevTime.minutes,
                    seconds: prevTime.seconds - 1,
                };
            }
        });
    };

    const reset = () => {
        setTime({ hours: 0, minutes: 0, seconds: 0 });
        sessionStorage.setItem('eventStatus', 'Close');
        putEventById(loginUser.accessToken,selectedEventId, "Close" )
    };

    const getEventById = async (id) => {
        try {
            const response = await getEventByid(loginUser.accessToken, id);
            setEventEndTime(response.data.targetEndTime);
        } catch (error) {
            console.error('Failed to get events:', error);
        }
    };

    useEffect(() => {
        getEventById(selectedEventId)
        if (eventEndTime) {
            setTime(calculateTimeRemaining(eventEndTime));
        }
        const interval = setInterval(() => {
            tick();
        }, 1000);

        return () => clearInterval(interval);
    }, [eventEndTime]);

    return (
        <div>
            <div style={{
                fontSize: '20px',
                marginRight: '10px'
            }}>
                <span>Countdown :</span>
                <span>{String(time.hours).padStart(2, '0')}:</span>
                <span>{String(time.minutes).padStart(2, '0')}:</span>
                <span>{String(time.seconds).padStart(2, '0')}</span>
            </div>
        </div>
    );
};

export default CountdownTimer;