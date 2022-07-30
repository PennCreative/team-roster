/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { viewTeammateDetails } from '../../api/mergedData';

export default function ViewTeammate() {
  const [teammateDetails, setTeammateDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewTeammateDetails(firebaseKey).then(setTeammateDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={teammateDetails.image} alt={teammateDetails.name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {teammateDetails.name}
        </h5>
        <h6>{teammateDetails.position} </h6>
        <h6>{teammateDetails.teamObject?.name}</h6>
        <hr />
        <Link href={`/team/${teammateDetails.teamObject?.firebaseKey}`} passHref>
          <Button variant="info" className="m-2">Checkout Team</Button>
        </Link>
      </div>
    </div>
  );
}
