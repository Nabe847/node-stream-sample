const {Stream} = require('stream');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

class ToFileStream extends Stream.Writable {
    constructor() {
        // decodeStringsはバイナリモードのときのみ有効
        // オブジェクトモードのときは設定しても無視される
        super({objectMode: true, /*decodeStrings: true,*/});
    }

    // encodingはバイナリモードで且つdecodeStringsがfalseの場合のみ必要。それ以外の場合は無視して良い
    async _write(chunk, encoding, callback) {
        try {
            await mkdirp(path.dirname(chunk.path));
            fs.writeFile(chunk.path, chunk.content, callback);
        } catch (err) {
            callback(err);
        }
    }
}

const tfs = new ToFileStream();
tfs.write({path: '_hello.txt', content: 'hello'});
tfs.write({path: '_world.txt', content: 'world'});
tfs.end(() => console.log('finish'));
