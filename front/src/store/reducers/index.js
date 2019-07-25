const initialState = {
  companies: [],
  employees: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case "GET_ALL_COMPANIES":
      return {
        ...state,
        companies: action.payload,
      };

    case "DELETE_COMPANY":
      return {
        ...state,
        companies: action.payload
      }


    case "GET_ALL_EMPLOYEES":
      return {
        ...state,
        employees: action.payload,
      };


    case "DELETE_EMPLOYEE":
      return {
        ...state,
        employees: action.payload
      }

    default:
      return state;
  }
};


export default reducer;