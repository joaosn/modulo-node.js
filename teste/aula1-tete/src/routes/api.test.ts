import request from 'supertest';
import { sequelize } from '../instances/pg';
import { User,UserInstance } from '../models/User';
import app from '../app';

describe('itando rotas da Api',  () => {

    beforeAll( async () =>{
        await User.sync({force: true});
       
    });

    afterAll(() => {
        //depois de de todos ite
        sequelize.close()
    });

    let email = '2email@example.com';
    let password = '2password@example';

    it('Rota Ping Pong',(done)=>{
        request(app).get('/ping').then(res => {
           expect(res.body.pong).toBeTruthy();
           return done();
        })
    });

    it('Rota restritar novo usuario',(done)=>{
        request(app).post('/register').send({email,password}).then(res => {
            expect(res.body.error).toBeUndefined();
            expect(res.body.user).toHaveProperty('id');
            return done();
        })
    });

    it('Rota restritar novo usuario com memsmo email não deve deixar',(done)=>{
        request(app).post('/register').send({email,password}).then(res => {
                expect(res.body.error).not.toBeUndefined();
                return done();
        })
    });

    it('Rota restritar novo usuario sem senha',(done)=>{
        request(app).post('/register').send({password}).then(res => {
            expect(res.body.error).not.toBeUndefined();
            return done();
        })
    });

    it('Rota restritar novo usuario sem email',(done)=>{
        request(app).post('/register').send({email}).then(res => {
            expect(res.body.error).not.toBeUndefined();
            return done();
        })
    });

    it('Rota restritar novo usuario sem parametros',(done)=>{
        request(app).post('/register').send({}).then(res => {
            expect(res.body.error).not.toBeUndefined();
            return done();
        })
    });


    it('Rota login certo',(done)=>{
        request(app).post('/login').send({email,password}).then(res => {
            expect(res.body.error).toBeUndefined();
            expect(res.body.status).toBeTruthy();
            return done();
        })
    });

    it('Rota login errado',(done)=>{
        request(app).post('/login').send({email,password}).then(res => {
            expect(res.body.error).toBeUndefined();
            expect(res.body.status).toBeFalsy();
            return done();
        })
    });

    it('Rota listagem',(done)=>{
        request(app).post('/list').then(res => {
            expect(res.body.error).toBeUndefined();
            expect(res.body.list.length).toBeGreaterThanOrEqual(1);
            expect(res.body.list).toContain(email);
            return done();
        })
    });

});