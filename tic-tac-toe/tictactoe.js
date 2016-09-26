//Initialize board
var imgOpath = 'img/mlp_fluttershy.png';
var imgXpath = 'img/mlp-rdash.jpg';

function init(data){
	console.log(data);
	console.log(data.boardSize);
	//Initialize the board if game is in progress
	for(var i = 0; i < data.boardSize; i++){
		//reset standard variables
		for(var j = 0; j < data.boardSize; j++){
			if(data.board[i][j].length != 0){				
				spot = gid('c'+i+j);
				image = document.createElement('img');
				image.className += 'img-responsive img-round animated rollIn';
				if(data.board[i][j] == 'O'){
					image.src = imgOpath;
				}
				else{
					image.src = imgXpath;
				}
				spot.appendChild(image);
			}
			else{
				//we add onClick to all square not filled
				gid('c'+i+j).onclick = function(i,j){
					return function(){
							jouer(i,j);
					};
				}(i,j)
			}
		}
	}
}



function reset(data){
	console.log(data.boardSize);
	//reset the board
	for(var i = 0; i < data.boardSize; i++){
		//reset standard variables
		for(var j = 0; j < data.boardSize; j++){
			//Remove images if they exist
			spot = gid('c'+i+j);
			if(spot.hasChildNodes()){
				spot.removeChild(spot.childNodes[0]);
			}
		}

	}

	//Add onClick to all squares
	for(var i = 0; i < data.boardSize; i++){
		for(var j = 0; j < data.boardSize; j++){
			var divName = 'c'+i.toString()+j.toString();

			gid(divName).onclick = function(i,j){
				return function(){
					
					jouer(i,j);
				};
			}(i,j)
		}
	}

	//Remove winner message
	gid('winner').innerHTML = '';
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
	socket.emit('play', {
		'i' : i,
		'j' : j
	});
	gid('c'+i+j).onclick = null;
}

function updateBoard(data){
	spot = gid('c'+data.i+data.j);
	image = document.createElement('img');
	image.className += 'img-responsive img-round animated rollIn';
	
	if(data.symbole == 'O'){
		image.src = imgOpath;
	}
	else{
		image.src = imgXpath;
	}
	spot.appendChild(image);
	if(data.finished){
		var winStr = '';
		if(data.draw){
			gid('winner').innerHTML = 'Draw !';
		}
		else if(data.symbole == 'O'){
			winStr = 'Fluttershy Wins !'
		}
		else{
			winStr = 'Rainbow Dash wins !'
		}
		gid('winner').innerHTML = winStr;

	}
}
	



