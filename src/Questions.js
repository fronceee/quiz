import {nanoid} from 'nanoid'
import he from "he"
import React from 'react'
import Question from './Question'


export default function Questions(props) {
    const [allQuestions, setAllQuestions] = React.useState([])
    const [isChecked, setIsChecked] = React.useState(false)
    const [checkedAllAnswers, setCheckedAllAnswers] = React.useState([])
    const arrValid = allQuestions.length > 0
    const [correctNumber, setCorrectNumber] = React.useState(0)

    React.useEffect(() => {

        const retreiveData = async () => {
            const res = await fetch("https://opentdb.com/api.php?amount=5")
            const data = await res.json()
            const recievedData = data.results
            const questionsObj = recievedData.map(q => {
                const randomNum = Math.floor(Math.random() * (recievedData.length - 1))
                const choice = q.incorrect_answers
                choice.splice(randomNum,0,q.correct_answer)
                const randomChoices = choice.map(answer => {
                    return {
                        choice:he.decode(answer),
                        id:nanoid(),
                        isClicked: false,
                        isCorrect: q.correct_answer === he.decode(answer) ? true : false
                    }
                })
            return {
                    id:nanoid(),
                    question: he.decode(q.question),
                    choices:randomChoices,
                    correct_answer: he.decode(q.correct_answer),
                }
            })
            setAllQuestions(questionsObj)
        }
        try {
            retreiveData()
        }
        catch(err) {
            console.log(err)
        }
    },[])

    React.useEffect(() => {
        function tocheckedAllAnswers() {
            const newArr = allQuestions.map(q => {
                return {
                    id:q.id,
                    question: q.question,
                    correct_answer: q.correct_answer,
                    currentAnswer: ""
                }
            })
            return newArr
        }
        setCheckedAllAnswers(tocheckedAllAnswers())
    },[arrValid])

    function clickedAnswer(id,questionId) {
        setAllQuestions(prevArr => {
            const newArr = prevArr.map(question => {
                question.choices.map(answer => {
                    if(answer.id === id) {
                        answer.isClicked = !answer.isClicked
                        updateCurrentChoices(answer.choice, questionId)
                    }
                    return answer
                })
                return question
            })
            return newArr
        })
    }
    
    function updateCurrentChoices(choice, questionId) {
        setCheckedAllAnswers(prev => {
            return prev.map( q => {
                    if (q.id === questionId) {
                        q.currentAnswer = choice
                    } return q
            })
        })
    }

    const questionEl = allQuestions.map(q => {
        return <Question 
                    key={q.id}
                    id={q.id}
                    question={q.question}
                    choices={q.choices}
                    clickedAnswer={clickedAnswer}
                    isDone={isChecked}/>
    })


    React.useEffect(() => {
        function calculateAnswers() {
            checkedAllAnswers.forEach(a => {
                if (a.currentAnswer === a.correct_answer){
                    setCorrectNumber(prev => prev += 1)
                }
            })
        }
        calculateAnswers()
    },[isChecked])

    function checkAllAnswers() {
        setIsChecked(true)
    }

    function getNewQuestions() {
        window.location.reload()

    }

    return (
        <div className="questions">
            {questionEl}
            <div className="result">
            {isChecked && <h1 className="result">You scored {correctNumber}/5 correct answers</h1>}
            <button className='btn check-answer-btn' onClick={isChecked ? getNewQuestions : checkAllAnswers}>{isChecked ? "Play Agian": "Check Answer"}</button>
            </div>
        </div>
    )
}