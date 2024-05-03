import React, {useContext, useEffect, useState} from 'react';
import QuestionAreaIndividual from './QuestionAreaIndividual';
import Editor from './Editor';
import TopNavBar from './TopNavBar';
import {getQuestions, getQuestionsList} from "../api/QuestionApi";
import {getEventQuestions} from "../api/EventQuestionApi";
import {getEventByid} from "../api/EventApi";
import {getEventUser} from "../api/EventUserApi";
import {Button, Col, Form, FormGroup, Grid} from "react-bootstrap";
import LangSelector from "./controls/LangSelector";
import CodeEditor from "./controls/CodeEditor";
import StatusImage from "./controls/StatusImage";
import AlertDismissable from "./controls/AlertDismissable";
import OutputBox from "./controls/OutputBox";
import LoadingPage from "./LoadingPage";

function QuestionRowIndividual() {
    const storedUser = JSON.parse(localStorage.getItem('loginUser'));
    const loginUser = storedUser || null;
    const [eventQuestionList, setEventQuestionList] = useState(undefined);
    const selectedEventId = sessionStorage.getItem('selectedEventId');

    const getEventQuestionList = async () => {
        try {
            const response = await getQuestionsList(loginUser.accessToken, selectedEventId)
            setEventQuestionList(response.data);
            sessionStorage.setItem('question1', response.data[0].id)
            sessionStorage.setItem('question2', response.data[1].id)
            sessionStorage.setItem('question3', response.data[2].id)
            console.log(response.data[0].id)
        } catch (error) {
            console.error('Failed to get questions:', error);
        }
    };

    const getEventEntity = async () => {
        try {
            const response = await getEventByid(loginUser.asscessToken, selectedEventId)
            sessionStorage.setItem('eventStatus', response.data.status)
            const eventStatus = sessionStorage.getItem('eventStatus')
            const response1 = await getEventUser(loginUser.accessToken, selectedEventId)
            const eventUser = response1.data.firstName
            if (eventStatus === "O" && eventUser === loginUser.firstName) {
                console.log(eventUser);
                getEventQuestionList();
            }
        } catch (error) {
            console.error('can not find event', error);
        }
    }

    useEffect(() => {
        if (loginUser) {
            getEventEntity();
        }
    }, []);

    return (
        <>
            <TopNavBar/>
            {
                eventQuestionList ?
                    eventQuestionList.map((question, index) => (
                        <div
                            key={question.id}
                            style={{
                                display: 'flex',
                                marginBottom: '100px',
                                marginLeft: '20px'
                            }}
                        >
                            <div
                                style={{
                                    marginLeft: '20px'
                                }}
                            >
                                <QuestionAreaIndividual question={question}/>
                            </div>
                            <Editor question={question}/>
                        </div>
                    ))
                    :
                    <LoadingPage/>
            }
        </>
    );
}

export default QuestionRowIndividual;