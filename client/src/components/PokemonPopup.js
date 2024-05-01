import React from 'react';
import { Modal, Button, Row, Col, Container, Badge } from 'react-bootstrap';


const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const PokemonPopup = ({ pokemon, onClose }) => {
  return (
    <Modal show={true} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{capitalizeFirstLetter(pokemon.name)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="p-4">
          <Row className="mb-4">
            <Col md={6}>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} style={{ width: '100%', height: 'auto' }} />
            </Col>
            <Col md={6}>
              <div className="pokemon-details bg-info p-4 rounded">
                <div className="d-flex justify-content-between mb-2">
                  <div>
                    <p><strong>Height </strong> </p>
                    <p>{pokemon.height} ft</p>
                  </div>
                  <div>
                    <p><strong>Weight </strong> </p>
                    <p>{pokemon.weight} lbs</p>
                  </div>
                </div>
                
                <div className="d-flex justify-content-between mb-2">
                  <div>
                    <p><strong>Abilities </strong></p>
                    <p>{pokemon.abilities && pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={6} >
              <h5>Stats</h5>
              {pokemon.stats && pokemon.stats.map(stat => (
                <div key={stat.stat.name} className="stat-container mb-2">
                  <div className="stat-bar" style={{ height: '20px', backgroundColor: '#007bff', width: `${stat.base_stat}%` }}></div>
                  <p className="stat-label">{capitalizeFirstLetter(stat.stat.name)}</p>
                </div>
              ))}
            </Col>
            <Col md={6}>
              <h5>Type</h5>
              {pokemon.types && pokemon.types.map((type, index) => (
                <Badge key={index} className="me-2" bg="primary">{type.type.name}</Badge>
              ))}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PokemonPopup;
