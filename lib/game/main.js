ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.levels.RandomPerfectMaze',
	'game.entities.player'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	
	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
		ig.input.bind(ig.KEY.UP_ARROW, 'up');
		this.loadLevel( LevelRandomPerfectMaze );
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if (player) {
			this.screen.x = player.pos.x - ig.system.width/2;
			this.screen.y = player.pos.y - ig.system.height/2;
			if (this.screen.x < 0) this.screen.x = 0;
			if (this.screen.y < 0) this.screen.y = 0;
		}


		this.parent();
		
		// Add your own, additional update code here

	      
	      

	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
		
		
		
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 320, 240, 1.6 );

});