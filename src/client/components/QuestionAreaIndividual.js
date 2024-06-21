import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // 引入 Bootstrap 样式
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import questionText from "./QuestionText";


function QuestionAreaIndividual({question}) {
    return (
        <>
            <div
                style={{
                    width: '45vw',
                    maxHeight: '75vh',
                    overflow: 'auto',
                    color: 'black',
                    fontSize: 18
                }}
            >
                {/*<ReactMarkdown rehypePlugins={[rehypeRaw]} children={question.question}/>*/}
                <ReactMarkdown>{question.question}</ReactMarkdown>
            </div>

        </>
    );
}

export default QuestionAreaIndividual;