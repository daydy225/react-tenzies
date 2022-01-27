import React, {useState, useEffect} from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import Die from './Die'
import './reset.css'
import './styles.css'

export default function App() {  
    
    const [dice, setDice] = useState(allNewDice())

    // Tenzies state correspont au moment le joueur terniner le jeu.
    const [tenzies, setTenzies] = useState(false)

    //  Regarde a chaque changement d'etat des des
useEffect(()=> {
    // Quand tous les boutons  on ete cliquer et ont la meme valeur
    const allHeld = dice.every(die => die.isheld) 
    const firstValue = dice[0].value 
    const allSameValue = dice.every(die => die.value === firstValue)
     if (allHeld && allSameValue) {
         setTenzies(true)
         
     }

},[dice])   
     
    
    function generateNewDice() {
        // Objet contenant id, value(nbr aleatoire de 1 a 6), et le changement d'etat des de(vert=true, blanc=false)
        const newDiceObj = {
            id: nanoid(),
            value: Math.ceil(Math.random() * 6),
            isheld: false
        }
      return newDiceObj
    }
  
//   console.log(allNewDice())

    function allNewDice() {
    //  creer une liste de 10 nombres aleatoire de 1 a 6
   const newDice = []
   for(let i=0; i < 10; i++) {
     newDice.push(generateNewDice())
   }
   return newDice
}

// Tous les des seront rouler sauf les des maintenu en veryt
function rollDice() {
     if(!tenzies) {
         setDice(oldDice => oldDice.map(die => {
             return die.isheld ? die : generateNewDice()
         }))
     }else {
         setTenzies(false)
         setDice(allNewDice())
     }
         
     }

 
//Les des dont les numeros seront maintenus s'afficheront en vert
function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
       return die.id === id ? {...die , isheld: !die.isheld} : die
    }))
}



     const diceElements = dice.map(die => (
     <Die 
     key={die.id}
     value={die.value}
     isheld={die.isheld}
     holdDice={()=> holdDice(die.id)} 
     />
     ))
   


    return (
        <main>
            {tenzies && <Confetti />}
            <div>
            <h1 className="tenzies--title">Tenzies</h1>
            <p className="tenzies-desc">
            Roll until all dice are the same. Click <br/>each die to freeze it at its current value between rolls.
            </p>
            </div>

            <div className="dices">
                {diceElements}
            </div>
            { 
             !tenzies ?
                <button 
                className="roll-dice"
                onClick={rollDice}
                 >
                Roll
                </button>
                :
                <button 
                className="roll-dice"
                onClick={rollDice}
                >
                <img src="./images/replay.png"  className="replay"/>
                New Game
            </button>}
        </main>
    )
}