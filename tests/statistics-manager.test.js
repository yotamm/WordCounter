const StatsManager = require('../statistics-manager/statistics-manager');
jest.mock('fs');

test('when fetching manager instance _ then done successfully', () => {
    expect(StatsManager.getInstance()).toBeTruthy();
});

test('when fetching manager instance _ then always getting the same instance', () => {
    const instance1 = StatsManager.getInstance();
    const instance2 = StatsManager.getInstance();
    expect(instance1).toEqual(instance2);
});

test('when new instance created _ then get existing stats', () => {
    expect(StatsManager.getInstance().getWordStatistics('some')).toEqual({word: 'some', count: 2});
});

test('when adding to stats _ then persists successfully', () => {
    const spy = jest.spyOn(require('fs'), 'writeFile');
    StatsManager.getInstance().addToStatistics('test');
    expect(spy).toHaveBeenCalledWith(
        './statistics-manager/statistics.json',
        '{"next":{"s":{"next":{"o":{"next":{"m":{"next":{"e":{"next":{},"count":2}},"count":0}},"count":0}},"count":0},"t":{"next":{"e":{"next":{"s":{"next":{"t":{"next":{},"count":3}},"count":0},"x":{"next":{"t":{"next":{},"count":1}},"count":0}},"count":0}},"count":0}},"count":0}',
        expect.anything()
    );
});