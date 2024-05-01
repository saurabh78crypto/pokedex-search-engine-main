import {getPokemon} from '../services/pokemonService.js';

export const searchPokemon = async (req, res) => {
    const { name } = req.params;
    let pokemonNames = [];

    if(name.includes(',')){
        pokemonNames = name.split(',');
    } else{
        pokemonNames.push(name);
    }

    try {
        const pokemonData = await Promise.all(pokemonNames.map(async (pokemonName) => {
            try {
                return await getPokemon(pokemonName.trim());
            } catch (error) {
                console.error(`Error fetching Pokemon data for ${pokemonName}:`, error);
                return null;
            }
        }));

        const successfulFetches = pokemonData.filter(data => data !== null);

        res.json(successfulFetches);
    } catch (error) {  
        console.error('Error in searchPokemon:', error); 
        if(error.message == 'Pokemon not found') {
            res.status(404).json({ error: 'Pokemon not found.' });
        } else {
            res.status(500).json({ error: 'Internal server error.' });
        }
    }
};

