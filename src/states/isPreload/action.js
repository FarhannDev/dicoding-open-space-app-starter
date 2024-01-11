/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/**
 * @TODO: Define all the actions (creator) for the isPreLoad state
 */
import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = { SET_IS_PRELOAD: 'SET_IS_PRELOAD' };

const setIsPreloadActionCreator = (isPreload) => ({
  type: ActionType.SET_IS_PRELOAD,
  payload: {
    isPreload,
  },
});

const asyncPreloadProcess = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    // preload process
    const authUser = await api.getOwnProfile();
    dispatch(setAuthUserActionCreator(authUser));
  } catch (error) {
    // fallback process
    dispatch(setAuthUserActionCreator(null));
  } finally {
    // end preload process
    dispatch(setIsPreloadActionCreator(false));
  }

  dispatch(hideLoading());
};

export { ActionType, setIsPreloadActionCreator, asyncPreloadProcess };
