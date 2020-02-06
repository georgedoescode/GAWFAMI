import MusicApp from '../lib';
import WeightedRhythmGenerator from '../lib/generators/weighted-rhythm';
import WebMidi from 'webmidi';
import GeneticAlgorithm from 'tournament-selection-genetic-algorithm';
import { scale } from '@tonaljs/scale';

const availableNotes = [0, 1, 2, 3, 4, 5, 6, 7];
const melodyDivisions = 96 * 4;
const melodyCount = 16;

const geneticAlgorithm = new GeneticAlgorithm(melodyDivisions, availableNotes);
console.log(geneticAlgorithm);
geneticAlgorithm.fitness = G => {
    let score = 0;

    if (G[0] !== 0) score++;

    for (let index in G) {
        if (index + (1 % 4) === 0) {
            if (G[index] !== 0) score++;
        }
    }

    const noteCount = G.reduce((a, v) => a + ~~!!v, 0);

    const idealNoteCount = 4;

    score -= Math.abs(idealNoteCount - noteCount);

    return score;
};

geneticAlgorithm.run(melodyCount, 1000);

// console.log(geneticAlgorithm);

const melodies = geneticAlgorithm.population;

console.log(melodies);

// console.log(melodies);

// console.log(scale('c3 major'));

WebMidi.enable(err => {
    if (err) return console.warn(err);

    const input = WebMidi.inputs[0];
    const output = WebMidi.outputs[0];

    const App = new MusicApp({
        MIDI: {
            input: input,
            output: output
        }
    });

    App.attachNoteStream({
        generator: new WeightedRhythmGenerator(
            {
                intervals: {
                    '1/4': {
                        probability: 1
                    }
                }
            },
            1
        )
    });

    // App.attachNoteStream({
    //     generator: new GAGenerator(),
    //     onnote: note => {
    //         const majorScaleIncrements = [0, 2, 4, 5, 7, 9, 11];

    //         output.playNote(60 + majorScaleIncrements[note], 1, {
    //             duration: 250
    //         });
    //     }
    // });

    console.log(melodies);
});

class GAGenerator {
    generate() {
        return geneticAlgorithm.population.reduce((a, v) => a.concat(v), []);
    }
}

const gaGenerator = new GAGenerator();

console.log(gaGenerator.generate());
