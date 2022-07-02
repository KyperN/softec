import { combineReducers } from 'redux';
import { studentReducer } from './studentReducer';
import { gradeReducer } from './gradeReducer';

export const rootReducer = combineReducers({
  student: studentReducer,
  grade: gradeReducer,
});
