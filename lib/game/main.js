ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.levels.RandomPerfectMaze',
	'game.entities.player',
	'game.entities.exit',
	'game.entities.coin',
	'game.entities.crate'
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
		window.sndCoin = new ig.Sound( 'media/coin14.ogg' );
		this.loadLevel( LevelRandomPerfectMaze );
		window.font = new ig.Font( 'media/font.png' );
		window.coinCount = 0;
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
		window.font.draw(window.coinCount, 0, 0, ig.Font.ALIGN.LEFT );		
		
		
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 160, 120, 2 );

});