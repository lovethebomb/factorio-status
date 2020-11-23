const Factorio = require('../index.ts');

describe('Factorio/Players/Parse', () => {
    const testData = {
        host: "127.0.0.1",
        port: 12345,
        password: "hello-world",
        timeout: 50000
    };

     test('should throw if missing config', () => {
        expect(() => {
            new Factorio()
        }).toThrow();
    });
})