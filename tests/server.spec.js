const app = require("../app");
const request = require("supertest");

const { cleanDatabase, feedDatabase, addSpecificTask } = require("./helpers");

beforeEach(async () => {
    await cleanDatabase();
    await feedDatabase();
})

afterEach(async () => {
    await cleanDatabase();
})

describe("GET /tasks", () => {
    it("should return all tasks", async () => {
        const res = await request(app).get("/tasks");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it("should return a specific task", async () => {
        const id = await addSpecificTask();
        const res = await request(app).get(`/tasks/${id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('Prueba de los tests extra en el POST suelto');
    });
});

const newTaskToAdd = {
    name: 'Prueba de los tests extra en el POST suelto',
    status: 'PENDING'
}

describe("POST /tasks", () => {
    it("should add one specific task", async () => {
        const res = await request(app).post("/tasks").send(newTaskToAdd);
        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBeDefined();
    })

    it("should return an error when task to be added is undefined", async () => {
        const res = await request(app).post("/tasks").send({});
        expect(res.statusCode).toBe(400);
    })
})

describe("DELETE /tasks", () => {
    it("should delete one specific task", async () => {
        const id = await addSpecificTask();
        const res = await request(app).delete(`/tasks/${id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.msg).toBe('ok');

        const res2 = await request(app).get(`/tasks/${id}`);
        console.log('esta es la segunda respuesta', res2.body);
        expect(res2.statusCode).toBe(200);
        expect(res2.body.status).toBe('DELETED');
    })
})

