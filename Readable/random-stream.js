const Chance = require('chance');
const {Stream} = require('stream');

const chance = new Chance();

class RandomStream extends Stream.Readable {
    constructor(options) {
        super(options);
    }

    // 引数は無視してもよい(アドバイザリ引数)
    _read(size) {
        const chunk = chance.string();
        console.log(`Pushing chunk of size: ${chunk.length}`);

        // 1回の呼び出しの中でpushを複数回実行するなら戻り値がtrueかどうかをチェックする必要がある
        // 戻り値がfalseの場合はhighWaterMarkに達したことを意味するので、それ以上pushを実行しないようにする必要がある
        this.push(chunk, 'utf-8');

        if (chance.bool({likelihood: 5})) {
            this.push(null);
        }
    }
}

const randomStream = new RandomStream();
randomStream.on('readable', () => {
    let chunk;
    while ((chunk = randomStream.read()) !== null) {
        console.log(`Chunk received: ${chunk.toString()}\n`);
    }
}).on('end', () => {
    console.log('End of RandomStream');
})