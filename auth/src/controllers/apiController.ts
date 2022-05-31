import { Request, Response } from 'express';
import { User } from '../models/User';

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const register = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password) {
        let { email, password } = req.body;
        console.log(email, password)
        let hasUser = await User.findEmail(email);
        if(hasUser) {
            console.log(email,password);return;
            let newUser = await User.create(email,password);
             console.log(newUser);
            res.status(201);
            //res.json({ id: newUser.id });
        } else {
            res.json({ error: 'E-mail já existe.' });
        }
    }

    res.json({ error: 'E-mail e/ou senha não enviados.' });
}

/*export const login = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password) {
        let email: string = req.body.email;
        let password: string = req.body.password;

        let user = await User.findOne({ 
            where: { email, password }
        });

        if(user) {
            res.json({ status: true });
            return;
        }
    }

    res.json({ status: false });
}*/

export const list = async (req: Request, res: Response) => {
    let users = await User.selectAll();
    let list: string[] = [];
    
    if(users){
        for(let i in users) {
            list.push( users[i].email);
        }
    }

    res.json({ list });
}