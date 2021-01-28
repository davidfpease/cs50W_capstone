const resetValues ={"T1":"blue","T2":"blue","T3":"blue",
                    "T4":"blue","T5":"blue","T6":"blue",
                    "T7":"blue","T8":"blue","T9":"blue",
                    "L1":"yellow","L2":"yellow","L3":"yellow",
                    "L4":"yellow","L5":"yellow","L6":"yellow",
                    "L7":"yellow","L8":"yellow","L9":"yellow",
                    "R1":"red","R2":"red","R3":"red","R4":"red",
                    "R5":"red","R6":"red","R7":"red","R8":"red",
                    "R9":"red","l1":"green","l2":"green","l3":"green",
                    "l4":"green","l5":"green","l6":"green","l7":"green",
                    "l8":"green","l9":"green","r1":"white","r2":"white",
                    "r3":"white","r4":"white","r5":"white","r6":"white",
                    "r7":"white","r8":"white","r9":"white","b3":"orange",
                    "b2":"orange","b1":"orange","b6":"orange",
                    "b5":"orange","b4":"orange","b9":"orange",
                    "b8":"orange","b7":"orange"};

//create localStorage item for move history
localStorage.setItem("history",'{"snapLog":['+JSON.stringify(resetValues)+']}');

//create variable to hold count of moves.  Decrement via the undo button, increment
//via physical click of any button or redo button
localStorage.setItem("moveIndex",'{"moveIndex": 0}');
localStorage.setItem("puzzleName",'');





