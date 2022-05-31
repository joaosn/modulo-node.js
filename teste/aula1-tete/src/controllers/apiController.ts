import { Request, Response } from 'express';
import * as US from '../services/UserService';

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const register = async (req: Request, res: Response) => {
   
    if(req.body.email && req.body.password) {
        let {email, password} = req.body;
        let newUser = await US.CreateUser(email, password);
        if(newUser instanceof Error){
            res.status(401).json({error:newUser.message});
            return;
        }
        res.status(201).json({user:newUser});
        return;
    }

    res.json({ error: 'E-mail e/ou senha não enviados.' });
}

export const login = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password) {
        let email: string = req.body.email;
        let password: string = req.body.password;

        let user = await US.findEmail(email);
        if(user && US.machPassword(password,user.password)) {    
            res.json({ status: true });
            return;
        }else{
            res.status(401).json({msg:'E-mial não Encontrado!'})
            return;
        }
    }
    res.json({ status: false });
}

export const list = async (req: Request, res: Response) => {
    let users = await US.all();
    let list: string[] = [];

    for(let i in users) {
        list.push( users[i].email );
    }

    res.json({ list });
}