//Initialize board
var boardSize = 3;
var board = [];
for(var i = 0; i < boardSize; i++){
	board[i] = [];
}

var symbole = '';

var tour = 0;
var gid = function(divId){
	return document.getElementById(divId);
}

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


function jouer(i,j){
	spot = gid('c'+i+j)
	spot.onclick = null;
	symbole = tour%2 ? 'O' : 'X';
	tour++;
	board[i][j] = symbole;
	spot.innerHTML = symbole;
	if(tour > 4){
		var end = isFinished(i,j);
		if(end){
			gid('winner').innerHTML = symbole +' Win !';
		}
		if(tour >= (boardSize * boardSize) && !end){
			gid('winner').innerHTML = 'Draw !';
		}
	}
}

function isFinished(i,j){
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
			if(x == 0){ //We invert the counter so win condition is when x reaches 0
				return true;
				//win for symbole
			}
		}
	}
}