ig.module( 'game.levels.RandomPerfectMaze' )
.requires('impact.image')
.defines(function(){
    LevelRandomPerfectMaze = {
        "entities": [
            {"type":"EntityPlayer","x":30*window.maze.start[0],"y":30*window.maze.start[1]}
                     
                    ],        
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
            "data": window.maze.collision_map}
            ]
        
    };
    
    LevelRandomPerfectMazeResources = [
        new ig.Image('media/metalic.png'), new ig.Image('media/metalic.png')
    ];
});