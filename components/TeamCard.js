import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteTeamTeammates } from '../api/mergedData';

function TeamCard({ teamObj, onUpdate }) {
  const deleteThisAuthor = () => {
    if (window.confirm(`Delete ${teamObj.firebaseKey}?`)) {
      deleteTeamTeammates(teamObj.firebaseKey).then(() => onUpdate);
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={teamObj.image} alt={teamObj.name} style={{ height: '250px' }} />
      <Card.Body>
        <Card.Title>
          {teamObj.city} {teamObj.name}
        </Card.Title>
        <Link href={`/team/${teamObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">
            VIEW
          </Button>
        </Link>
        <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisAuthor} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    city: PropTypes.string,
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TeamCard;
