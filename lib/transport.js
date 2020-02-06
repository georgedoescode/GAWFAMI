class Transport {
    constructor(MIDIInput) {
        this.currentPulse = 0;
        this.MIDIInput = MIDIInput;

        this.listen();
    }

    listen() {
        this.MIDIInput.addListener('clock', 1, () => {
            this.ontick(this.currentPulse);
            this.currentPulse++;
        });

        this.MIDIInput.addListener('stop', 1, () => {
            this.currentPulse = 0;
        });
    }

    ontick() {}
}

export default Transport;
