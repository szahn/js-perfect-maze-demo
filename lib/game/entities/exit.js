ig.module(
    'game.entities.exit'
)
.requires(
    'impact.entity'
)
.defines(function(){

EntityExit = ig.Entity.extend({
	
	name: 'exit',
	collides: ig.Entity.COLLIDES.NEVER,
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	zIndex: 0,
	
	size: {x: 23, y: 30},
	animSheet: new ig.AnimationSheet('media/portal.png', 23, 30),
	
	init: function(x, y, settings){
    	this.addAnim('portal', 0.25, [0,1,2,3,4,5,6,7,8,9,10,11]);
    	this.parent(x, y, settings);
	},
	
	update: function(){
		this.currentAnim = this.anims.portal;
		this.parent();
	},
	
	check: function(other){
		if (other.name == "player"){
			//win level
		}
	},
	
	draw: function(){
		this.parent();
	}
	
	
});

});