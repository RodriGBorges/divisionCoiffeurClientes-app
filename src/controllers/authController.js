import User from '../models/user.model.js'

export const register = async (req, res) => {
    const {email, contraseña, usuario } = req.body;
    
    try {
        const nuevoUsuario = new User({
            usuario,
            email,
            contraseña
        });
    
        const usuarioGuardado = await nuevoUsuario.save();
        res.json(usuarioGuardado);

    } catch (error) {
        console.log(error);
    }

}

export const login = (req, res) => {
    res.send('login');
}