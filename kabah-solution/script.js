var isOsTurn = false;
var xMarks = [];
var oMarks = []; 
var winCombos = [[0,1,2], [3,4,5], [6,7,8],
[0,3,6], [1,4,7], [2,5,8],
[0,4,8], [2,4,6]];

window.onload = function() {
	playerTurn = document.getElementsByTagName("h2")[0];
	boxes = document.getElementsByClassName("box");
	for (var numberOfBoxes = 0; numberOfBoxes<boxes.length; numberOfBoxes++) {
	 	boxes[numberOfBoxes].addEventListener("click", placeMark);
		}
	resetButton = document.getElementById("reset");
	resetButton.addEventListener("click", clearBoard);
};

function changeHeader () {
	if (isOsTurn) {
		playerTurn.innerHTML = "It is O's turn";
		// console.log(playerTurn);
	} else {
		playerTurn.innerHTML = "It is X's turn";
		// console.log(playerTurn);
	}
};

function changePlayer () {
	isOsTurn = !isOsTurn;
};

function clearBoard () {
	for (var i = 0; i<boxes.length; i++) {
		boxes[i].innerHTML = "";
		boxes[i].style.backgroundColor = "";
	}
	for (var numberOfBoxes = 0; numberOfBoxes<boxes.length; numberOfBoxes++) {
	 	boxes[numberOfBoxes].addEventListener("click", placeMark);
		}
	playerTurn.innerHTML = "It is X's turn"
	resetButton.innerHTML = "Clear Board"
	xMarks = [];
	oMarks = [];
	isOsTurn = false;
};

function checkForWin(){
	for (var i=0; i<winCombos.length; i++) {
		var combo = winCombos[i];
		var xWins = playerWins(combo, xMarks);
		var oWins = playerWins(combo, oMarks);
		// var xWinCounter = 0;
		// var oWinCounter = 0;
		// console.log(xWins);
		// console.log(oWins);
	if (xWins) {
		playerTurn.innerHTML = "Game over! X wins!";
		resetButton.innerHTML = "Play Again";
		xWinCounter++;
		break;
	}
	if (oWins) {
		playerTurn.innerHTML = "Game over! O wins!";
		resetButton.innerHTML = "Play Again";
		oWinCounter++;
		break;
			}
		}
	if (xWins || oWins) {
		for (var numberOfBoxes = 0; numberOfBoxes<boxes.length; numberOfBoxes++) {
		 	boxes[numberOfBoxes].removeEventListener("click", placeMark);
			}
	}else {
		checkForTie();
	}
};

function allBoxesFilled() {

		 for (var numberOfBoxes = 0; numberOfBoxes<boxes.length; numberOfBoxes++) {
		 	if (boxes[numberOfBoxes].innerHTML == "") {
		 		return false;
		 	}
		 }
		 return true;
};

function checkForTie() {
	
			if (allBoxesFilled()) {
				for (var numberOfBoxes = 0; numberOfBoxes<boxes.length; numberOfBoxes++) {
				boxes[numberOfBoxes].removeEventListener("click", placeMark);
			}
				playerTurn.innerHTML = "Game over! It's a tie!";
				resetButton.innerHTML = "Play Again";
		}
};
	
function intersect(a, b) {
  a.sort(); 
  b.sort();
  var ai=0, bi=0;
  var result = [];

  while( ai < a.length && bi < b.length )
  {
     if      (a[ai] < b[bi] ){ ai++; }
     else if (a[ai] > b[bi] ){ bi++; }
     else /* they're equal */
     {
       result.push(a[ai]);
       ai++;
       bi++;
     }
  }
  return result;
};

function playerWins (combo, marks) {
	var result = intersect(combo, marks);
	var strCombo = JSON.stringify(combo);
	var strResult = JSON.stringify(result);
	return strCombo === strResult;
	// console.log(strResult);
}
function placeMark () {
	// if this.html not equal an empty string
	// then return cuz already set
	if (this.innerHTML !== "") {
		return;
	}

	if(isOsTurn){
		// playerTurn.innerHTML = "It is O's Turn";
		oMarks.push(parseInt(this.id));
		this.innerHTML = "O";
		this.style.backgroundColor = "blue";
		// console.log("oMarks: ", oMarks);
	} else {
		// playerTurn.innerHTML = "It is X's Turn";
		xMarks.push(parseInt(this.id));
		this.innerHTML = "X";
		this.style.backgroundColor = "red";
		// console.log("xMarks: ", xMarks);
	}
	changePlayer();
	changeHeader();
	checkForWin();
};

// function box1placeX () {
// 	document.getElementById("1").innerHTML = "X";
// 	document.getElementById("1").style.backgroundColor = "red";
// };




		// boxes[numberOfBoxes].addEventListener("click", changeHeader);
		// boxes[numberOfBoxes].addEventListener("click", changePlayer);
// function turnOffBox () {
// 	if (boxes.innerHTML !== null) {
// 		boxes[numberOfBoxes].removeEventListener("click", placeMark);
// 		}
// }
//X goes first. Set event to listen for click on particular box.


// console.log(boxes);	

// winning combos:
// 	if (xMarks === [0,1,2] || [3,4,5] || [6,7,8] ||
// [0,3,6] || [1,4,7] || [2,5,8] ||
// [0,4,8] || [2,4,6]) {
// 		playerTurn.innerHTML = "Game over! X wins!";
// 	}
// 	if (oMarks == [0,1,2] || [3,4,5] || [6,7,8] ||
// [0,3,6] || [1,4,7] || [2,5,8] ||
// [0,4,8] || [2,4,6]) {
// 		playerTurn.innerHTML = "Game over! O wins!";
// 	}
