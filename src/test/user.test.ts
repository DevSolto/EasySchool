import request from 'supertest';
import app from '../server';
import { cpf } from 'easy-cpf'
import { fakerPT_BR as faker } from '@faker-js/faker';

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

describe("POST /users", () => {
  it("Deve criar um usuário", async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        name: faker.person.fullName(),
        cpf: cpf.generate(),
        avatarUrl: "asdasfss",
        role: "STUDENT",
        password: faker.internet.password(),
      })
    expect(response.status).toBe(201)
  })
  it("Deve retornar um usuário", async () => {
    const response = await request(app.server)
      .get('/users/cm04gmd0g0000spvqt6w1j73m')
      .send()
    expect(response.status).toBe(200)
    console.log(response.body);
    
  })
})