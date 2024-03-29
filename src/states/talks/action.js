/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable indent */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
/**
 * @TODO: Define all the actions (creator) for the talks state
 */
import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  RECEIVE_TALKS: 'RECEIVE_TALKS',
  ADD_TALK: 'ADD_TALK',
  TOGGLE_LIKE_TALK: 'TOGGLE_LIKE_TALK',
};

const receiveTalksActionCreator = (talks) => ({
  type: ActionType.RECEIVE_TALKS,
  payload: {
    talks,
  },
});

const addTalkActionCreator = (talk) => ({
  type: ActionType.ADD_TALK,
  payload: {
    talk,
  },
});

const toggleLikeTalkActionCreator = ({ talkId, userId }) => ({
  type: ActionType.TOGGLE_LIKE_TALK,
  payload: {
    talkId,
    userId,
  },
});

const asyncAddTalk =
  ({ text, replyTo = '' }) =>
  async (dispatch) => {
    dispatch(showLoading());

    try {
      const talk = await api.createTalk({ text, replyTo });
      dispatch(addTalkActionCreator(talk));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };

const asyncToogleLikeTalk = (talkId) => async (dispatch, getState) => {
  const { authUser } = getState();
  dispatch(toggleLikeTalkActionCreator({ talkId, userId: authUser.id }));
  dispatch(showLoading());

  try {
    await api.toggleLikeTalk(talkId);
  } catch (error) {
    alert(error.message);
    dispatch(toggleLikeTalkActionCreator({ talkId, userId: authUser.id }));
  }
  dispatch(hideLoading());
};

export {
  ActionType,
  receiveTalksActionCreator,
  addTalkActionCreator,
  toggleLikeTalkActionCreator,
  asyncAddTalk,
  asyncToogleLikeTalk,
};