document.addEventListener('DOMContentLoaded', function(){
  document.querySelector('#topLeftLeft').onclick = topRow;
  document.querySelector('#topLeftRight').onclick = topRow;
  document.querySelector('#middleLeftLeft').onclick = middleRow;
  document.querySelector('#middleLeftRight').onclick = middleRow;
  document.querySelector('#bottomLeftLeft').onclick = bottomRow;
  document.querySelector('#bottomLeftRight').onclick = bottomRow;
  document.querySelector('#leftLeftUp').onclick = leftLeftColumn;
  document.querySelector('#leftLeftDown').onclick = leftLeftColumn;
  document.querySelector('#leftMiddleUp').onclick = leftMiddleColumn;
  document.querySelector('#leftMiddleDown').onclick = leftMiddleColumn;
  document.querySelector('#leftRightUp').onclick = leftRightColumn;
  document.querySelector('#leftRightDown').onclick = leftRightColumn;
  document.querySelector('#rightRightUp').onclick = rightRightColumn;
  document.querySelector('#rightRightDown').onclick = rightRightColumn;
  document.querySelector('#rightLeftUp').onclick = rightLeftColumn;
  document.querySelector('#rightLeftDown').onclick = rightLeftColumn;
  document.querySelector('#rightMiddleUp').onclick = rightMiddleColumn;
  document.querySelector('#rightMiddleDown').onclick = rightMiddleColumn;
  document.querySelector('#new').onclick = function(){

    localStorage.setItem("puzzleName",'');
    localStorage.setItem("history",'{"snapLog":['+JSON.stringify(resetValues)+']}');
    localStorage.setItem("snap", JSON.stringify(resetValues));
    localStorage.setItem("moveIndex",'{"moveIndex": 0}');


    location.replace("/htmlcube");





  };
  document.querySelector('#reset').onclick = function() {
    setColors(resetValues);
    localStorage.setItem("history",'{"snapLog":['+JSON.stringify(resetValues)+']}');
    localStorage.setItem("moveIndex",'{"moveIndex": 0}');
    localStorage.setItem("snap", JSON.stringify(resetValues));
  };
  document.querySelector('#undo').onclick = function() {

    let moveIndex = JSON.parse(localStorage.getItem("moveIndex"));
    let history = JSON.parse(localStorage.getItem("history"));

    //animate the button when no more 'undos' exist
    if (moveIndex.moveIndex == 0){
      this.classList.add('warning');
      var element = this;
      setTimeout(function(){
        element.classList.remove('warning');
      }, 200);
    };

    if (moveIndex.moveIndex >=1){
      //apply square colors at snapLog[moveIndex-1]

      let colors = history['snapLog'][moveIndex.moveIndex-1];
      setColors(colors);

      //update moveIndex
      moveIndex.moveIndex = moveIndex.moveIndex -1;
      //console.log(moveIndex);
      localStorage.setItem("moveIndex", JSON.stringify(moveIndex));

    };

    //update "snap"
    let list = {};
    let captureColors = document.querySelectorAll('.square');
    for (i=0; i<captureColors.length; i++){
      list[captureColors[i].id] = captureColors[i].style.backgroundColor;
    }

    localStorage.setItem("snap", JSON.stringify(list));
  };
  document.querySelector('#redo').onclick = function() {
    //similar to undo, grab the appropriate snapshot from snapLog and reapply
    let moveIndex = JSON.parse(localStorage.getItem("moveIndex"));
    let history = JSON.parse(localStorage.getItem("history"));
    //animate the button when no more 'redos' exist
    if (moveIndex.moveIndex == history['snapLog'].length-1){
      this.classList.add('warning');
      var element = this;
      setTimeout(function(){
        element.classList.remove('warning');
      }, 200);
    };

    if (moveIndex.moveIndex < history['snapLog'].length-1){
      setColors(history['snapLog'][moveIndex.moveIndex+1]);
      //update moveIndex
      moveIndex.moveIndex = moveIndex.moveIndex +1;
      localStorage.setItem("moveIndex", JSON.stringify(moveIndex));
    }

    //update "snap"
    let list = {};
    let captureColors = document.querySelectorAll('.square');
    for (i=0; i<captureColors.length; i++){
      list[captureColors[i].id] = captureColors[i].style.backgroundColor;
    }

    localStorage.setItem("snap", JSON.stringify(list));

  };
  document.querySelector('#save').onclick = function() {
    let saveName = localStorage.getItem("puzzleName");
    let confirmation = true;

    if (saveName == ''){
      saveName = prompt("Please enter a unique name for this save.");
    } else {
      confirmation = confirm("This will overwrite the current puzzle.  Continue?");
    }

    //grab current date and time and format apprpriately
    let now = new Date();
    let month = "0"+(now.getMonth()+1);
    month = month.slice(month.length -2);
    let timestamp = JSON.parse('{"lastSave": "'+now.getFullYear()+"."+month+"."+now.getDate()+'-'+
                      now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+'"}');

    if(saveName == null || saveName == "" || confirmation == false){
      alert("Canceled the save.")
    } else {
      //build the JSON text for snap, snapLog, and moveIndex
      let moveIndex = JSON.parse(localStorage.getItem("moveIndex"));
      let history = JSON.parse(localStorage.getItem("history"));
      let snap = JSON.parse('{"snap":'+ localStorage.getItem("snap")+'}');
      let name = JSON.parse('{"saveName": "'+saveName+'"}')

      //send a request to views.save to create a new Puzzle in the database
      fetch('/htmlcube/save', {
        method: 'POST',
        body: JSON.stringify(Object.assign({},name,moveIndex,timestamp,history,snap))
      }).then(function (response){

        if (response.ok){
          document.querySelector('#savedPuzzle').innerHTML = `Puzzle saved as: ${saveName}`;
          document.querySelector('#lastSave').innerHTML = `Last save: ${timestamp['lastSave']}`;
          localStorage.setItem('puzzleName', saveName);
          localStorage.setItem('timestamp', timestamp['lastSave'])
        }
      });
    }

  }
  if (localStorage.getItem("snap")){
    setColors(JSON.parse(localStorage.getItem("snap")));
  }

//apply a color arrangement defined by colorsObj Javascript object
  function setColors(colorsObj){
    keys = Object.keys(colorsObj);
    for (i=0; i <keys.length; i++){
      document.querySelector('#'+keys[i].toString()).style.backgroundColor = colorsObj[keys[i]];
    }
  }
});

//capture current layout of squares for localStorage.  Called everytime a move is made.
function snapshot(){
  let list = {};
  let colors = document.querySelectorAll('.square');
  let history = JSON.parse(localStorage.getItem("history"));
  let moveIndex = JSON.parse(localStorage.getItem("moveIndex"));

  //before adding new snapshot to snapLog, determine if moveIndex is at end of snapLog
  if (moveIndex.moveIndex < history.snapLog.length-1){
    //start a new "branch" by removing discarded "redo's"
    history.snapLog = history.snapLog.slice(0,moveIndex.moveIndex+1);

  }

  for (i=0; i<colors.length; i++){
    list[colors[i].id] = colors[i].style.backgroundColor;
  }

  localStorage.setItem("snap", JSON.stringify(list));

  //capture move history by recording current 'snap'
  history['snapLog'].push(list);
  localStorage.setItem("history", JSON.stringify(history));

  //update moveIndex
  moveIndex.moveIndex = moveIndex.moveIndex +1;
  localStorage.setItem("moveIndex", JSON.stringify(moveIndex));

}
