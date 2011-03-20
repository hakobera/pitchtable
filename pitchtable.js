/*
 * pitchtable.js
 *
 * @author hakobera@gmail.com
 */
(function(global) {

    /**
     * 利用可能な音名
     *
     * @constant
     * @type {string}
     */
    var NOTE_NAMES = 'C C#/Db D D#/Eb E F F#/Gb G G#/Ab A A#/Bb B';

    /**
     * 最大階数
     *
     * @constant
     * @type {number}
     */
    var MAX_OCTAVE = 8;

    /**
     * 最大MIDIノート番号
     *
     * @constant
     * @type {number}
     */
    var MAX_NOTES = 120;


    /**
     * Convert table for note name to note number.
     *
     * @type {Map.<string, number>
     */
    var noteNameToNoteNumber = {};

    /**
     * Array of frequency for each note number.
     *
     * @type {Array.<number>}
     */
    var noteNumberToFrequency = [];

    /**
     * 周波数テーブルを作成します。
     */
    var initNoteNumberToFrequency = function() {
        var i = 0;
        
        for (i = 0; i < MAX_NOTES; ++i) {
            noteNumberToFrequency[i] = 440 * Math.pow(2, (i-69)/12);
        }
    };

    /**
     * 音階名テーブルを作成します。
     */
    var initNoteNameToNoteNumber = function() {
        var noteNames = NOTE_NAMES.split(' '),
            noteNameLength = noteNames.length,
            noteName, i, j, offset;

        for (i = 0; i <= MAX_OCTAVE; ++i) {
            offset = 12/*note number of 'C0'*/ + noteNameLength * i;
            for (j = 0; j < noteNameLength; ++j) {
                noteName = noteNames[j] + i;
                noteNameToNoteNumber[noteName] = offset + j;
            }
        }

        console.log(noteNameToNoteNumber);
    };

    /**
     * 初期化処理です。
     */
    var init = function() {
        initNoteNameToNoteNumber();
        initNoteNumberToFrequency();
    };

    // 初期化します
    init();

    /**
     * @class 音階からピッチを計算するクラスです
     */
    var PitchTable = {

        /**
         * 音名と階数に対応するピッチ情報（MIDI音階名、MIDIノート番号、周波数）を返します。
         *
         * @param {string} note 音名
         * @param {number} octave 階数
         * @return {Object} ピッチ情報（MIDI音階名、MIDIノート番号、周波数）
         */
        calcPitch: function(note, octave) {
            var noteName = note + octave,
                noteNumber = noteNameToNoteNumber[noteName],
                frequency = noteNumberToFrequency[noteNumber];

            return {
                noteName: noteName,
                noteNumber: noteNumber,
                frequency: frequency
            };
        },

        /**
         * 利用できる音名の配列を返します。
         *
         * @return {Array.<string>} 利用可能な音名の配列
         */
        getNoteNames: function() {
            return NOTE_NAMES.split(' ');
        },

        /**
         * 最大階数を返します。
         *
         * @return 最大階数
         */
        getMaxOctave: function() {
            return MAX_OCTAVE;
        }
        
    };

// Export to global namespace
global.PitchTable = PitchTable;

})(this);
