// dans userReducer.js

import {
  FETCH_PROFILE_START,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  UPDATE_PROFILE_SUCCESS,
} from "../types";

const initialState = {
  profile: null,
  isLoading: false,
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROFILE_START:
      return { ...state, isLoading: true, error: null };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
        error: null,
      };
    case FETCH_PROFILE_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, profile: action.payload };
    default:
      return state;
  }
}
