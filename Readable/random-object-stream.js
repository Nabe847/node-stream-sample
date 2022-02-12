const Chance = require('chance');
const {Stream} = require('stream');

const chance = new Chance();

class RandomObjectStream extends Stream.Readable {
    constructor() {
        super({objectMode: true});
    }

    _read(size) {
        const chunk = {string: chance.string()}
        console.log(`Pushing chunk: ${JSON.stringify(chunk)}`);

        this.push(chunk);

        if (chance.bool({likelihood: 5})) {
            this.push(null)
        }
    }
}

const randomStream = new RandomObjectStream();
randomStream.on('readable', () => {
    let chunk;
    while ((chunk = randomStream.read()) !== null) {
        console.log(`Chunk received: ${JSON.stringify(chunk)}\n`);
    }
}).on('end', () => {
    console.log('End of RandomObjectStream');
})
