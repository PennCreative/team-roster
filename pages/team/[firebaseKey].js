import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { viewTeamDetails } from '../../api/mergedData';
import TeammateCard from '../../components/TeammateCard';

export default function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewTeamDetails(firebaseKey).then(setTeamDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap flex-column">
      <div className="text-white ms-5 details">
        <Link href="/teammate/new" passHref>
          <Button>Add A Teammate</Button>
        </Link>
        <h5>
          {teamDetails.city} {teamDetails.name}
        </h5>
        <hr />
      </div>
      <div className="mt-5 d-flex flex-wrap">
        {teamDetails.teammates?.map((teammate) => (
          <TeammateCard key={teammate.firebaseKey} teammateObj={teammate} onUpdate={() => null} />
        ))}
      </div>
    </div>
  );
}
