import axios from "axios";
import {get as cacheGet, set as cacheSet} from '../cache/cacheManager.js'

export const getPokemon = async (name) => {
    const formattedName = name.toLowerCase().replace(/\s/g, '');

    const cachedData = cacheGet(formattedName);

    if(cachedData){
        return cachedData;
    }

    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${formattedName}`);
        const data = response.data;
        
        if(response.status === 404){
            throw new Error('Pokemon not found.');
        }
        
        cacheSet(formattedName, data);

        return data;
    } catch (error) {
        console.error(`Error fetching Pokemon data for ${name}:`, error);
        throw error;
    }
}


