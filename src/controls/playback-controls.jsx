import React, { useCallback } from 'react';
import { PlayArrow, Stop } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '../button/icon-button';
import CircularLoadingIndicator from '../loading/circular-loading-indicator';
import selectPlaybackStatus from '../playback/select-playback-status';
import userStoppedPlayback from '../playback/user-stopped-playback';
import userPlayedPiece from '../playback/user-played-piece';
import TimerControl from '../timer/timer-control';
import ShuffleControl from '../queue/shuffle-control';
import LoopControl from '../queue/loop-control';
import PreviousControl from '../queue/previous-control';
import NextControl from '../queue/next-control';
import useHotkey from '../app/use-hotkey';
import selectQueue from '../queue/select-queue';
import styles from './playback-controls.module.scss';

const PlaybackControls = () => {
  const dispatch = useDispatch();
  const playbackStatus = useSelector(selectPlaybackStatus);
  const { index, pieceIds: queuedPieceIds } = useSelector(selectQueue);

  const handlePlayClick = useCallback(() => {
    dispatch(userPlayedPiece({ index, selectionPieceIds: queuedPieceIds }));
  }, [dispatch]);

  const handleStopClick = useCallback(() => {
    dispatch(userStoppedPlayback());
  }, [dispatch]);

  const isLoading = playbackStatus === 'loading';
  const isPlaying = playbackStatus === 'playing';

  useHotkey(' ', isPlaying ? handleStopClick : handlePlayClick);
  return (
    <div className={styles['playback-controls']}>
      <TimerControl />
      <ShuffleControl />
      <LoopControl />
      <PreviousControl />
      {isLoading ? (
        <CircularLoadingIndicator />
      ) : (
        <IconButton>
          {isPlaying ? (
            <Stop
              className={styles['icon--primary']}
              onClick={handleStopClick}
            />
          ) : (
            <PlayArrow
              className={styles['icon--primary']}
              onClick={handlePlayClick}
            />
          )}
        </IconButton>
      )}
      <NextControl />
    </div>
  );
};

export default PlaybackControls;
