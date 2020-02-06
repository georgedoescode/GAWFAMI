class RhythmGenerator {
    constructor(intervals = [], bars) {
        this.intervalMappings = {
            '1/64t': 1,
            '1/32t': 2,
            '1/32': 3,
            '1/16t': 4,
            '1/16': 6,
            '1/8t': 8,
            '1/8': 12,
            '1/4t': 16,
            '1/4': 24,
            '1/2': 48,
            '1/1': 96
        };

        this.intervals = intervals.map(interval => {
            return this.intervalMappings[interval];
        });

        this.bars = bars;
    }

    generate() {
        // 4 * 24 (ppm for quarter notes) 4x quater notes per bar
        const barLength = 24 * 4 * this.bars;
        const weights = [];

        for (let i = 0; i < barLength; i++) {
            let beatWasSet = false;

            this.intervals.forEach(value => {
                if (i % value === 0 && !weights[i]) {
                    weights[i] = {
                        on: true
                    };
                    beatWasSet = true;
                } 
            });

            if(!beatWasSet) {
                weights[i] = {
                    on: false
                };
            }
        }

        return weights;
    }
}

export default RhythmGenerator;
