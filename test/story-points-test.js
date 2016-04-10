import {assert} from 'chai';
import {
    hasWonBattle,
    hasAcquiredBattleWinCount,
    hasAcquiredItem,
    hasVisitedMap,
    doesHaveStoryPoint,
    hasFoundPackage
} from '../src/story-points/story-points';

describe('hasWonBattle', () => {
    it('returns true if you have won the battle', () => {
        const state = {
            battles: {
                guy1: {
                    wins: 1,
                    losses: 0
                }
            }
        };
        assert.isTrue(hasWonBattle(state, "guy1"));
    });

    it('returns false if you have lost the battle', () => {
        const state = {
            battles: {
                guy2: {
                    wins: 0,
                    losses: 1
                }
            }
        };
        assert.isFalse(hasWonBattle(state, "guy2"));
    });

    it('returns false if you have not played the battle', () => {
        const state = {
            battles: {
                guy1: {
                    wins: 0,
                    losses: 1
                }
            }
        };
        assert.isFalse(hasWonBattle(state, "guy3"));
    });
});

describe('hasAcquiredBattleWinCount', () => {
    it('knows if you have won this many battles', () => {
        const state = {
            battles: {
                guy1: {
                    wins: 1,
                    losses: 0
                },
                guy2: {
                    wins: 3,
                    losses: 4
                }
            }
        };
        assert.isTrue(hasAcquiredBattleWinCount(state, 4));
        assert.isTrue(hasAcquiredBattleWinCount(state, 3));
        assert.isTrue(hasAcquiredBattleWinCount(state, 2));
        assert.isFalse(hasAcquiredBattleWinCount(state, 5));
    });
});

describe('hasAcquiredItem', () => {
    it('knows if you have acquired a certain item', () => {
        const state = {
            acquiredItems: {
                action_item_hp_001: {
                    firstAcquiredAt: 245897359
                }
            }
        };
        assert.isTrue(hasAcquiredItem(state, "action_item_hp_001"));
        assert.isFalse(hasAcquiredItem(state, "someNonExistantItem"));
    });
});

describe('hasFoundPackage', () => {
    it('knows if you have picked up a certain package', () => {
        const state = {
            foundPackages: {
                package_001: {
                    firstAcquiredAt: 245897400
                }
            }
        };
        assert.isTrue(hasFoundPackage(state, "package_001"));
        assert.isFalse(hasFoundPackage(state, "someNonExistantPackage"));
    });
});


describe('hasVisitedMap', () => {
    it('knows if you have been to a certain map', () => {
        const state = {
            visitedMaps: {
                alphaCoffee: {
                    firstAcquiredAt: 245897359
                }
            }
        };
        assert.isTrue(hasVisitedMap(state, "alphaCoffee"));
        assert.isFalse(hasVisitedMap(state, "someNonExistantMap"));
    });
});

describe('doesHaveStoryPoint', () => {
    xit('uses hasVisitedMap to know if you have been to a certain map', () => {
        const state = {
            visitedMaps: {
                alphaCoffee: {
                    firstAcquiredAt: 245897359
                }
            }
        };
        assert.isTrue(doesHaveStoryPoint(state, "alphaCoffee"));
        assert.isFalse(hasVisitedMap(state, "someNonExistantMap"));
    });
});