import { getTeamTeammates, getSingleTeam, deleteSingleTeam } from './teamData';
import { getSingleTeammate, deleteTeammates } from './teammateData';

const viewTeammateDetails = (teammateFirebaseKey) => new Promise((resolve, reject) => {
  getSingleTeammate(teammateFirebaseKey)
    .then((teammateObject) => {
      getSingleTeam(teammateObject.team_id)
        .then((teamObject) => {
          resolve({ teamObject, ...teammateObject });
        });
    }).catch((error) => reject(error));
});

const viewTeamDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamFirebaseKey), getTeamTeammates(teamFirebaseKey)])
    .then(([teamObject, teamTeammatesArray]) => {
      resolve({ ...teamObject, teammates: teamTeammatesArray });
    }).catch((error) => reject(error));
});

const deleteTeamTeammates = (teamId) => new Promise((resolve, reject) => {
  getTeamTeammates(teamId).then((teammatesArray) => {
    console.warn(teammatesArray, 'Team teammates');
    const deleteTeammatesPromises = teammatesArray.map((teammates) => deleteTeammates(teammates.firebaseKey));

    Promise.all(deleteTeammatesPromises).then(() => {
      deleteSingleTeam(teamId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export {
  viewTeammateDetails,
  viewTeamDetails,
  deleteTeamTeammates,
};
