import React from "react"
import Start from "./Start"
import Questions from "./Questions"


export default function App() {
    const [isStart, setIsStart] = React.useState(false)
    
    
    function handleStart() {
        setIsStart(prev => !prev)
    }

    
    return (
        <main>
            {
                isStart ?
                <div className="question-bg" >
                    <Questions handleClick={handleStart}/>
                </div> 
                : 
                <div className="start-bg" >
                    <Start handleClick={handleStart}/>
                </div>
            }
           
        </main>
    )
}