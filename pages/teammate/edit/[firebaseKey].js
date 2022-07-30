import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleTeammate } from '../../../api/teammateData';
import TeammateForm from '../../../components/forms/TeammateForm';

export default function EditTeammate() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeammate(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<TeammateForm obj={editItem} />);
}
