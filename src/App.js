import { useEffect, useState } from 'react';

import * as Tone from 'tone';

import './App.css';

function App() {

  const $notes_e = ["F2","F#2","G2","G#2","A2","A#2","B2","C3","C#3","D3","D#3","E3","F3","F#3","G3","G#3","A3","A#3","B3","C4","C#4","D4","D#4","E4"];
  const $notes_a = ["A#2","B2","C3","C#3","D3","D#3","E3","F3","F#3","G3","G#3","A3","A#3","B3","C4","C#4","D4","D#4","E4","F4","F#4","G4","G#4","A4"];
  const $notes_d = ["D#3","E3","F3","F#3","G3","G#3","A3","A#3","B3","C4","C#4","D4","D#4","E4","F4","F#4","G4","G#4","A4","A#4","B4","C5","C#5","D5"];
  const $notes_g = ["G#3","A3","A#3","B3","C4","C#4","D4","D#4","E4","F4","F#4","G4","G#4","A4","A#4","B4","C5","C#5","D5","D#5","E5","F5","F#5","G5"];
  const $notes_b = ["C4","C#4","D4","D#4","E4","F4","F#4","G4","G#4","A4","A#4","B4","C5","C#5","D5","D#5","E5","F5","F#5","G5","G#5","A5","A#5","B5"];
  const $notes_e_2 = ["F4","F#4","G4","G#4","A4","A#4","B4","C5","C#5","D5","D#5","E5","F5","F#5","G5","G#5","A5","A#5","B5","C6","C#6","D6","D#6","E6"];
  const strings = [$notes_e_2,$notes_b,$notes_g,$notes_d,$notes_a,$notes_e];

  const totalFrets = 23;
  const totalStrings = 5;
  const $minRiffLength = 4;
  const $maxRiffLength = 9;
  const $maxFretDifference = 5;
  const $maxStringDifference = 3;

  const $randomRiffLength = Math.floor((Math.random() * ($maxRiffLength - $minRiffLength)) + $minRiffLength);
  const [generatedRiff, setGeneratedRiff] = useState([]);

  useEffect(() => {
    playRiff();
  }, [generatedRiff])

  const playRiff = () => {
    var latestTempoPauze = 0.5;
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const now = Tone.now();
    
    for(var i = 0; i < generatedRiff.length; i++){
      latestTempoPauze = latestTempoPauze + .5;
      synth.triggerAttackRelease(generatedRiff[i]["note"],"4n", now + latestTempoPauze);
    }
  }

  const generateRiff = () => {
    var tempRiff = [];
    var tempTempoNotes = [];

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
        string = Math.floor(Math.random() * (totalStrings-1));
        fret = Math.floor(Math.random() * (totalFrets-1));
      }

      if(fret < 1 || isNaN(fret) || fret === undefined){
        fret = 0;
      }
      if(fret > totalFrets){
        fret = totalFrets;
      }
      if(string < 1 || isNaN(string) || string === undefined){
        string = 1;
      }
      if(string > totalStrings){
        string = totalStrings;
      }

      tempTempoNotes.push(strings[string][fret]);

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

                if(generatedRiff.some(note => `${note['string']}-${note['fret']}` === stringFret)){
                  selectedFret = true;
                  //selectedTotalFrets ++;
                }

                return(
                  <div 
                    className={`fret f${position} ${selectedFret ? "active" : ""}`}
                    /*style={{ backgroundColor: selectedFret ? `rgba(23, 142, 88, ${(selectedTotalFrets *  (100/$randomRiffLength))/100})` : ''}}*/
                  >
                    <sup>{fret}</sup>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      <button onClick={() => generateRiff()}>Generate Riff</button>
      <button onClick={() => playRiff()}>Replay Riff</button>
    </div>
  );
}

export default App;