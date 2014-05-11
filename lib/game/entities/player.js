ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity'
)
.defines(function(){

EntityPlayer = ig.Entity.extend({

name: 'player',
collides: ig.Entity.COLLIDES.ACTIVE,
type: ig.Entity.TYPE.A,
checkAgainst: ig.Entity.TYPE.B,
gravityFactor: 2,
zIndex: 1,

state: 'idle',
sight: 3,

size: {x:30, y:30},

speed: 75,

animSheet: new ig.AnimationSheet('media/actors.png', 25, 25),

init: function(x, y, settings){
    this.addAnim('idle', 1, [1]);
    this.addAnim('north', 0.25, [36,37,38]);
    this.addAnim('west', 0.25, [12,13,14]);
    this.addAnim('east', 0.25, [24,25,26]);
    this.addAnim('south', 0.25, [0,1,2]);
        
    this.parent(x,y, settings);
},

collideWith: function(other, axis){
    
    this.parent(other,axis);
    
    this.state = 'idle';      
},

update: function(){
    
    doInput(this);
    doWalk(this);
    doFOG(this);
    doFOG(this);

    this.parent();    
},

handleMovementTrace: function(res) {
    this.parent(res);
    this._handleCornerSmoothing(res, 'x');
    return this._handleCornerSmoothing(res, 'y');
},
  
_handleCornerSmoothing: function(res, collisionAxies) {
	var axies, belowCenter, diff, mod, size;
	axies = collisionAxies === 'x' ? 'y' : 'x';
	if (res.collision[collisionAxies]) {
	  size = this.size[axies];
	  mod = res.pos[axies] % size;
	  belowCenter = mod < size / 2;
	  diff = belowCenter ? mod : size - mod;
	  if (Math.abs(diff) < (size / 3)) {
	    if (belowCenter) {
	      return this.pos[axies] -= diff;
	    } else {
	      return this.pos[axies] += diff;
	    }
	  }
	}
}
    
    
});
});

function doInput(p){
    
    var px = Math.floor((p.pos.x+16)/30);
    var py = Math.floor((p.pos.y+16)/30);    
    
    if (ig.input.state('left')){
        p.state = 'west';
        for (var x = px; x >= px - p.sight; x--){
        	window.maze.meta[py][x].discovered = true;
        	if (window.maze.collision_map[py][x] != 0) break;
        }
    }
    else if (ig.input.state('right')){
        p.state = 'east';
        for (var x = px; x <= px + p.sight; x++){
        	window.maze.meta[py][x].discovered = true;
        	if (window.maze.collision_map[py][x] != 0) break;
        }
    }
    else if (ig.input.state('up')){
        p.state = 'north';
        for (var y = py; y >= py - p.sight; y--){
        	window.maze.meta[y][px].discovered = true;
        	if (window.maze.collision_map[y][px] != 0) break;
        }
    }
    else if (ig.input.state('down')){
        p.state = 'south';
        for (var y = py; y <= py + p.sight; y++){
        	window.maze.meta[y][px].discovered = true;
        	if (window.maze.collision_map[y][px] != 0) break;
        }
    }
    else
    {
	    p.state = 'idle';
	    return;
    }
    
}

function doFOG(p){
    
    var px = Math.floor((p.pos.x+16)/30);
    var py = Math.floor((p.pos.y+16)/30);
        
    for (var x = px - 4; x <= px + 4; x++){
	    for (var y = py - 4; y <= py + 4; y++){
	    	if (x >= 0 && y >=0 && x <= window.maze.size *2 && y <= window.maze.size*2){
		    	if ((x >= px - 1 && x <= px + 1) && (y >= py - 1 && y <= py + 1)) 
		    	{
				    window.maze.fog_map[y][x] = -1;
				    window.maze.meta[y][x].discovered = true;
		    	}
		    	else if ((x >= px - 2 && x <= px + 2) && (y >= py - 2 && y <= py + 2) && window.maze.meta[y][x].discovered) 
		    	{
				    window.maze.fog_map[y][x] = 3;
		    	}
		    	else
		    	{
			    	if (window.maze.meta[y][x].discovered == true){
				    	window.maze.fog_map[y][x] = 2;
			    	}
			    	else
			    	{
				    	window.maze.fog_map[y][x] = 1;
			    	}
		    	}
	    	}	    	
	    }    
    }  
}

function doWalk(p){
    
    var anim;
    switch (p.state){
        case 'idle':{
            p.vel.x = 0;
            p.vel.y = 0;
            anim = p.anims.idle;
            break;
        }
        case 'north':{
            p.vel.x = 0;
            p.vel.y = -p.speed;
            anim = p.anims.north;
            break;
        }
        case 'south':{
            p.vel.x = 0;
            p.vel.y = p.speed;
            anim = p.anims.south;
            break;
        }
        case 'east':{
            p.vel.x = p.speed;
            p.vel.y = 0;
            anim = p.anims.east;
            break;
        }
        case 'west':{
            p.vel.x = -p.speed;
            p.vel.y = 0;
            anim = p.anims.west;
            break;
        }
    }
    
    p.currentAnim = anim;
  
    
}
