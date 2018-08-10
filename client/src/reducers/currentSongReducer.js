import {CURRENT_SONG} from '../actions/userActions'

const initialState=""
//reducer to store current played song
export default(state = initialState, action) => {
  switch (action.type) {

    case CURRENT_SONG:
      return {
        ...state,
        currentSong: action.payload.song,
        currentIndex:action.payload.index
      }
    default:
      return state;
  }
};
