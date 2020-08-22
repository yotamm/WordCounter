const Trie = require('../trie/trie');
const trieJSON = '{"next":{"s":{"next":{"o":{"next":{"m":{"next":{"e":{"next":{},"count":2}},"count":0}},"count":0}},"count":0},"t":{"next":{"e":{"next":{"s":{"next":{"t":{"next":{},"count":2}},"count":0},"x":{"next":{"t":{"next":{},"count":1}},"count":0}},"count":0}},"count":0}},"count":0}';

test('when creating Trie _ then created successfully', () => {
    expect(new Trie()).toBeTruthy();
});

test('when looking for content _ then done successfully', () => {
    const trie = new Trie();
    trie.setFullTrie(JSON.parse(trieJSON));
    expect(trie.lookup('some')).toEqual(2);
    expect(trie.lookup('test')).toEqual(2);
    expect(trie.lookup('text')).toEqual(1);
});

test('when inserting text _ then inserted case-insensitive', () => {
    const trie = new Trie();
    trie.setFullTrie(JSON.parse(trieJSON));
    trie.insertText('sOmE');
    expect(trie.lookup('some')).toEqual(3);
});

test('when inserting multiple words _ then done successfully', () => {
    const trie = new Trie();
    trie.insertText('some test text');
    expect(trie.lookup('some')).toEqual(1);
    expect(trie.lookup('test')).toEqual(1);
    expect(trie.lookup('text')).toEqual(1);
});

test('when inserting word _ then prefix does not count', () => {
    const trie = new Trie();
    trie.insertText('test');
    expect(trie.lookup('t')).toEqual(0);
    expect(trie.lookup('te')).toEqual(0);
    expect(trie.lookup('tes')).toEqual(0);
});

test('when looking for content that doesnt exist _ then not found', () => {
   const trie = new Trie();
   trie.setFullTrie(JSON.parse(trieJSON));
   expect(trie.lookup('word')).toEqual(0);
});