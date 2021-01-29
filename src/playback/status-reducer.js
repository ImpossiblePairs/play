import { USER_PLAYED_PIECE } from '@generative.fm/user';
import { PIECE_STARTED_PLAYING } from './piece-started-playing';
import { USER_STOPPED_PLAYBACK } from './user-stopped-playback';
import { TIMER_PROGRESSED } from '../timer/timer-progressed';
import { PIECE_PLAYBACK_FAILED } from './piece-playback-failed';

const statusReducer = (state = 'stopped', action) => {
  switch (action.type) {
    case USER_PLAYED_PIECE: {
      return 'loading';
    }
    case PIECE_STARTED_PLAYING: {
      return 'playing';
    }
    case PIECE_PLAYBACK_FAILED:
    case USER_STOPPED_PLAYBACK: {
      return 'stopped';
    }
    case TIMER_PROGRESSED: {
      if (action.payload.durationRemaining) {
        return state;
      }
      return 'stopped';
    }
  }

  return state;
};

export default statusReducer;
