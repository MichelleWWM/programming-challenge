import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

function detectType(obj: string): string {
    const trimmedObj = obj.trim();
    if (/^[a-zA-Z]+$/.test(trimmedObj)) {
        return "Alphabetical String";
    } else if (/^\d+$/.test(trimmedObj)) {
        return "Integer";
    } else if (!isNaN(parseFloat(trimmedObj))) {
        return "Real Number";
    } else {
        return "Alphanumeric";
    }
}

const filePath = path.join(__dirname, '../random_objects.txt');
console.time('Processing Time');
const stream = fs.createReadStream(filePath, { highWaterMark: 1024 * 1024 });
const rl = readline.createInterface({
  input: stream,
  crlfDelay: Infinity
});
let totalObjects = 0;

rl.on('line', (line) => {
    const objects = line.split(',');
    for (const obj of objects) {
        if (obj) {
            const trimmedObj = obj.trim();
            const type = detectType(trimmedObj);
            console.log(`Object: "${trimmedObj}", Type: ${type}`);
            totalObjects++;
        }
    }
});

rl.once('close', () => {
    console.log(`File processing completed. Total objects processed: ${totalObjects}`);
    console.timeEnd('Processing Time');
});