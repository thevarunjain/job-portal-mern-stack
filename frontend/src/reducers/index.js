import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";


const rootReducer = combineReducers({
  //reducer: mainreducer,
  form: formReducer
});

export default rootReducer;
