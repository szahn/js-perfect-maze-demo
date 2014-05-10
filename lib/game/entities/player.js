ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity'
)
.defines(function(){

EntityPlayer = ig.Entity.extend({

collides: ig.Entity.COLLIDES.ACTIVE,
type: ig.Entity.TYPE.A,
checkAgainst: ig.Entity.TYPE.B,
gravityFactor: 2,

state: 'idle',

size: {x:25, y:25},

speed: 60,

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

    this.parent();    
},

handleMovementTrace: function(res){

    if (res.collision.x || res.collision.y) this.state = 'idle';
    
    this.parent(res);
    
}
    
    
});
});

function doInput(p){
    
    if (ig.input.state('left')){
        p.state = 'west';
    }
    else if (ig.input.state('right')){
        p.state = 'east';
    }
    else if (ig.input.state('up')){
        p.state = 'north';
    }
    else if (ig.input.state('down')){
        p.state = 'south';
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
