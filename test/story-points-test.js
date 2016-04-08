import {assert} from 'chai';
import {
    hasWonBattle,
    hasAcquiredBattleWinCount
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