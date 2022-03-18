import { useState } from 'react';

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
  const [generatedRiff, setGeneratedRiff] = useState([]);

  const generateRiff = () => {
    var tempRiff = [];

    for(var i = 0; i < $randomRiffLength; i++){
      const maxFret = Math.max.apply(null, tempRiff.map(object => {
        return object.fret;
      }));

      console.log(maxFret);

      var string = Math.floor(Math.random() * (totalStrings-1)) + 1;
      var fret = Math.floor(Math.random() * (totalFrets-1)) + 1;

      if(fret < 1 || fret === NaN || fret === undefined){
        fret = 0;
      }

      /* Make sure random frets are closer together */
      if(string > 1 && fret >= 7){
        if(strings[string-1][fret-7] === strings[string][fret]){
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