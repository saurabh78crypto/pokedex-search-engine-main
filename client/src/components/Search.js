import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import PokemonCard from './PokemonCard';
import NavigationBar from './NavigationBar';

const Search = () => {
  const [name, setName] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nonExistentNames, setNonExistentNames] = useState([]);

  useEffect(() => {
    if (name.trim() === '' && pokemons.length > 0) {
      setPokemons([]);
    }
  }, [name, pokemons]);

  useEffect(() => {
    setError(null);
  }, [name]);

  const searchPokemon = async () => {
    setLoading(true);
    setError(null);
    setNonExistentNames([]);

    if (name.trim() === '') {
      setError('Name(s) is required.');
      setLoading(false);
      return;
    }

    if (!/^[a-zA-Z\s,]+$/.test(name)) {
      setError('Invalid input. Only text is allowed.');
      setLoading(false);
      return;
    }

    const names = name.split(',').map(name => name.trim()).filter(name => name);
    if (names.length > 1 && names.some((name, index) => name.includes(',') && index < names.length -1)) {
      setError('Please separate the name with a comma.');
      setLoading(false);
      return;
    }

    try {
      const formattedNames = names.map(name => name.toLowerCase().replace(/\s/g, ''));
      const responses = await Promise.all(formattedNames.map(async (formattedName) => {
        try {
          const response = await axios.get(`http://localhost:5000/api/auth/pokemon/${formattedName}`);
          return response.data;  
        } catch (error) {
          console.error(`Failed to fetch data for ${formattedName}`, error);
          return null;
        }
      }));

      const hasEmptyResponse = responses.some(response => Array.isArray(response) && response.length === 0);

      if(hasEmptyResponse) {
        const specificName = formattedNames[responses.indexOf(responses.find(response => Array.isArray(response) && response.length === 0))];
        setError(`The Pokemon ${specificName} is not present.`)
      } else{
        
        const validResponses = responses.filter(response => response!== null);
        setPokemons(validResponses);
      }

    } catch (error) {
      console.error('Error fetching Pokemon data', error);
      setError('Failed to fetch Pokemon data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavigationBar />
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6} className='text-center'>
            <h2 className="text-center">Search Engine for a Pokemon</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter a Pokemon name(s) separated by a comma"
              className="form-control mb-3 search-input"
              style={{ paddingRight: '30px' }}
            />
            <button onClick={searchPokemon} className="btn btn-primary w-100 search-button">Search</button>
            {loading && (
              <Spinner animation="border" role="status" className="mt-3">
                <span className="visually-hidden">Loading Pokemon data...</span>
              </Spinner>
            )}
            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
            {nonExistentNames.length > 0 && (
              <Alert variant='warning' className='mt-3'>
                {nonExistentNames.map(name => `The Pokemon ${name} is not present.`).join(' ')};
              </Alert>
            )}
          </Col>
        </Row>
        <Row className='pokemonGrid smooth-scroll'>   
          {pokemons.map((pokemon, index) => (
            <Col md={3} key={pokemon.id || index}>
              <PokemonCard pokemon={pokemon[0]} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Search;
