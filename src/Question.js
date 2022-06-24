import React from "react"

export default function Question(props) {
    const choicesElements = props.choices.map(choice => {
        const changeBgAnswer = () => {
            if (props.isDone) {
                if (choice.isCorrect && choice.isClicked) {
                    return "#94D7A2"
                } else if (choice.isCorrect) {
                    return "#94D7A2"
                } else if (!choice.isCorrect && choice.isClicked) {
                    return "#F8BCBC"
                }
            } else {return "none"}
        }
        const style = {
            opacity: props.isDone && !choice.isCorrect ? 0.5 : 1.0,
            backgroundColor: changeBgAnswer(),
            border: props.isDone ? choice.isCorrect ? "0.794239px solid #4D5B9E" : "none" : "0.794239px solid #4D5B9E" 
        }
        return <button
            style={style} 
            disabled={props.isDone}
            key={choice.id} 
            onClick={() => props.clickedAnswer(choice.id,props.id)} 
            className={`${choice.isClicked ? "answer-btn-checked": ""} answer-btn`}>
            {choice.choice}
        </button>
    })
    return (
        <div className="question">
                <h1>{props.question}</h1>
                <div className="answer-btns">                
                    {choicesElements}
                </div>

            </div>
    )
}