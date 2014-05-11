ig.module( 'game.levels.RandomPerfectMaze' )
.requires('impact.image')
.defines(function(){
    LevelRandomPerfectMaze = {
        "entities": [
            {"type":"EntityPlayer","x":30*window.maze.start[0],"y":30*window.maze.start[1]},
            {"type":"EntityExit","x":4+(30*window.maze.end[0]),"y":30*window.maze.end[1]}],        
        "layer": [
            {"name": "floor",
            "width": 30,
            "height": 30,
            "linkWithCollision": false,
            "visible": true,
            "tilesetName": "media/metalic.png",
            "repeat": false,
            "distance": 1,
            "tilesize": 30,
            "foreground": false,
            "data": window.maze.map},
            
            {"name":"collision",
            "width":160,
            "height":60,
            "linkWithCollision":false,
            "visible":0,
            "tilesetName":"media/collisiontiles-8x8.png",
            "repeat":false,
            "distance":1,
            "tilesize":30,
            "foreground":false,
            "data": window.maze.collision_map},
            
            {"name":"fog",
            "width":30,
            "height":30,
            "linkWithCollision":false,
            "visible":true,
            "tilesetName":"media/fog.png",
            "repeat":false,
            "distance":1,
            "tilesize":30,
            "foreground":true,
            "data": window.maze.fog_map}

            ]
        
    };

    //Generate coins
    var cnt = 0;
    for (x = 0; x < window.maze.size*2; x++){
	    for (y = 0; y < window.maze.size*2; y++){	    	
	    	if (window.maze.collision_map[y][x] == 0){
	    		cnt += 10 * Math.random();
	    		if (cnt > 25){
				    LevelRandomPerfectMaze.entities.push({"type":"EntityCoin","x":30*x,"y":4+(30*y)});
				    cnt = 0;
	    		}
	    	}
	    }
    }
    
    //Generate crates
    cnt = 0;
    for (x = 0; x < window.maze.size*2; x++){
	    for (y = 0; y < window.maze.size*2; y++){	    	
	    	if (window.maze.collision_map[y][x] == 0){
	    		cnt += 10 * Math.random();
	    		if (cnt > 80){
				    LevelRandomPerfectMaze.entities.push({"type":"EntityCrate","x":4+(30*x),"y":4+(30*y)});
				    cnt = 0;
	    		}
	    	}
	    }
    }

    LevelRandomPerfectMazeResources = [
        new ig.Image('media/metalic.png'), new ig.Image('media/metalic.png'), new ig.Image('media/fog.png')
    ];
});