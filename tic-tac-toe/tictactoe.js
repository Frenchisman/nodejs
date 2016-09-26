//Initialize board
var boardSize = 3;
var board = [];
var imgOpath = 'img/mlp_fluttershy.png';
var imgXpath = 'img/mlp-rdash.jpg';
var symbole = '';
var finished = false;
var tour = 0;

function reset(){
	//reset the board
	for(var i = 0; i < boardSize; i++){
		//reset standard variables
		board[i] = [];
		finished = false;
		tour = 0;
		symbole = '';
		for(var j = 0; j < boardSize; j++){
			board[i][j] = [];
			//Remove images if they exist
			spot = gid('c'+i+j);
			if(spot.hasChildNodes()){
				spot.removeChild(spot.childNodes[0]);
			}
		}
	}

	//Add onClick to all squares
	for(var i = 0; i < boardSize; i++){
		for(var j = 0; j < boardSize; j++){
			var divName = 'c'+i.toString()+j.toString();

			gid(divName).onclick = function(i,j){
				return function(){
					
					jouer(i,j);
				};
			}(i,j)
		}
	}
}

/*
 * Function gid(divId)
 * Returns the element with id 'divId'
 */
var gid = function(divId){
	return document.getElementById(divId);
}

/*
 * Function jouer(i,j)
 * Plays the square at position i, j. 
 * Plays the square, checks if game over condition is met,
 * and removes the onClick function for the played square.
 * ( There is no check to see if square is playable,
 * since played squares are not supposed to be clickable !)
 */
function jouer(i,j){
	if(!finished){
		spot = gid('c'+i+j);	
		symbole = tour%2 ? 'O' : 'X';
		tour++;
		board[i][j] = symbole;
		image = document.createElement('img');
		image.className += 'img-responsive img-round animated rollIn';
		console.log(symbole);
		if(symbole == 'O'){
			image.src = imgOpath;
		}
		else{
			image.src = imgXpath;
		}
		spot.appendChild(image);
		if(tour > 4){
			var end = hasWon(i,j);
			if(end){
				finished = true;
				var winStr = '';
				if(symbole == 'O'){
					winStr = 'Fluttershy Wins !'
				}
				else{
					winStr = 'Rainbow Dash wins !'
				}
				gid('winner').innerHTML = winStr;
			}
			if(tour >= (boardSize * boardSize) && !end){
				finished = true;
				gid('winner').innerHTML = 'Draw !';
			}
		}
		spot.onclick = null;
	}
	
}

/*
 * Function hasWon(i,j)
 * Checks if the square played at position i,j 
 * ends the game. Lots of loops to check the win condition.
 * Stops as soon as possible if win condition is not met.
 */
function hasWon(i,j){
	// Check Columns
	for(var y = 0; y < boardSize; y++){
		if(board[y][j] != symbole){
			break;
		}
		if(y == boardSize-1){
			return true //win for symbole
		}
	}

	//Check rows
	for(var x = 0; x < boardSize; x++){
		if(board[i][x] != symbole){
			break;
		}
		if(x == boardSize-1){
			return true //win for symbole
		}
	}

	//Check first diag
	if(i == j){
		for(var x = 0; x < boardSize; x++){
			if(board[x][x] != symbole){
				break;
			}
			if(x == boardSize-1){
				return true //win for symbole
			}
		}
	}

	//Check second diag
	if(i+j == boardSize-1){
		console.log(i+','+j)
		for(var x = boardSize-1; x >= 0; x--){
			console.log(x+','+((boardSize-1)-x));
			if(board[x][(boardSize-1)-x] != symbole){
				break;
			}
			if(x == 0){ //Counter is inverted so win condition is when x reaches 0
				return true;
				//win for symbole
			}
		}
	}
}
//Initialize the board so game is ready to play.
reset();

