// application

function Simulation()
{}
{
	Simulation.prototype.main = function()
	{
		var displaySizeInPixels = new Coords(400, 300, 1);
	
		var display = new Display
		(
			[ displaySizeInPixels ],
			"Font",
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
			],
			// fonts
			[
				new Font("Font", "Framework/Media/Font.ttf"),
			]
		);

		var universe = Universe.new
		(
			"TopDownSpaceGame", new TimerHelper(20), display, mediaLibrary, null
		);
		universe.initialize();

	}
}
