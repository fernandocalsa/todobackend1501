const { sumar } = require('../controllers/taskController')


describe("Ejemplos", () => {
    it("debería devolver el resultado correcto de la suma", () => {
        const res = sumar(3, 5)
        expect(res).toBe(8);
    });
});