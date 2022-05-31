
import { pg } from '../instances/pg';

export interface UserInstance {
    id: number;
    email: string;
    password: string;
}

export const User =  {
   
    selectAll: async function(){
        const users: UserInstance[] = await pg.query('select * from auths.users', { type: QueryTypes.SELECT });
        return (users.length > 0) ? users : false;
    },
    findEmail: async function(email:string):Promise<boolean> {
        const users = await pg.query('select * from auths.users where email = :email', { 
            type: QueryTypes.SELECT,
            replacements: { email: email}
        });
        return (users.length>0)?true:false;
    },
    create: async function (email:string,password:string):Promise<object> {
        console.log(email,password);
        
        const users = await pg.query(`INSERT INTO auths.users email,password VALUES :email,:password returning id`, 
        { 
            type: QueryTypes.INSERT,
            replacements: { 
                email:email,
                password:password
            }
        });
        return users;
    }

};