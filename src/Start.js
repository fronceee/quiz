import React from "react"

export default function Start(props) {
    return (
        <div className="start">
            <h1 className="title">Quizzical</h1>
            <h3 className="des">Test your knowledge with 5 trivia questions.</h3>
            <button onClick={props.handleClick} className="btn start-btn">Start quiz</button>
        </div>
    )
}