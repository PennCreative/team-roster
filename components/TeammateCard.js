import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteTeammate } from '../api/teammateData';

function TeammateCard({ teammateObj, onUpdate }) {
  const deleteThisTeammate = () => {
    if (window.confirm(`Delete ${teammateObj.name}?`)) {
      deleteTeammate(teammateObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px', color: 'black ' }}>
      <Card.Img variant="top" src={teammateObj.image} alt={teammateObj.name} style={{ height: '250px' }} />
      <Card.Body>
        <Card.Title>{teammateObj.name}</Card.Title>
        <p className="card-text bold">{teammateObj.position}</p>
        <Link href={`/teammate/${teammateObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/teammate/edit/${teammateObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisTeammate} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}
TeammateCard.propTypes = {
  teammateObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    position: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TeammateCard;
