import React, { useRef, useState } from 'react';
import "./Quiz.css";
import { data } from '../../assets/data';

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(data[index]);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);
    
    const option1 = useRef(null);
    const option2 = useRef(null);
    const option3 = useRef(null);
    const option4 = useRef(null);

    const optionRefs = [option1, option2, option3, option4];

    const checkans = (e, ans) => {
        if (!lock) {
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setScore(prevScore => prevScore + 1);
            } else {
                e.target.classList.add("wrong");
                optionRefs[question.ans - 1].current.classList.add("correct");
            }
            setLock(true);
        }
    }

    const next = () => {
        if (lock) {
            if (index + 1 === data.length) {
                setResult(true);
            } else {
                setIndex(prevIndex => prevIndex + 1);
                setQuestion(data[index + 1]);
                setLock(false);
                optionRefs.forEach(optionRef => {
                    if (optionRef.current) {
                        optionRef.current.classList.remove("wrong");
                        optionRef.current.classList.remove("correct");
                    }
                });
            }
        }
    }

    const resetQuiz = () => {
        setIndex(0);
        setQuestion(data[0]);
        setLock(false);
        setScore(0);
        setResult(false);
        optionRefs.forEach(optionRef => {
            if (optionRef.current) {
                optionRef.current.classList.remove("wrong");
                optionRef.current.classList.remove("correct");
            }
        });
    }

    return (
        <div className='container'>
            <h1>Quiz app</h1>
            <hr />
            {result ? (
                <>
                    <h2>Quiz Completed!</h2>
                    <h3>Your Score: {score} / {data.length}</h3>
                    <button onClick={resetQuiz}>Reset Quiz</button>
                </>
            ) : (
                <>
                    <h2>{index + 1}.{question.question}</h2>
                    <ul>
                        <li ref={option1} onClick={(e) => checkans(e, 1)}>{question.Option1}</li>
                        <li ref={option2} onClick={(e) => checkans(e, 2)}>{question.Option2}</li>
                        <li ref={option3} onClick={(e) => checkans(e, 3)}>{question.Option3}</li>
                        <li ref={option4} onClick={(e) => checkans(e, 4)}>{question.Option4}</li>
                    </ul>
                    <button onClick={next}>Next</button>
                    <div className='index'>{index + 1} of {data.length} questions</div>
                </>
            )}
        </div>
    );
}

export default Quiz;
