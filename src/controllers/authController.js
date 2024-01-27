import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { crearTokenAcceso } from '../libs/jwt.js';

export const register = async (req, res) => {
    const {email, contraseña, usuario } = req.body;
    
    try {

        const contraseñaHash = await bcrypt.hashSync(contraseña, 12);
        const nuevoUsuario = new User({
            usuario,
            email,
            contraseña: contraseñaHash
        });
        
        const usuarioGuardado = await nuevoUsuario.save();
        const token = await crearTokenAcceso({id: usuarioGuardado._id})
        
        res.cookie('token', token);
        res.json({
            id:usuarioGuardado._id,
            usuario: usuarioGuardado.usuario,
            email: usuarioGuardado.email,
            createdAt: usuarioGuardado.createdAt,
            updatedAt: usuarioGuardado.updatedAt,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }

}

export const login = async (req, res) => {
        const {email, contraseña } = req.body;
        
        try {
            const usuarioEncontrado = await User.findOne({email});

            if(!usuarioEncontrado) {
                return res.status(400).json({ message: "Usuario no encontrado"})
            };

            const clavesIguales = await bcrypt.compareSync(contraseña, usuarioEncontrado.contraseña);

            if(!clavesIguales) {
                return res.status(400).json({ message: "Usuario o contraseña incorrecto"})
            }
            
            const token = await crearTokenAcceso({id: usuarioEncontrado._id})
            
            res.cookie('token', token);
            res.json({
                id:usuarioEncontrado._id,
                usuario: usuarioEncontrado.usuario,
                email: usuarioEncontrado.email,
                createdAt: usuarioEncontrado.createdAt,
                updatedAt: usuarioEncontrado.updatedAt,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
}

export const logout = (req, res) => {
    res.cookie('token', '', {
        expires: new Date(0)
    });
    return res.sendStatus(200);
}