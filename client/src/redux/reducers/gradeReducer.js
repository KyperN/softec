const init = {
  year: '',
  quarter: '',
  lesson: '',
  grade: 0,
  studentId: '',
};

export const gradeReducer = (state = init, action) => {
  switch (action.type) {
    case 'YEAR_INPUT': {
      return { ...state, year: action.payload };
    }
    case 'QUARTER_INPUT': {
      return { ...state, quarter: action.payload };
    }
    case 'LESSON_INPUT': {
      return { ...state, lesson: action.payload };
    }
    case 'GRADE_INPUT': {
      return { ...state, grade: action.payload };
    }
    case 'STUDENT_ID_INPUT': {
      return { ...state, studentId: action.payload };
    }
    default: {
      return { ...state };
    }
  }
};
