const serverUrl = process.env.SERVER_URL;

const routes = {
  updateDisplayPicture: `${serverUrl}/api/users/update/displayPicture`,
  updateProfile: `${serverUrl}/api/users/update/profile`,
};

export default routes;
