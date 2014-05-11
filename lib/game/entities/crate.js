ig.module(
    'game.entities.crate'
)
.requires(
    'impact.entity'
)
.defines(function(){

EntityCrate = ig.Entity.extend({
	
	collides: ig.Entity.COLLIDES.ACTIVE,
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	
	size: {x: 20, y: 20},
	animSheet: new ig.AnimationSheet('media/crate.png', 20, 20),
	
	init: function(x, y, settings){
    	this.addAnim('crate', 1, [0]);
		this.currentAnim = this.anims.crate;
    	this.parent(x, y, settings);
		this.accel.x = 0;
		this.accel.y = 0;
		this.friction.x = 16;
		this.friction.y = 16;
	},
	
	update: function(){
		this.parent();
	},
	
	check: function(other){
		if (other.name == "player"){

		}
	},
	
	draw: function(){
		this.parent();
	}
	
	
});

});