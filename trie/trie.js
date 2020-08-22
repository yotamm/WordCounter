const TrieNode = require('./trie-node');
const extractWords = require('get-words');
const extractWordsOptions = {keepContraction: true, breakCompoundWord: true};

module.exports = class Trie {
    root = new TrieNode();

    lookup = (word) => {
        const recursiveLookup = (node, index) => {
            if (index === word.length - 1) {
                return node.count;
            }
            const nextNode = node.next[word[index]];
            return nextNode ? recursiveLookup(nextNode, index++) : null;
        };

        return this.isValidInput(word) ? recursiveLookup(this.root, -1) : null;
    }

    insertWord = (word) => {
        const recursiveInsert = (node, index) => {
            if (index === word.length - 1) {
                node.count++;
                return;
            }
            let nextNode = node.next[word[index]];
            if (!nextNode) {
                node.next[word[index]] = new TrieNode;
            }
            nextNode = node.next[word[index]];
            recursiveInsert(nextNode, index++);
        };

        if (this.isValidInput(word)) {
            recursiveInsert(this.root, -1);
        }
    };

    insertLine = (line) => {
        const words = extractWords(line, extractWordsOptions);
        words.forEach(this.insertWord);
    };

    isValidInput = (word) => word && typeof word === 'string' && word.length > 0;

    toString = () => JSON.stringify(this.root);
};