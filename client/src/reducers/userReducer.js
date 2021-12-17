const initalState =
  {
    id: -1,
    email: '',
    firstName: '',
    lastName: '',
    description: '',
    topics: [],
    courses: [],
  };
  
const userReducer = (state = initalState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case 'LOG_IN':
        return {
            id: payload.id,
            email: payload.id,
            firstName: payload.firstName,
            lastName: payload.lastName,
            description: payload.description,
            topics: payload.topics,
            courses: payload.courses,
        }
      case 'LOG_OUT':
          return {
            id: -1,
            email: '',
            firstName: '',
            lastName: '',
            description: '',
            topics: [],
            courses: [],
          };
      default:
        return state;
    }
  };
  
export default userReducer;