function PerfectMaze(w, h){

	var self = this;
    var NORTH =         'N';
    var SOUTH =         'S';
    var EAST =          'E';
    var WEST =          'W';
    
    var FOG_1			= 0;
    var FOG_2			= 1;
    var FOG_3			= 2;
    
    var CLOSED =        2;
    var OPEN =          1;
    var NULL =          -1;
    
    
    var WALKABLE =	0;
    var UNWALKABLE =	1;
    
    self.tile_meta			= new Array();
    self.fog =				new Array();
    self.tiles =              new Array();
    self.collision =	     new Array();
    self.tileX =              0;
    self.tileY =              0;
    self.width =              0;
    self.height =             0;
    self.coins = new Array();
    
    self.moves =              new Array();
    
    self.startX =		0;
    self.startY = 		0;
    self.endX = 			0;
    self.endY = 			0;
    

    var PrimeMaze = function(){
        self.width = (2*w) + 1;
        self.height = (2*h) + 1;

        var x, y;
        for (y = 0; y < self.height; y++){
            var hstrip = new Array(self.width);
            var colission_hstrip = new Array(self.width);
            var fog_hstrip = new Array(self.width);
            var meta_hstrip = new Array(self.width);
            for (x = 0; x < self.width; x++){
                hstrip[x] = CLOSED;
                colission_hstrip[x] = UNWALKABLE;
                fog_hstrip[x] = 1;
                meta_hstrip[x] = {};
            }
            self.tiles.push(hstrip);
            self.collision.push(colission_hstrip);
            self.fog.push(fog_hstrip);
            self.tile_meta.push(meta_hstrip);
        }
        
        self.tileX = 1;
        self.tileY = 1;
        self.tiles[self.tileX][self.tileY] = OPEN;
        collision[self.tileX][self.tileY] = WALKABLE;
        self.moves.push([self.tileX, self.tileY]);

    };
    
    var CreateMaze = function(){
        while(self.moves.length > 0){
            var possible_directions = GetPossibleDirections(self.tileX, self.tileY);
            if (possible_directions.length > 0)
            {
                ProcessCursorDirection(possible_directions, NextRandomInt(possible_directions.length));
                self.moves.push([self.tileX, self.tileY]);
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
                    SetTile(self.tileX,self.tileY-2, OPEN);
                    SetTile(self.tileX,self.tileY-1, OPEN);
                    self.tileY -=2;
                    break;
                  }
            case SOUTH:{
                    SetTile(self.tileX,self.tileY+2, OPEN);
                    SetTile(self.tileX,self.tileY+1, OPEN);
                    self.tileY +=2;
                    break;
                  }
            case EAST:{
                    SetTile(self.tileX+2,self.tileY, OPEN);
                    SetTile(self.tileX+1,self.tileY, OPEN);
                    self.tileX +=2;
                    break;
                  }
            case WEST:{
                    SetTile(self.tileX-2,self.tileY, OPEN);
                    SetTile(self.tileX-1,self.tileY, OPEN);
                    self.tileX -=2;
                    break;
                  }
           default:{
    
           }
        }
    };
    
    var ResetCursor = function(){
        var lastPosition = self.moves.pop(self.moves.length-1);
        self.tileX = lastPosition[0];
        self.tileY = lastPosition[1];
    };
    
    var NextRandomInt = function(max){
      var random = Math.random()*max;
      return Math.round(random);
    };
    
    var Distort = function(min, max, iterations){	    
    	var i = 0;
    	for (i = 0; i < iterations; i++){
    		var amountX = Math.floor(min + (Math.random() * max));
    		var amountY = Math.floor(min + (Math.random() * max));
		    for (y = 1; y < height - 1; y = y + amountY){
	            for (x = 1; x < width - 1; x = x + amountX){
	            	if (IsWall(x, y)){
		            	self.tiles[x][y] = OPEN;
		            	self.collision[x][y] = WALKABLE;
	            	}
	            }
	        }
    	}
    }
    
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
            self.tiles[y][x] = value;
            self.collision[y][x] = (value == CLOSED) ? UNWALKABLE : WALKABLE;
        }
    };

    var GetTile = function(x, y){
        if (x>=0 && y >=0 && x<= width && y <= height) {            
            return self.tiles[y][x];
        }
        else{
            return NULL;
        }
    };
    
    var TileOK = function(lookupX, lookupY){
        return (lookupX > 0 && lookupY > 0 && lookupX < (width)-1 && lookupY < (height) && IsWall(lookupX,lookupY));
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
		    self.startX = tmpX;
		    self.startY = tmpY;
		    startPosFound = true;
		}
	    }

	    while (!endPosFound){
		var tmpX = 1+Math.ceil(Math.random() * (width-2));
		var tmpY = 1+Math.ceil(Math.random() * (height-2));
		if (!IsWall(tmpX, tmpY) && .5 >= CalcMapDistance(self.startX, self.startY, tmpX, tmpY, width, height)){		    
		    endX = tmpX;
		    endY = tmpY;
		    endPosFound = true;
		}
	    }
	    
	    path = AStar(self.collision, [self.startX, self.startY], [endX, endY], "Euclidean");
	    pathFound = path.length > 0;
	    
	}
	
	
    }

    
    PrimeMaze();
    CreateMaze();
    Distort(2, 8, 6);
    RandomizeStartEndPositions();
    SetTile(endX, endY, OPEN);
    
    self.tiles[self.endY][self.endX] = OPEN;
    collision[self.endY][self.endX] = WALKABLE;

        
    return {map: 		self.tiles,
	    collision_map: 	self.collision,
	    fog_map:		self.fog,
	    start:		[self.startX, self.startY],
	    end:		[endX, endY,],
	    meta:		self.tile_meta,
	    size: 		w};
    
};

var mazeSize = 12; //Math.round(2*((24 + Math.random() * 12)/2));
window.maze = PerfectMaze(mazeSize, mazeSize);