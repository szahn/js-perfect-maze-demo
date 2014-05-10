function PerfectMaze(w, h){

    var NORTH =         'N';
    var SOUTH =         'S';
    var EAST =          'E';
    var WEST =          'W';
    
    var CLOSED =        2;
    var OPEN =          1;
    var NULL =          -1;
    
    var WALKABLE =	0;
    var UNWALKABLE =	1;
    
    var tiles =              new Array();
    var collision =	     new Array();
    var tileX =              0;
    var tileY =              0;
    var width =              0;
    var height =             0;
    
    var moves =              new Array();
    
    var startX =		0;
    var startY = 		0;
    var endX = 			0;
    var endY = 			0;
    

    var PrimeMaze = function(){
        width = (2* w)+1;
        height = (2*h)+1;

        var x, y;
        for (y = 0; y < height; y++){
            var hstrip = new Array(width);
            var colission_hstrip = new Array(width);
            for (x = 0; x < width; x++){
                hstrip[x] = CLOSED;
                colission_hstrip[x] = UNWALKABLE;
            }
            tiles.push(hstrip);
            collision.push(colission_hstrip);
        }
        
        tileX = 1;
        tileY = 1;
        tiles[tileX][tileY] = OPEN;
        collision[tileX][tileY] = WALKABLE;
	moves.push([tileX, tileY]);

    };
    
    var CreateMaze = function(){
        while(moves.length > 0){
            var possible_directions = GetPossibleDirections(tileX, tileY);
            if (possible_directions.length > 0)
            {
                ProcessCursorDirection(possible_directions, NextRandomInt(possible_directions.length));
                moves.push([tileX, tileY]);
            }
            else
            {
                ResetCursor();
            }
        }
    };
    
    var ProcessCursorDirection = function(possible_directions, move){
      	switch (possible_directions.charAt(move)){
            case NORTH:{
                    SetTile(tileX,tileY-2, OPEN);
                    SetTile(tileX,tileY-1, OPEN);
                    tileY -=2;
                    break;
                  }
            case SOUTH:{
                    SetTile(tileX,tileY+2, OPEN);
                    SetTile(tileX,tileY+1, OPEN);
                    tileY +=2;
                    break;
                  }
            case EAST:{
                    SetTile(tileX+2,tileY, OPEN);
                    SetTile(tileX+1,tileY, OPEN);
                    tileX +=2;
                    break;
                  }
            case WEST:{
                    SetTile(tileX-2,tileY, OPEN);
                    SetTile(tileX-1,tileY, OPEN);
                    tileX -=2;
                    break;
                  }
           default:{
    
           }
        }
    };
    
    var ResetCursor = function(){
        var lastPosition = moves.pop(moves.length-1);
        tileX = lastPosition[0];
        tileY = lastPosition[1];
    };
    
    var NextRandomInt = function(max){
      var random = Math.random()*max;
      return Math.round(random);
    };
    
    var GetPossibleDirections = function(x_pos, y_pos) {
        var possible_directions = ""; 
        var amt = 2;
        if (TileOK(x_pos,y_pos+ amt)) possible_directions += SOUTH;
        if (TileOK(x_pos,y_pos - amt)) possible_directions += NORTH;
        if (TileOK(x_pos - amt,y_pos)) possible_directions += WEST;
        if (TileOK(x_pos + amt,y_pos)) possible_directions += EAST;		
        return possible_directions;
    };
    
    var SetTile = function(x, y, value){
        if (x>=0 && y >=0 && x<= width && y <= height) {
            tiles[x][y] = value;
            collision[x][y] = value == CLOSED ? UNWALKABLE : WALKABLE;
        }
    };

    var GetTile = function(x, y){
        if (x>=0 && y >=0 && x<= width && y <= height) {            
            return tiles[x][y];
        }
        else{
            return NULL;
        }
    };
    
    var TileOK = function(lookupX, lookupY){
        return (lookupX > 0 && lookupY > 0 && lookupX < (width /2)-1 && lookupY < (height/2) && IsWall(lookupX,lookupY));
    };

    var IsWall = function(x, y){
        return GetTile(x,y) == CLOSED;
    };

    var RandomizeStartEndPositions = function(){
	var startPosFound = false;
	var endPosFound = false;
	var pathFound = false;
	while (!startPosFound && !endPosFound && !pathFound){
	    
	    while (!startPosFound){
		var tmpX = 1+Math.floor((Math.random() *(width-2)));
		var tmpY = 1+Math.floor((Math.random() *(height-2)));
		if (!IsWall(tmpX, tmpY)){
		    startX = tmpX;
		    startY = tmpY;
		    startPosFound = true;
		}
	    }

	    while (!endPosFound){
		var tmpX = 1+Math.ceil(Math.random() * (width-2));
		var tmpY = 1+Math.ceil(Math.random() * (height-2));
		if (!IsWall(tmpX, tmpY) && .5 >= CalcMapDistance(startX, startY, tmpX, tmpY, width, height)){		    
		    endX = tmpX;
		    endY = tmpY;
		    endPosFound = true;
		}
	    }
	    
	    path = AStar(collision, [startX, startY], [endX, endY], "Euclidean");
	    pathFound = path.length > 0;
	    
	}
	
	
    }

    
    PrimeMaze();
    CreateMaze();
    RandomizeStartEndPositions();
    
    
    return {map: 		tiles,
	    collision_map: 	collision,
	    start:		[startX, startY],
	    end:		[endX, endY,]};
    
};

var mazeSize = Math.round(2*((24 + Math.random() * 12)/2));
window.maze = PerfectMaze(mazeSize, mazeSize);