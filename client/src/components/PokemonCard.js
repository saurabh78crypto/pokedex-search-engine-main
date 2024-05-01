import React, { useState } from 'react';
import { Card, ListGroup, Badge, ProgressBar, Tooltip, OverlayTrigger } from 'react-bootstrap';
import PokemonPopup from './PokemonPopup'

const PokemonCard = ({ pokemon }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleCardClick = (event) => {
    if (event.target.tagName === 'IMG') {
      setShowPopup(true);
    }
  };



  const stats = pokemon.stats? pokemon.stats.map(stat => (
    <ListGroup.Item key={stat.stat.name}>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id={`tooltip-${stat.stat.name}`}>{stat.stat.name}</Tooltip>}
      >
        <span>{stat.stat.name}: </span>
      </OverlayTrigger>
      <ProgressBar now={stat.base_stat} label={`${stat.base_stat}`} style={{ height: '20px', borderRadius: '10px', backgroundColor: '#f8f9fa', borderColor: '#ced4da' }} />
    </ListGroup.Item>
  )) : null;

  const imageSrc = pokemon.sprites && pokemon.sprites.front_default;

  const capitalizedPokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <Card className="mb-3 pokemon-card" onClick={handleCardClick}>
      <div className="pokemon-image-wrapper">
        <Card.Img variant="top" src={imageSrc} alt={pokemon.name} style={{ transition: 'transform 0.3s ease-in-out' }} />
      </div>
      <Card.Body style={{ overflowY: 'auto' }}>
        <Card.Title>{capitalizedPokemonName}</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item className="d-flex flex-wrap justify-content-start align-items-center">
            {pokemon.types && pokemon.types.map((type, index) => {
              const capitalizedTypeName = type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1);
              return (
                <Badge pill variant="success" className="mr-2 mb-2 mb-md-0 type-badge">
                  {capitalizedTypeName}
                </Badge>
              );
            })}
          </ListGroup.Item>
        </ListGroup>
        {showPopup && <PokemonPopup pokemon={pokemon} onClose={() => setShowPopup(false)} />}
      </Card.Body>
    </Card>
  );
};

export default PokemonCard;
