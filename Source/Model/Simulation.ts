
class Simulation
{
	main(): void
	{
		var displaySizeInPixels = new Coords(400, 300, 1);

		var display = new Display2D
		(
			[ displaySizeInPixels ],
			"Font",
			10, // fontHeightInPixels
			Color.byName("Gray"),
			Color.byName("White"), // colorFore, colorBack
			false // isInvisible
		);

		var mediaLibrary = new MediaLibrary
		(
			"../Content",

			// images
			[
				new Image2("Opening", "../Content/Images/Opening.png"),
				new Image2("Producer", "../Content/Images/Producer.png"),
				new Image2("Title", "../Content/Images/Title.png"),
			],
			// sounds
			[
				new SoundFromFile("Sound", "Framework/Content/Audio/Effects/Sound.wav"),
				new SoundFromFile("Music_Music", "Framework/Content/Audio/Music/Music.mp3"),
				new SoundFromFile("Music_Producer", "Framework/Content/Audio/Music/Music.mp3"),
				new SoundFromFile("Music_Title", "Framework/Content/Audio/Music/Music.mp3"),
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

		var worldCreator = 	WorldCreator.fromWorldCreate
		(
			WorldExtended.create
		);

		var universe = Universe.create
		(
			"TopDownSpaceGame",
			"0.0.0-20220213", // version
			new TimerHelper(20),
			display,
			mediaLibrary,
			ControlBuilder.default(),
			worldCreator
		);
		universe.initialize
		(
			x => x.start()
		);
	}
}
