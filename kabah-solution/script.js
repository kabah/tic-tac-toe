//X goes first. Set event to listen for click on particular box.
var boxes = document.getElementsByClassName("box");
var playerTurn = document.getElementsByClassName("playerTurn");

window.onload = function(){

var isOsTurn = false;
var xMarks = [];
var oMarks = []; 

console.log(boxes);

for (var numberOfBoxes = 0; numberOfBoxes<boxes.length; numberOfBoxes++) {
	/*boxes[numberOfBoxes].addEventListener("click", placeMark);*/
	boxes[numberOfBoxes].addEventListener("click", changeHeader);
	boxes[numberOfBoxes].addEventListener("click", changePlayer);
}

	

// winning combos:

// [0,1,2], [3,4,5], [6,7,8],
// [0,3,6], [1,4,7], [2,5,8],
// [0,4,8], [2,4,6]

function changeHeader () {
	
	if (isOsTurn == true) {
		playerTurn.innerHTML = "It is O's turn";
		console.log(playerTurn);
	} else {
		playerTurn.innerHTML = "It is X's turn";
		console.log(playerTurn);
	}

};

function changePlayer () {
	return !isOsTurn;
	};


function placeMark () {

	if(isOsTurn){
		/*oTurn.innerHTML = "It is O's Turn";*/
		oMarks.push(this.id);
		this.innerHTML = "O";
		this.style.backgroundColor = "blue";
		console.log("oMarks: ", oMarks);
	} else {
		/*xTurn.innerHTML = "It is X's Turn";*/
		xMarks.push(this.id);
		this.innerHTML = "X";
		this.style.backgroundColor = "red";
		console.log("xMarks: ", xMarks);
	}
	/*changeHeader();
	changePlayer();*/
	checkForWin();
};





// function box1placeX () {
// 	document.getElementById("1").innerHTML = "X";
// 	document.getElementById("1").style.backgroundColor = "red";
// };

function checkForWin(){
	// check if winning combos are all X or O
}



};
