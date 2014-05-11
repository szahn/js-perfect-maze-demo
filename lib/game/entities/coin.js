ig.module(
    'game.entities.coin'
)
.requires(
    'impact.entity'
)
.defines(function(){

EntityCoin = ig.Entity.extend({
	
	collides: ig.Entity.COLLIDES.NEVER,
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	
	size: {x: 32, y: 24},
	animSheet: new ig.AnimationSheet('media/gold.png', 32, 24),
	
	init: function(x, y, settings){
    	this.addAnim('rotate', 0.25, [0,1,2,3,4,5,6,7]);
		this.currentAnim = this.anims.rotate;
    	this.parent(x, y, settings);
	},
	
	update: function(){
		this.parent();
	},
	
	check: function(other){
		if (other.name == "player"){
			window.coinCount +=1;
			window.sndCoin.play();
			this.kill();
		}
	},
	
	draw: function(){
		this.parent();
	}
	
	
});

});