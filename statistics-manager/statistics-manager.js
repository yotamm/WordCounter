const Trie = require('../trie/trie');
const fs = require('fs');
const environment = JSON.parse(fs.readFileSync('../environment.json', 'utf8'));
const fileName = environment['statistics_file_path'];


class StatisticsManager {
    dataTrie = new Trie();

    constructor() {
        fs.readFile(fileName, (error, data) => {
            if (error) throw error;
            const stats = JSON.parse(data.toString());
            this.dataTrie.setFullTrie(stats);
        });
    }

    getWordStatistics = (word) => {
        const result = this.dataTrie.lookup(word);
        return {word: word, count: result};
    }

    addToStatistics = (text) => {
        this.dataTrie.insertText(text);
        this.persistStatistics();
    }

    persistStatistics = () => {
        const rawData = this.dataTrie.toJson();
        fs.writeFile(fileName, rawData, (error) => {
            if (error) throw error;
        });
    }
}

module.exports = (function () { // Singleton
    let instance;

    function createInstance() {
        return new StatisticsManager();
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();
