import axios from "axios";

export const addEventGroupUserQuestionHandle = async (accessToken, questionData)=> {
    try {
        const response = await axios.post(
            `http://localhost:8081/api/groupuserquestionhandle/add`,
            questionData,
            {headers: {Authorization: `Bearer ${accessToken}`}}
        );
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getEventGroupUserQuestionHandle = async (accessToken)=> {
    try {
        const response = await axios.get(
            `http://localhost:8081/api/groupuserquestionhandles`,

            {headers: {Authorization: `Bearer ${accessToken}`}}
        );
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};