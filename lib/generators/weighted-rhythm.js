class WeightedRhythmGenerator {
    constructor({ intervals = {}, bars }) {
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

        this.intervals = Object.keys(intervals).map(interval => {
            return {
                interval: this.intervalMappings[interval],
                probability: intervals[interval].probability,
                offset: this.intervalMappings[intervals[interval].offset] || 0
            };
        });

        this.bars = bars;
    }

    generate() {
        // 4 * 24 (ppm for quarter notes) 4x quater notes per bar
        const barLength = 24 * 4 * this.bars;
        const weights = new Array(barLength).fill({ on: false });
        const setNotes = [];

        this.intervals.forEach(({ interval, probability, offset }) => {
            for (let i = offset; i < barLength; i += interval) {
                if (probability > Math.random() && !setNotes.includes(i)) {
                    weights[i] = {
                        on: true
                    };
                    setNotes.push(i);
                }
            }
        });

        return weights;
    }
}

export default WeightedRhythmGenerator;
