import express from 'express';
import { searchPokemon } from '../controller/auth.controller.js'


const auth = express.Router();


auth.get('/pokemon/:name', searchPokemon)




export { auth }