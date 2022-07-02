const init = {
  name: '',
  dateOfBirth: '',
  mainClass: '',
};

export const studentReducer = (state = init, action) => {
  switch (action.type) {
    case 'NAME_INPUT': {
      return { ...state, name: action.payload };
    }
    case 'DATE_OF_BIRTH': {
      return { ...state, dateOfBirth: action.payload };
    }
    case 'CLASS_INPUT': {
      return { ...state, mainClass: action.payload.toLowerCase() };
    }

    default: {
      return { ...state };
    }
  }
};
