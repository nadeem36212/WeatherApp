export {getCitiesSuccess} from './weather';
import {cities} from './weather';
import {combineReducers} from 'redux';

export default combineReducers({
  cities: cities.reducer,
});
