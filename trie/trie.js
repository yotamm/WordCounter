const extractWords = require('get-words');
const extractWordsOptions = {keepContraction: true, breakCompoundWord: true};

class TrieNode {
    next = {};
    count = 0;
}

module.exports = class Trie {
    root = new TrieNode();

    lookup = (word) => {
        const recursiveLookup = (node, index) => {
            if (index === normalizedWord.length - 1) {
                return node.count;
            }
            const nextNode = node.next[normalizedWord[index + 1]];
            return nextNode ? recursiveLookup(nextNode, ++index) : 0;
        };

        if (!this.isValidInput(word)) {
            throw new Error('Illegal argument');
        }
        const normalizedWord = this.normalizeText(word);
        return recursiveLookup(this.root, -1);
    }

    insertText = (text) => {
        const insertWord = (word) => {
            const recursiveInsert = (node, index) => {
                if (index === normalizedText.length - 1) {
                    node.count++;
                    return;
                }
                let nextNode = node.next[normalizedText[index + 1]];
                if (!nextNode) {
                    node.next[normalizedText[index + 1]] = new TrieNode;
                    nextNode = node.next[normalizedText[index + 1]];
                }
                recursiveInsert(nextNode, ++index);
            };

            if (!this.isValidInput(word)) {
                throw new Error('Illegal argument');
            }
            const normalizedText = this.normalizeText(text);
            recursiveInsert(this.root, -1);
        };

        const words = extractWords(text, extractWordsOptions);
        words.forEach(insertWord);
    };

    normalizeText = (text) => text.toLowerCase();

    setFullTree = (newRoot) => {
        this.root = newRoot
    };

    isValidInput = (word) => (word && typeof word === 'string' && word.length > 0);

    toJson = () => JSON.stringify(this.root);
};