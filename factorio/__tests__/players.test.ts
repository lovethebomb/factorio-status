const players = require('../players.ts');

describe('Factorio/Players/Parse', () => {
    const testData = "Players (2)\nlovethebomb (online)\nLow3nd";
    const parsedPlayers = players.parsePlayers(testData);

    test('should have 1 online player', () => {
        expect(parsedPlayers.onlineCount).toBe(1);
    });
    
    test('should have 2 total players', () => {
        expect(parsedPlayers.totalCount).toBe(2);
    });

    test('should have correct players array', () => {
        expect(parsedPlayers.players).toEqual([ "lovethebomb (online)", "Low3nd"]);
    });
})