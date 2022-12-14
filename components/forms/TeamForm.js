import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createTeam, updateTeam } from '../../api/teamData';

const initialState = {
  city: '',
  name: '',
  image: '',
};

function TeamForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateTeam(formInput)
        .then(() => router.push(`/team/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createTeam(payload).then(() => {
        router.push('/teams');
      });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Team</h2>

      <FloatingLabel controlId="floatingInput1" label="City Name" className="mb-3">
        <Form.Control type="text" placeholder="City Name" name="city" value={formInput.city} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Team Name" className="mb-3">
        <Form.Control type="text" placeholder="Team Name" name="name" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Logo" className="mb-3">
        <Form.Control type="url" placeholder="Logo" name="image" value={formInput.image} onChange={handleChange} required />
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Team</Button>
    </Form>
  );
}
TeamForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    city: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }),
};

TeamForm.defaultProps = {
  obj: initialState,
};

export default TeamForm;
