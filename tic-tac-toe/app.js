var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');
var path = require('path');

app.listen(8030);

function handler(request, response){

	    console.log('request starting...');

	    var filePath = '.' + request.url;
	    if (filePath == './')
	        filePath = './tictactoe.html';

	    var extname = path.extname(filePath);
	    var contentType = 'text/html';
	    switch (extname) {
	        case '.js':
	            contentType = 'text/javascript';
	            break;
	        case '.css':
	            contentType = 'text/css';
	            break;
	        case '.json':
	            contentType = 'application/json';
	            break;
	        case '.png':
	            contentType = 'image/png';
	            break;      
	        case '.jpg':
	            contentType = 'image/jpg';
	            break;
	        case '.wav':
	            contentType = 'audio/wav';
	            break;
	    }

	    fs.readFile(filePath, function(error, content) {
	        if (error) {
	            if(error.code == 'ENOENT'){
	                fs.readFile('./404.html', function(error, content) {
	                    response.writeHead(200, { 'Content-Type': contentType });
	                    response.end(content, 'utf-8');
	                });
	            }
	            else {
	                response.writeHead(500);
	                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
	                response.end(); 
	            }
	        }
	        else {
	            response.writeHead(200, { 'Content-Type': contentType });
	            response.end(content, 'utf-8');
	        }
	    });
};



io.on('connection', function(socket){

	socket.emit('init', {
		'boardSize': boardSize,
		'board': board,
		}
	);

	
	socket.on('play', function(data){
		if(!finished){
			jouer(data);
		}
		console.log('Played :'+data);
	});

	socket.on('reset', function(data){
		console.log('reset');
		reset();
	});
});








/****** Game Logic *******/

//Initialize board
var boardSize = 3;
var board = [];
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
		}

	}
	io.emit('reset', {
		'boardSize' : boardSize
	});
}

/*
 * Function jouer(i,j)
 * Plays the square at position i, j. 
 * Plays the square, checks if game over condition is met,
 * and removes the onClick function for the played square.
 * ( There is no check to see if square is playable,
 * since played squares are not supposed to be clickable !)
 */
function jouer(data){
	i = data.i;
	j = data.j
	draw = false;
	if(!finished){	
		symbole = tour%2 ? 'O' : 'X';
		tour++;
		board[i][j] = symbole;
		if(tour > 4){
			var end = isFinished(i,j);
			if(end){
				finished = true;
			}
			if(tour >= (boardSize * boardSize) && !end){
				finished = true;
				draw = true;
			}
		}
	}

	//emit response from server
	io.emit('played', {
		'i' : i,
		'j' : j,
		'symbole' : symbole,
		'finished' : finished,
		'draw' : draw

	});
	
}

/*
 * Function isFinished(i,j)
 * Checks if the square played at position i,j 
 * ends the game. Lots of loops to check the win condition.
 * Stops as soon as possible if win condition is not met.
 */
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
			if(x == 0){ //Counter is inverted so win condition is when x reaches 0
				return true;
				//win for symbole
			}
		}
	}
}
//Initialize the board so game is ready to play.
reset();

