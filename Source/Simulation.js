// application

function Simulation()
{}
{
	Simulation.prototype.main = function()
	{
		//localStorage.clear(); 

		var displaySizeInPixels = new Coords(400, 300);
	
		var display = new Display
		(
			displaySizeInPixels, 
			10, // fontHeightInPixels
			"Gray", "White" // colorFore, colorBack
		);
	
		var mediaLibrary = new MediaLibrary
		(
			// images
			[
				new Image("Title", "Framework/Media/Title.png"),
			],
			// sounds
			[
				new Sound("Sound", "Framework/Media/Sound.wav", false),
				new Sound("Music", "Framework/Media/Music.mp3", true),
			],
			// videos
			[
				new Video("Movie", "Framework/Media/Movie.webm"),
			]
		);

		var universe0 = Universe.new(null);

		Globals.prototype.initialize
		(
			"TopDownSpaceGame",
			20, // timerTicksPerSecond
			display,
			mediaLibrary,		
			universe0
		);
	}
}
