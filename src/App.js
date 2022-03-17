import {useEffect, useState} from 'react';

import './App.css';

function App() {

  const totalFrets = 23;
  const totalStrings = 6;

  var $notes_e = ["F","F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#","D","D#"];
  var $notes_a = ["A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#"];
  var $notes_d = ["D#","E","F","F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#"];
  var $notes_g = ["G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#"];
  var $notes_b = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#"];
  var strings = [$notes_e,$notes_a,$notes_d,$notes_g,$notes_b,$notes_e];

  const $minRiffLength = 4;
  const $maxRiffLength = 9;
  const $randomRiffLength = Math.floor((Math.random() * ($maxRiffLength - $minRiffLength)) + $minRiffLength);
  const [riffPosition, setRiffPosition] = useState([]);
  const [riffArray, setRiffArray] = useState([]);
  const [chosenFretPosition, setChosenFretPosition] = useState([]);

  const generateRiff = () => {
    var defaultRiffPositions = [];
    var defaultRiffArray = [];
    for(var i = 0; i < $randomRiffLength; i++){
      var string = Math.floor(Math.random() * (totalStrings-1)) + 1;
      var fret = Math.floor(Math.random() * (totalFrets-1)) + 1;

      if(fret > 1 || fret === NaN || fret === undefined){
        fret = 0;
      }

      /* Make sure random frets are closer together */
      if(string > 1 && fret >= 7){
        if(strings[string-1][fret-7] == strings[string][fret]){
          if(string > 1){
            string = string - 1;
          } else {
            string = 0;
          }
          if(fret >= 7){
            fret = fret - 7;
          } else {
            fret = 0;
          }
        }
      }

      defaultRiffPositions.push([string, fret]);
      defaultRiffArray.push(fret+strings[string-1][fret-1]);
    }
    setRiffPosition(defaultRiffPositions);
    setRiffArray(defaultRiffArray);

    console.log(defaultRiffPositions);
    console.log(defaultRiffArray);
    console.log(chosenFretPosition);
  }

  return (
    <div className="App">
      <div id='tabs'>
        {strings.reverse().map((string, index) => {
          return(
            <div className='row'>
              {riffPosition.map( element => {
                if(element[0] == index+1){
                  return(
                    <div className='item'>
                      <span>
                        {element[1]}
                      </span>
                      <br/>
                    </div>
                  )
                } else {
                  return(
                    <div className='item'>
                      <span>-</span>
                    </div>
                  )
                }
              })}
            </div>
          )
        })}
      </div>
      <div id='neck'>
        {strings.reverse().map((string, index) => {
          return(
            <div className='string'>
              {string.map((fret, key) => {
                const position = key + 1;
                var selectedFret = false;
                if(riffArray.includes(position+fret)){
                  selectedFret = true;
                } else {
                  selectedFret = false;
                }
                return(
                  <div className={`fret f${position} ${position+fret} ${selectedFret ? "active" : ""}`}>
                    <sup>{fret}</sup>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      <button onClick={() => generateRiff()}>Generate Riff</button>
    </div>
  );
}

export default App;