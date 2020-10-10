
class Simulation
{
	main()
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
				new Image("Title", "../Content/Images/Title.png"),
			],
			// sounds
			[
				new Sound("Sound", "Framework/Content/Audio/Effects/Sound.wav", false),
				new Sound("Music", "Framework/Content/Audio/Music/Music.mp3", true),
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

		var universe = Universe.new
		(
			"TopDownSpaceGame",
			"0.0.0", // version
			new TimerHelper(20),
			display,
			mediaLibrary,
			null // world
		);
		universe.initialize
		(
			x => x.start()
		);
	}
}
