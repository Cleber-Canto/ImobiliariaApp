import request from 'supertest';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { createImovel, getAllImoveis, getImovelById, updateImovel, deleteImovel, getImoveisDisponiveis, getImoveisLocados, createImovelParaLocacao } from '../src/controllers/imovelController';
import { ImovelService } from '../src/services/imovelService';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.post('/imoveis', createImovel);
app.get('/imoveis', getAllImoveis);
app.get('/imoveis/:id', getImovelById);
app.put('/imoveis/:id', updateImovel);
app.delete('/imoveis/:id', deleteImovel);
app.get('/imoveis/disponiveis', getImoveisDisponiveis);
app.get('/imoveis/locados', getImoveisLocados);
app.post('/imoveis/locacao', createImovelParaLocacao);

const imovelService = new ImovelService();

describe('Imovel API', () => {
  let imovelId: string;

  beforeAll(async () => {
    await prisma.imovel.deleteMany();

    // Criando imóveis de teste
    await imovelService.createImovel({
      endereco: 'Rua Exemplo, 123',
      cep: '12345-678',
      valor: 1000.00,
      disponibilidade: true,
      alugado: false
    });

    await imovelService.createImovel({
      endereco: 'Rua Locacao, 456',
      cep: '12345-678',
      valor: 2000.00,
      disponibilidade: true,
      alugado: true
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Deve criar um novo imóvel', async () => {
    const response = await request(app)
      .post('/imoveis')
      .send({
        endereco: 'Rua Nova, 789',
        cep: '98765-432',
        valor: 1500.00,
        disponibilidade: true
      });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('id');
    imovelId = response.body.data.id;
  });

  it('Deve recuperar todos os imóveis', async () => {
    const response = await request(app).get('/imoveis');
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it('Deve recuperar um imóvel pelo ID', async () => {
    const response = await request(app).get(`/imoveis/${imovelId}`);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(imovelId);
  });

  it('Deve atualizar um imóvel', async () => {
    const response = await request(app)
      .put(`/imoveis/${imovelId}`)
      .send({
        endereco: 'Rua Alterada, 456',
        cep: '98765-432',
        valor: 1500.00,
        disponibilidade: false
      });

    expect(response.status).toBe(200);
    expect(response.body.data.endereco).toBe('Rua Alterada, 456');
  });

  it('Deve deletar um imóvel', async () => {
    const response = await request(app).delete(`/imoveis/${imovelId}`);
    expect(response.status).toBe(200);
  });

  it('Deve recuperar imóveis disponíveis', async () => {
    const response = await request(app).get('/imoveis/disponiveis');
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it('Deve recuperar imóveis locados', async () => {
    const response = await request(app).get('/imoveis/locados');
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it('Deve criar um imóvel para locação', async () => {
    const response = await request(app)
      .post('/imoveis/locacao')
      .send({
        endereco: 'Rua Locacao, 456',
        cep: '12345-678',
        valor: 2000.00,
        disponibilidade: true
      });

    expect(response.status).toBe(200);
    expect(response.body.data.alugado).toBe(true);
  });
});
