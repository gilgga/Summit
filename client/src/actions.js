const logUserIn = (user) => ({
  type: 'LOG_IN',
  payload: {
    _id: user._id,
    email: user.email,
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
    _id: id
  }
});

module.exports = {
  logUserIn,
  logUserOut,
};