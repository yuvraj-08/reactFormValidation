import mongoose from "mongoose";

const registerFormSchema = mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
        },
        birthday:{
            type: String,
            required: true,
        },
        password:{
            type: String,
            required: true,
        },
        confirmpassword:{
            type: String,
            required: false,
        }
    },
    {
        timestamps: true,
    }
);

export const registerForm = mongoose.model('registerForm', registerFormSchema);