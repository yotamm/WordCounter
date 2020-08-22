const fs = require('fs');
const fileName = './statistics-manager/statistics.json';

fs.writeFileSync(fileName, JSON.stringify({next: {}, count: 0}));