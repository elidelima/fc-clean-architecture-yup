import { app, sequelize } from '../express';
import request from 'supertest';

describe('E2E test for product', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const { status, body } = await request(app)
      .post('/product')
      .send({ id: 'P1', name: 'Pincel', price: 100 });

    expect(status).toBe(200);
    expect(body.id).toBe('P1');
    expect(body.name).toBe('Pincel');
    expect(body.price).toBe(100);
  });

  it('should not create a product', async () => {
    const { status, body } = await request(app)
      .post('/product')
      .send({ id: 'P1' });

    expect(status).toBe(500);
  });

  it('should list all products', async () => {
    const product1 = await request(app)
      .post('/product')
      .send({ id: 'P1', name: 'Pincel', price: 100 });
    expect(product1.status).toBe(200);

    const product2 = await request(app)
      .post('/product')
      .send({ id: 'P2', name: 'Tinta', price: 200 });
    expect(product2.status).toBe(200);

    const {status, body: { products }} = await request(app).get('/product').send();

    expect(status).toBe(200);
    expect(products.length).toBe(2);
    
    const p1 = products[0];
    expect(p1.id).toBe('P1');
    expect(p1.name).toBe('Pincel');
    expect(p1.price).toBe(100);

    const p2 = products[1];
    expect(p2.id).toBe('P2');
    expect(p2.name).toBe('Tinta');
    expect(p2.price).toBe(200);
  });
});
