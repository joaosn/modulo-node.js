import { User } from '../models/User';
import bcrypt from 'bcrypt';

export const CreateUser = async (email: string, password: string) => {
    let hasUser = await User.findOne({where: { email }});
    if(!hasUser) {
        let hash = bcrypt.hashSync(password,10);
        let newUser = await User.create({ email, password:hash });
        return newUser;
    } else {
        return new Error('E-mail já existe.')
    }
};

export const findEmail = async (email: string) => {
   return  await User.findOne({where: { email }});
};

export const machPassword = (passwordTEXT: string, encrypted: string) => {
   return bcrypt.compareSync(passwordTEXT, encrypted);
}


export const all = async () => {
   return await User.findAll();
} 