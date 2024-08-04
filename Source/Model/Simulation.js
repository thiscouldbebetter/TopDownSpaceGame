"use strict";
class Simulation {
    main() {
        var displaySizeInPixels = new Coords(400, 300, 1);
        var colors = Color.Instances();
        var display = new Display2D([displaySizeInPixels], new FontNameAndHeight("Font", 10), colors.Gray, colors.White, // colorFore, colorBack
        false // isInvisible
        );
        var mediaLibrary = new MediaLibrary("../Content", 
        // images
        [
            new Image2("Titles_Opening", "../Content/Images/Titles/Opening.png"),
            new Image2("Titles_Producer", "../Content/Images/Titles/Producer.png"),
            new Image2("Titles_Title", "../Content/Images/Titles/Title.png"),
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
        []);
        var worldCreator = WorldCreator.fromWorldCreate(WorldExtended.create);
        var universe = Universe.create("TopDownSpaceGame", "0.0.0-20240804", // version
        new TimerHelper(20), display, new SoundHelperLive(), mediaLibrary, ControlBuilder.default(), worldCreator);
        universe.initialize(x => x.start());
    }
}
