import Observer from './utils/observer-pattern/observer';

class NoteStream extends Observer {
    constructor({ generator, onnote }) {
        super();

        this.generator = generator;
        this.notes = this.generator.generate();
        this.length = this.notes.length;
        this.listeners = [];
        this.onnote = onnote;
    }

    update({ pulse }) {
        const currentNote = this.notes[pulse % this.length];
        if (currentNote.on) {
            this.onnote(currentNote);
        }
    }

    onnote() {}
}

export default NoteStream;
