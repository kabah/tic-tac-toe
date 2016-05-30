window.onload = function() {
	new Game().start();
};

function Game() {
	this.playerTurn = document.getElementsByTagName("h2")[0];
	this.boxes = document.getElementsByClassName("box");
	this.resetButton = document.getElementById("reset");
	this.xMarks = [];
	this.oMarks = [];
	this.isOsTurn = false;
	this.winCombos = [[0,1,2], [3,4,5], [6,7,8],
										[0,3,6], [1,4,7], [2,5,8],
										[0,4,8], [2,4,6]]; 
};

Game.prototype.start = function() {
	this.addPlaceMarkListener();
	this.addResetListener();
};

Game.prototype.addPlaceMarkListener = function() {
	for (var numberOfBoxes = 0; numberOfBoxes<this.boxes.length; numberOfBoxes++) {
	 	this.boxes[numberOfBoxes].addEventListener("click", this.placeMark);
		}
	};

Game.prototype.addResetListener = function() {
	this.resetButton.addEventListener("click", this.clearBoard);
};

Game.prototype.clearBoard = function () {
for (var i = 0; i<this.boxes.length; i++) {
		this.boxes[i].innerHTML = "";
		this.boxes[i].style.backgroundColor = "";
	}
	for (var numberOfBoxes = 0; numberOfBoxes<this.boxes.length; numberOfBoxes++) {
	 	this.boxes[numberOfBoxes].addEventListener("click", this.placeMark);
		}
	this.playerTurn.innerHTML = "It is X's turn"
	this.resetButton.innerHTML = "Clear Board"
	this.xMarks = [];
	this.oMarks = [];
	this.isOsTurn = false;
};

Game.prototype.placeMark = function () {
	if (event.target.innerHTML !== "") {
		return;
	};

	if(this.isOsTurn){
		// playerTurn.innerHTML = "It is O's Turn";
		this.oMarks.push(parseInt(event.target.getAttribute("id")));
		event.target.innerHTML = "O";
		event.target.style.backgroundColor = "blue";
		// console.log("oMarks: ", oMarks);
	} else {
		// playerTurn.innerHTML = "It is X's Turn";
		this.xMarks.push(parseInt(event.target.getAttribute("id")));
		event.target.innerHTML = "X";
		event.target.style.backgroundColor = "red";
		// console.log("xMarks: ", xMarks);
	}
	console.log(this);
	this.changePlayer();
	this.changeHeader();
	this.checkForWin();
};

Game.prototype.changePlayer = function() {
this.isOsTurn = !this.isOsTurn;
};

Game.prototype.changeHeader = function() {
	if (this.isOsTurn) {
		this.playerTurn.innerHTML = "It is O's turn";
		// console.log(playerTurn);
	} else {
		this.playerTurn.innerHTML = "It is X's turn";
		// console.log(playerTurn);
	}
};

Game.prototype.intersect = function(a, b) {
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

Game.prototype.playerWins = function(combo, marks) {
	this.result = intersect(combo, marks);
	this.strCombo = JSON.stringify(combo);
	this.strResult = JSON.stringify(result);
	return this.strCombo === this.strResult;
};

Game.prototype.checkForWin = function() {
	for (var i=0; i<this.winCombos.length; i++) {
		this.combo = this.winCombos[i];
		this.xWins = this.playerWins(combo, xMarks);
		this.oWins = playerWins(combo, oMarks);
	if (this.xWins) {
		this.playerTurn.innerHTML = "Game over! X wins!";
		this.resetButton.innerHTML = "Play Again";
		break;
	}
	if (this.oWins) {
		this.playerTurn.innerHTML = "Game over! O wins!";
		this.resetButton.innerHTML = "Play Again";
		break;
			}
		}
	if (this.xWins || this.oWins) {
		for (var numberOfBoxes = 0; numberOfBoxes<this.boxes.length; numberOfBoxes++) {
		 	this.boxes[numberOfBoxes].removeEventListener("click", this.placeMark);
			}
	}else {
		checkForTie();
	}
};

Game.prototype.allBoxesFilled = function() {
	for (var numberOfBoxes = 0; numberOfBoxes<this.boxes.length; numberOfBoxes++) {
		 	if (this.boxes[numberOfBoxes].innerHTML == "") {
		 		return false;
		 	}
		 }
		 return true;
};

Game.prototype.checkForTie = function() {
	if (this.allBoxesFilled()) {
				for (var numberOfBoxes = 0; numberOfBoxes<this.boxes.length; numberOfBoxes++) {
				this.boxes[numberOfBoxes].removeEventListener("click", this.placeMark);
			}
				this.playerTurn.innerHTML = "Game over! It's a tie!";
				this.resetButton.innerHTML = "Play Again";
		}
};






