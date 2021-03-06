import "./App.css";
import React, { useState } from "react";
import { generate } from "./utils/words";
import useKeyPress from "./hooks/useKeyPress";
import { currentTime } from "./utils/time";


var level = 0;
const initialWords = generate(level);


//keyboard functions
function getKey (e) {
  var location = e.location;
  var selector;
  if (location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
      selector = ['[data-key="' + e.keyCode + '-R"]']
  } else {
      var code = e.keyCode || e.which;
      selector = [
          '[data-key="' + code + '"]',
          '[data-char*="' + encodeURIComponent(String.fromCharCode(code)) + '"]'
      ].join(',');
  }
  return document.querySelector(selector);
}

function pressKey (char) {
  var key = document.querySelector('[data-char*="' + char.toUpperCase() + '"]');
  if (!key) {
      return console.warn('No key for', char);
  }
  key.setAttribute('data-pressed', 'on');
  setTimeout(function () {
      key.removeAttribute('data-pressed');
  }, 200);
}

document.body.addEventListener('keydown', function (e) {
  var key = getKey(e);
  if (!key) {
      return console.warn('No key for', e.keyCode);
  }

  key.setAttribute('data-pressed', 'on');
});

document.body.addEventListener('keyup', function (e) {
  var key = getKey(e);
  key && key.removeAttribute('data-pressed');
});

///////////////////////

