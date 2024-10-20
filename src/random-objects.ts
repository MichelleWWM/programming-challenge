import * as fs from 'fs';
import * as path from 'path';

function generateAlphabetString(length: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
}

function generateRealNumber(): string {
    return (Math.random() * 1000).toFixed(4);
}

function generateInteger(): string {
    return Math.floor(Math.random() * 1000).toString();
}

function generateAlphanumericWithSpaces(): string {
    const alphanumeric = generateAlphabetString(5) + generateInteger();
    const spacesBefore = ' '.repeat(Math.floor(Math.random() * 10));
    const spacesAfter = ' '.repeat(Math.floor(Math.random() * 10));
    return spacesBefore + alphanumeric + spacesAfter;
}

const filePath = path.join(__dirname, '../random_objects.txt');
const stream = fs.createWriteStream(filePath);

let fileSize = 0;
const chunkSize = 1024 * 1024;
let buffer = '';

while (fileSize < 10 * 1024 * 1024) {
  const randomObjects = [
    generateAlphabetString(10),
    generateRealNumber(),
    generateInteger(),
    generateAlphanumericWithSpaces(),
  ].join(',') + ',';

  buffer += randomObjects;
  fileSize += Buffer.byteLength(randomObjects);

  if (Buffer.byteLength(buffer) >= chunkSize) {
    stream.write(buffer);
    buffer = '';
  }
}

if (buffer) {
  stream.write(buffer);
}

stream.end(() => {
  console.log(`File generated at: ${filePath}`);
});
