"use strict";
class NameGenerator {
    constructor() {
        this.consonants = "abdfghjklmnprstvwyz";
        this.vowels = "aeiou";
    }
    generateNameWithSyllables(numberOfSyllables) {
        var returnValue = "";
        for (var s = 0; s < numberOfSyllables; s++) {
            var syllable = this.consonants[Math.floor(Math.random() * this.consonants.length)]
                + this.vowels[Math.floor(Math.random() * this.vowels.length)]
                + this.consonants[Math.floor(Math.random() * this.consonants.length)];
            returnValue += syllable;
        }
        returnValue = returnValue.substr(0, returnValue.length - 1);
        return returnValue;
    }
}
