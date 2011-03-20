document.addEventListener('DOMContentLoaded', function() {

    // Set up options
    var i, option,
        noteSelect = document.getElementById('note'),
        octaveSelect = document.getElementById('octave'),
        pitchInfoText = document.getElementById('pitchinfo');

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

    // Bind events
    var calcPitch = function() {
        var note = noteSelect.value;
        var octave = octaveSelect.value;
        var pitch = PitchTable.calcPitch(note, octave);
        var result = 'KeyB. Note = ' + pitch.noteName + ', MIDI Note = ' + pitch.noteNumber + ', Freq = ' + pitch.frequency;
        pitchInfoText.value = result;
    };

    noteSelect.addEventListener('change', calcPitch, false);
    octaveSelect.addEventListener('change', calcPitch, false);

    // Calc initial value
    calcPitch();
    
}, false);