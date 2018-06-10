const evolution = require('../evolution.ts');

describe('Factorio/Evolution/Parse', () => {
    const testData = "Evolution factor: 0.6161. (Time 28%) (Pollution 53%) (Spawner kills 19%)";
    const testFactor = "Evolution fact:";
    const testFactors = "Evolution factor: abc.";
    const testPercent = "42%";
    const testPercentDecimal = "42.5%";
    const parsedEvolution = evolution.parseEvolution(testData);

    test('should throw if missing factor', () => {
        expect(() => {
            evolution.parseEvolution("Evolution fact:")
        }).toThrowError('Evolution is missing factor.');
    });

    test('should throw if missing factors', () => {
        expect(() => {
            evolution.parseEvolution("Evolution factor: abc.")
        }).toThrowError('Evolution is missing time, pollution, and spawner kills.');
    });

    test('should have correct factor', () => {
        expect(parsedEvolution.factor).toBe(0.6161);
    });

    test('should have correct pollution', () => {
        expect(parsedEvolution.pollution).toBe(53/100);
    });

    test('should have correct pollution %', () => {
        expect(parsedEvolution.pollutionPercent).toBe(53);
    });
});