function App() {

  const [leftPadding, setLeftPadding] = useState(new Array(20).fill(" ").join(""));

  const [outgoingChars, setOutgoingChars] = useState("");
  const [currentChar, setCurrentChar] = useState(initialWords.charAt(0));
  const [incomingChars, setIncomingChars] = useState(initialWords.substr(1));
  
  //for WPM
  const [startTime, setStartTime] = useState();
  const [wordCount, setWordCount] = useState(0);
  const [wpm, setWpm] = useState(0);

  //for accuracy
  const [accuracy, setAccuracy] = useState(0);
  const [typedChars, setTypedChars] = useState("");

  useKeyPress((key) => {
    //1
    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;

    if (!startTime) {
      //when user starts typing 1st key, start time
      setStartTime(currentTime());
    }

    //2
    if (key === currentChar) {
      if (incomingChars.charAt(0) === " ") {
        
        //4
        setWordCount(wordCount + 1);
        //5
        const durationInMinutes = (currentTime() - startTime) / 60000.0;
        //6
        setWpm(((wordCount + 1) / durationInMinutes).toFixed(2));
      }

      //3
      if (leftPadding.length > 0) {
        setLeftPadding(leftPadding.substring(1));
      }
      //4
      updatedOutgoingChars += currentChar;
      setOutgoingChars(updatedOutgoingChars);

      //5
      setCurrentChar(incomingChars.charAt(0));

      //6
      updatedIncomingChars = incomingChars.substring(1);
      if (updatedIncomingChars.split(" ").length < 10) {
        console.log("get new from: "+level);
        updatedIncomingChars += " " + generate(level);
      }
      setIncomingChars(updatedIncomingChars);
    }

    //accuracy
    const updatedTypedChars = typedChars + key;
    setTypedChars(updatedTypedChars);
    //3
    setAccuracy(
      ((updatedOutgoingChars.length * 100) / updatedTypedChars.length).toFixed(
        2
      )
    );
  });
  return (
    <div className="App">
        <h1 className="App-header">??????????????? ??????????????? ???????????????</h1>
        <sub className="quote">
        -???????????????????????? :- ??????????????????????????? ???????????????????????????
        </sub>
        <div>
          <br></br>
        <button className="level-button" onClick={() => { level = (level+1)%5; console.log(level); }}>????????? ?????????</button>
        </div>
      <h1 className="Character">
          <span className="Character-out">
            {(leftPadding + outgoingChars).slice(-20)}
          </span>
          <span className="Character-current">{currentChar}</span>
          <span>{incomingChars.substr(0, 20)}</span>
        </h1>
        
      <div class="keyboard">
  <div className="keyboard__row keyboard__row--h1">
    <div data-key="27" class="key--word">
      <span>esc</span>
    </div>
    <div data-key="112" class="key--fn">
      <span>F1</span>
    </div>
    <div data-key="113" class="key--fn">
      <span></span>
    </div>
    <div data-key="114" class="key--fn">
      <span></span>
    </div>
    <div data-key="115" class="key--fn">
      <span></span>
    </div>
    <div data-key="116" class="key--fn">
      <span></span>
    </div>
    <div data-key="117" class="key--fn">
      <span></span>
    </div>
    <div data-key="118" class="key--fn">
      <span></span>
    </div>
    <div data-key="119" class="key--fn">
      <span></span>
    </div>
    <div data-key="120" class="key--fn">
      <span></span>
    </div>
    <div data-key="121" class="key--fn">
      <span></span>
    </div>
    <div data-key="122" class="key--fn">
      <span></span>
    </div>
    <div data-key="123" class="key--fn">
      <span></span>
    </div>
    <div data-key="n/a" class="key--word">
      <span></span>
    </div>
  </div>
  <div class="keyboard__row">
    <div class="key--double" data-key="192">
      <div>?????????</div>
      <div>?????????</div>
    </div>
    <div class="key--double" data-key="49">
      <div>!</div>
      <div>1</div>
    </div>
    <div class="key--double" data-key="50">
      <div>@</div>
      <div>2</div>
    </div>
    <div class="key--double" data-key="51">
      <div>#</div>
      <div>3</div>
    </div>
    <div class="key--double" data-key="52">
      <div>$</div>
      <div>4</div>
    </div>
    <div class="key--double" data-key="53">
      <div>%</div>
      <div>5</div>
    </div>
    <div class="key--double" data-key="54">
      <div>^</div>
      <div>6</div>
    </div>
    <div class="key--double" data-key="55">
      <div>&</div>
      <div>7</div>
    </div>
    <div class="key--double" data-key="56">
      <div>*</div>
      <div>8</div>
    </div>
    <div class="key--double" data-key="57">
      <div>(</div>
      <div>9</div>
    </div>
    <div class="key--double" data-key="48">
      <div>)</div>
      <div>0</div>
    </div>
    <div class="key--double" data-key="189">
      <div>_</div>
      <div>-</div>
    </div>
    <div class="key--double" data-key="187">
      <div>+</div>
      <div>=</div>
    </div>
    <div class="key--bottom-right key--word key--w4" data-key="8">
      <span>delete</span>
    </div>
  </div>
  <div class="keyboard__row">
    <div class="key--bottom-left key--word key--w4" data-key="9">
      <span>tab</span>
    </div>
    <div class="key--double" data-char="Q">
      <div>???</div>
      <div>???</div>
    </div>
    <div class="key--double" data-char="W">
    <div>???</div>
      <div>???</div>
    </div>
    <div class="key--double" data-char="E">
    <div>???</div>
      <div>???</div>
    </div>
    <div class="key--double" data-char="R">
    <div>???</div>
      <div>???</div>
    </div>
    <div class="key--double" data-char="T">
    <div>???</div>
      <div>???</div>
    </div>
    <div class="key--double" data-char="Y">
    <div>???</div>
      <div>???</div>
    </div>
    <div class="key--double" data-char="U">
    <div>???</div>
      <div>???</div>
    </div>
    <div class="key--double" data-char="I">
    <div>???</div>
      <div>???</div>
    </div>
    <div class="key--double" data-char="O">
    <div>???</div>
      <div>???</div>
    </div>
    <div class="key--double" data-char="P">
    <div>???</div>
      <div>???</div>
    </div>
    <div class="key--double" data-key="219" data-char="{[">
      <div>???</div>
      <div>???</div>
    </div>
    <div class="key--double" data-key="221" data-char="}]">
      <div>:</div>
      <div>;</div>
    </div>
    <div class="key--double" data-key="220" data-char="|\">
      <div></div>
      <div></div>
    </div>
  </div>
  <div class="keyboard__row">
    <div class="key--bottom-left key--word key--w5" data-key="20">
      <span>???????????????????????????</span>
    </div>
    <div class="key--double" data-char="A">
      <div>???</div>
      <div>???</div>
    </div>
    <div class="key--double" data-char="S">
      <div>???</div>
      <div>???</div>
    </div>
    <div class="key--double" data-char="D">
      <div>???</div>
      <div>???</div>
    </div>
    <div class="key--double" data-char="F">???
      <div>?????????</div>
      <div>????????????</div>
    </div>
    <div class="key--double" data-char="G">
      <div>???</div>
      <div>???</div>
    </div>
    <div class="key--double" data-char="H">
      <div>?????????</div>
      <div>???</div>
    </div>
    <div class="key--double" data-char="J">
      <div>??????</div>
      <div>???</div>
    </div>
    <div class="key--double" data-char="K">
      <div>???</div>
      <div>???</div>
    </div>
    <div class="key--double" data-char="L">
      <div>???</div>
      <div>???</div>
    </div>
    <div class="key--double" data-key="186">
      <div>???</div>
      <div>???</div>
    </div>
    <div class="key--double" data-key="222">
      <div>,</div>
      <div>.</div>
    </div>
    <div class="key--bottom-right key--word key--w5" data-key="13">
      <span>???</span>
    </div>
  </div>
  <div class="keyboard__row">
    <div class="key--bottom-left key--word key--w6" data-key="16">
      <span>??????????????????????????? ??? </span>
    </div>
    <div class="key--double" data-char="Z">
      <div>"</div>
      <div>'</div>
    </div>
    <div class="key--double" data-char="X">
      <div>???</div>
      <div>???</div>
    </div>
    <div class="key--double" data-char="C">
      <div>???</div>
      <div>???</div>
    </div>
    <div class="key--double" data-char="V">
      <div>???</div>
      <div>???</div>
    </div>
    <div class="key--double" data-char="B">
      <div>???</div>
      <div>???</div>
    </div>
    <div class="key--double" data-char="N">
      <div>???</div>
      <div>???</div>
    </div>
    <div class="key--double" data-char="M">
      <div>???</div>
      <div>???</div>
    </div>
    <div class="key--double" data-key="188">
      <div>???</div>
      <div>???</div>
    </div>
    <div class="key--double" data-key="190">
      <div>???</div>
      <div>???</div>
    </div>
    <div class="key--double" data-key="191">
      <div>?</div>
      <div>/</div>
    </div>
    <div class="key--bottom-right key--word key--w6" data-key="16-R">
      <span>??? ???????????????????????????</span>
    </div>
  </div>
  <div class="keyboard__row keyboard__row--h3">
    <div class="key--bottom-left key--word">
      <span></span>
    </div>
    <div class="key--bottom-left key--word key--w1" data-key="17">
      <span></span>
    </div>
    <div class="key--bottom-left key--word key--w1" data-key="18">
      <span></span>
    </div>
    <div class="key--bottom-right key--word key--w3" data-key="91">
      <span></span>
    </div>
    <div class="key--double key--right key--space" data-key="32" data-char=" ">
      &nbsp;
    </div>
    <div class="key--bottom-left key--word key--w3" data-key="18-R">
      <span>???????????????</span>
    </div>
    <div class="key--bottom-left key--word key--w1" data-key="93-R">
      <span></span>
    </div>
    <div data-key="37" class="key--arrow">
      <span>&#9664;</span>
    </div>
    <div class="key--double key--arrow--tall" data-key="38">
      <div>&#9650;</div>
      <div>&#9660;</div>
    </div>
    <div data-key="39" class="key--arrow">
      <span>&#9654;</span>
    </div>
  </div>
  <div>
        <h3>
          ?????????????????????????????? ?????????: {wpm} | ?????????????????????????????????: {accuracy}%
        </h3>
  </div>
</div>
    </div>
  );
}

export default App;
