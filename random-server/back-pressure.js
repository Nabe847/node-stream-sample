const Chance = require('chance');
const chance = new Chance();

require('http').createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    function writeBody() {
        while (chance.bool({likelihood: 95})) {
            const shouldContinue = res.write(chance.string({length: 16 * 10e3 - 1}));

            if (!shouldContinue) {
                console.log('Backpressure occurred');
                return res.once('drain', writeBody);
            }
        }

        res.end('\nThe end...\n');
        res.on('finish', () => console.log('All data was sent'));
    }

    writeBody();
}).listen(8080, () => console.log('Listening on http://localhost:8080'));