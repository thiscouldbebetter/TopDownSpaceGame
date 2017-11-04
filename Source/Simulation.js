// application

function Simulation()
{}
{
	Simulation.prototype.main = function()
	{
		//localStorage.clear(); 

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

		var universe0 = Universe.new(null);

		Globals.Instance.initialize
		(
			"TopDownSpaceGame",
			20, // timerTicksPerSecond
			display,
			mediaLibrary,
			new ControlBuilder([ControlStyle.Instances.Default]),
			universe0
		);
	}
}
