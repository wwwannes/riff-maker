import { useState } from 'react';

import './App.css';

function App() {

  const $notes_e = ["F","F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#","D","D#"];
  const $notes_a = ["A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#"];
  const $notes_d = ["D#","E","F","F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#"];
  const $notes_g = ["G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#"];
  const $notes_b = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#"];
  const strings = [$notes_e,$notes_a,$notes_d,$notes_g,$notes_b,$notes_e];

  const totalFrets = 23;
  const totalStrings = 6;
  const $minRiffLength = 4;
  const $maxRiffLength = 9;
  const $maxFretDifference = 5;
  const $maxStringDifference = 3;
  const $randomRiffLength = Math.floor((Math.random() * ($maxRiffLength - $minRiffLength)) + $minRiffLength);
  const [generatedRiff, setGeneratedRiff] = useState([]);

  const generateRiff = () => {
    var tempRiff = [];

    for(var i = 0; i < $randomRiffLength; i++){
      var string;
      var fret;

      if(tempRiff.length > 0){
        const $minString = tempRiff[i-1]['string'] - $maxStringDifference < 0 ? 0 : tempRiff[i-1]['string'] - $maxStringDifference;
        const $maxString = tempRiff[i-1]['string'] + $maxStringDifference;
        const $minFret = tempRiff[i-1]['fret'] - $maxFretDifference < 1 ? 1 : tempRiff[i-1]['fret'] - $maxFretDifference;
        const $maxFret = tempRiff[i-1]['fret'] + $maxFretDifference;

        string = Math.floor(Math.random() * ($maxString - $minString) + $minString);
        fret = Math.floor(Math.random() * ($maxFret - $minFret + 1) + $minFret);
      } else {
        string = Math.floor(Math.random() * (totalStrings-1)) + 1;
        fret = Math.floor(Math.random() * (totalFrets-1));
      }

      if(fret < 1 || fret === NaN || fret === undefined){
        fret = 0;
      }
      if(fret > totalFrets){
        fret = totalFrets;
      }
      if(string < 1 || string === NaN || string === undefined){
        string = 1;
      }
      if(string > totalStrings){
        string = totalStrings;
      }

      tempRiff.push({
        string: string,
        fret: fret,
        note: strings[string][fret]
      });
    }
    setGeneratedRiff(tempRiff);
  }

  return (
    <div className="App">
      <div id='tabs'>
        {strings.reverse().map((string, index) => {
          return(
            <div className='row' key={index}>
              {generatedRiff.map( element => {
                if(element['string'] === index+1){
                  return(
                    <div className='item'>
                      <span>
                        {element['fret']}
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
                const stringFret = `${index+1}-${position}`;
                var selectedFret = false;

                if(generatedRiff.some(note => `${note['string']}-${note['fret']}` == stringFret)){
                  selectedFret = true;
                }

                return(
                  <div className={`fret f${position} ${selectedFret ? "active" : ""}`}>
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