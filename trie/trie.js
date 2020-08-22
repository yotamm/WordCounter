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
            if (index === word.length - 1) {
                return node.count;
            }
            const nextNode = node.next[word[index]];
            return nextNode ? recursiveLookup(nextNode, index++) : 0;
        };

        return this.isValidInput(word) ? recursiveLookup(this.root, -1) : null;
    }

    insertText = (text) => {
        const insertWord = (word) => {
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

        const words = extractWords(text, extractWordsOptions);
        words.forEach(insertWord);
    };

    setFullTree = (newRoot) => {this.root = newRoot};

    isValidInput = (word) => (word && typeof word === 'string' && word.length > 0);

    toString = () => JSON.stringify(this.root);
};