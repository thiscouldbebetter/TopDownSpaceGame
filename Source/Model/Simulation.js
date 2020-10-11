
class Simulation
{
	main()
	{
		var displaySizeInPixels = new Coords(400, 300, 1);

		var display = new Display2D
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
				new Image2("Opening", "../Content/Images/Opening.png"),
				new Image2("Title", "../Content/Images/Title.png"),
			],
			// sounds
			[
				new Sound("Sound", "Framework/Content/Audio/Effects/Sound.wav", false),
				new Sound("Music_Music", "Framework/Content/Audio/Music/Music.mp3", true),
				new Sound("Music_Title", "Framework/Content/Audio/Music/Music.mp3", true),
			],
			// videos
			[
				new Video("Movie", "Framework/Content/Video/Movie.webm"),
			],
			// fonts
			[
				new Font("Font", "Framework/Content/Fonts/Font.ttf"),
			],
			// textStrings
			[]
		);

		var universe = Universe.create
		(
			"TopDownSpaceGame",
			"0.0.0", // version
			new TimerHelper(20),
			display,
			mediaLibrary,
			ControlStyle.Instances().Default,
			null // world
		);
		universe.initialize
		(
			x => x.start()
		);
	}
}
