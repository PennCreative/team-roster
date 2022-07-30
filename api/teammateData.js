import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getTeammates = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/teammates.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const deleteTeammate = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/teammates/${firebaseKey}.json`)
    .then(() => resolve(getTeammates))
    .catch(reject);
});

const getSingleTeammate = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/teammates/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const createTeammate = (teammateObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/teammates.json`, teammateObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/teammates/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const updateTeammate = (teammatesObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/teammates/${teammatesObj.firebaseKey}.json`, teammatesObj)
    .then(resolve)
    .catch(reject);
});

export {
  getTeammates,
  deleteTeammate,
  getSingleTeammate,
  createTeammate,
  updateTeammate,
};
