const fs = jest.createMockFromModule('fs');

function readFile(filename, callback) {
    callback(null, '{"next":{"s":{"next":{"o":{"next":{"m":{"next":{"e":{"next":{},"count":2}},"count":0}},"count":0}},"count":0},"t":{"next":{"e":{"next":{"s":{"next":{"t":{"next":{},"count":2}},"count":0},"x":{"next":{"t":{"next":{},"count":1}},"count":0}},"count":0}},"count":0}},"count":0}');
}

function readFileSync(filename) {
    return '{"statistics_file_path": "./statistics-manager/statistics.json"}';
}

function writeFile(filename, data, callback) {
    callback(null);
}

fs.readFile = readFile;
fs.readFileSync = readFileSync;
fs.writeFile = writeFile;
module.exports = fs;