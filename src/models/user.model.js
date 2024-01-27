import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    contraseña: {
        type: String,
        required: true,
    }
}, {timestamps: true});

export default mongoose.model('Usuario', usuarioSchema);