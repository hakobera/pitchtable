document.addEventListener('DOMContentLoaded', function() {

    // Set up options
    var i, option,
        noteSelect = document.getElementById('note'),
        octaveSelect = document.getElementById('octave'),
        pitchInfoText = document.getElementById('pitchInfo'),
        playButton = document.getElementById('play');

    var noteNames = PitchTable.getNoteNames(),
        noteNamesLength = noteNames.length,
        noteNameOptions = document.createDocumentFragment();
    for (i = 0; i < noteNamesLength; ++i) {
        option = document.createElement('option');
        option.value = option.textContent = noteNames[i];
        noteNameOptions.appendChild(option);
    }
    noteSelect.appendChild(noteNameOptions);

    var maxOctave = PitchTable.getMaxOctave(),
        octaveOptions = document.createDocumentFragment();
    for (i = 0; i <= maxOctave; ++i) {
        option = document.createElement('option');
        option.value = option.textContent = i;
        octaveOptions.appendChild(option);
    }
    octaveSelect.appendChild(octaveOptions);

    // Event function

    /**
     * Current pitch information.
     */
    var audio = new Audio(),
        sampleRate = 44100,
        soundDataSize = 2/*secounds*/ * sampleRate,
        soundData = new Float32Array(soundDataSize),
        pitch;

    function calcPitch(e) {
        var note = noteSelect.value;
        var octave = octaveSelect.value;
        pitch = PitchTable.calcPitch(note, octave);
        pitchInfoText.value = 'KeyB. Note = ' + pitch.noteName + ', MIDI Note = ' + pitch.noteNumber + ', Freq = ' + pitch.frequency.toFixed(3) + ' Hz';
    }

    function createSoundData() {
       var freq = pitch.frequency,
           k = 2 * Math.PI * freq / sampleRate,
           i;

       for (i = 0; i < soundDataSize; ++i) {
           soundData[i] = 0.1 * Math.sin(k * i);
       }

       return soundData;
    }

    function playSound(e) {
        e.preventDefault();
        if (audio.mozSetup) {
            audio.mozSetup(1, sampleRate);
            audio.mozWriteAudio(createSoundData());
        }
    };

    // Bind events
    noteSelect.addEventListener('change', calcPitch, false);
    octaveSelect.addEventListener('change', calcPitch, false);
    playButton.addEventListener('click', playSound, false);

    // Calc initial value
    noteSelect.value = 'A';
    octaveSelect.value = '4';
    calcPitch();
    
}, false);