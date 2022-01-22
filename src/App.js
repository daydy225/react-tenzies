import React from 'react';
import Die from './Die'
import './reset.css'
import './styles.css'

export default function App() {
    return (
        <main>
            <div>
            <h1 className="tenzies--title">Tenzies</h1>
            <p className="tenzies-desc">
            Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
            </p>
            </div>

            <div className="dices">
                <Die/>
            </div>
        </main>
    )
}