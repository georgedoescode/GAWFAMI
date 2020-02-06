import State from './utils/observer-pattern/state';
import Transport from './transport';
import NoteStream from './note-stream';
import { test } from './moduleexporttest';
console.log(test);
test();

class MusicApp {
    constructor(opts) {
        this.MIDI = opts.MIDI;

        this.state = new State();
        this.transport = new Transport(this.MIDI.input);

        this.transport.ontick = pulse =>
            this.state.update({
                pulse: pulse
            });
    }

    attachNoteStream(opts) {
        this.state.addObserver(new NoteStream({ ...opts }));
    }
}

export default MusicApp;
