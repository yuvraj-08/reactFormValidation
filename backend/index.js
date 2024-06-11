import express, { request, response } from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import { registerForm } from "./model/registerFormModel.js";
import cors from 'cors';

const app = express();
     
//Middleware for using JSON in express
app.use(express.json());

app.get("/",(request,response)=>{
    console.log(request);
    return response.status(234).send("Welcome to MERN");
});

app.use(cors());
//ROute for saving a new book
app.post('/', async(request, response)=>{
    try{
        console.log("entered TRY BLOCK");
        if(
            !request.body.username ||
            !request.body.email ||
            !request.body.birthday ||
            !request.body.password ||
            !request.body.confirmPassword
        ){
            return response.status(400).send({
                message: "Send all required fields!",
            });
        }
        const newSubmission ={
            username: request.body.username,
            email: request.body.email,
            birthday: request.body.birthday,
            password: request.body.password,
            confirmPassword: request.body.confirmPassword
        };
        const submission = await registerForm.create(newSubmission);
        return response.status(201).send(submission);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log("App Connected to Database");
        app.listen(PORT, ()=>{
            console.log(`App is listening to port : ${PORT}`);
        });
        
    })
    .catch((error)=>{
        console.log(error);
    })