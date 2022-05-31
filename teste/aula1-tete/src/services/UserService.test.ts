import { User,UserInstance } from '../models/User';
import { sequelize } from '../instances/pg';
import * as US from './UserService';

describe('UserService', () =>{

    beforeAll( async () =>{
        await User.sync({force: true});
    });

    afterAll(() => {
        //depois de de todos teste
        sequelize.close()
    });


        let email = 'email@example.com';
        let password = 'password@example';

        it('criando usuario', async () =>{
            const newUser = await US.CreateUser(email, password) as UserInstance;
            expect(newUser).not.toBeInstanceOf(Error);
            expect(newUser).toHaveProperty('id');
            expect(newUser.email).toBe(email);
        });

        it('criando usuario com mesmo Email', async () =>{
            const newUser = await US.CreateUser(email, password); 
            expect(newUser).toBeInstanceOf(Error);
        });

        it('busca Email', async () =>{
            const user = await US.findEmail(email) as UserInstance;
            expect(user.email).toBe(email);
        });

        it('verifica senha dando certo', async () =>{
            const user = await US.findEmail(email) as UserInstance;
            const check = US.machPassword(password,user.password);
            expect(check).toBeTruthy();
        });

        it('verifica senha dando errado', async () =>{
            const user = await US.findEmail(email) as UserInstance;
            const check = US.machPassword('dffasdfasd@3sgsf',user.password);
            expect(check).toBeFalsy();
        });
   
        it('busca lista', async () =>{
            const user = await US.all();
            expect(user.length).toBeGreaterThanOrEqual(1);
            for(let i in user) {
                expect(user[i]).toBeInstanceOf(User);
            }
        });

});