import { combineReducers } from 'redux';
import importSlice from './import/importSlice';

const rootReducer = combineReducers({
    import: importSlice,
});

export default rootReducer;