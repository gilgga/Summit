const logUserIn = (user) => ({
  type: 'LOG_IN',
  payload: {
    id: user.id,
    email: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    description: user.description,
    topics: user.topics,
    courses: user.courses,
  }
});

const logUserOut = (id) => ({
  type: 'LOG_OUT',
  payload: {
    id: id
  }
});

module.exports = {
  logUserIn,
  logUserOut,
};