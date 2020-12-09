import React, { useState, useCallback, useRef, useLayoutEffect } from 'react';
import { byId } from '@generative-music/pieces-alex-bainter';
import { ChevronRight, ChevronLeft } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import IconButton from '../button/icon-button';
import Preview from '../piece/preview';
import useContentWidth from '../layout/use-content-width';
import userPlayedPiece from '../playback/user-played-piece';
import styles from './category.module.scss';

const Category = ({ title, pieceIds, getSubtitle }) => {
  const listRef = useRef(null);
  const contentWidth = useContentWidth();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const dispatch = useDispatch();

  const handlePreviousClick = useCallback(() => {
    const { width } = listRef.current.getBoundingClientRect();
    const currentPosition = Math.floor(listRef.current.scrollLeft / width);
    listRef.current.scroll((currentPosition - 1) * width, 0);
  }, []);

  const handleNextClick = useCallback(() => {
    const { width } = listRef.current.getBoundingClientRect();
    const currentPosition = Math.floor(listRef.current.scrollLeft / width);
    listRef.current.scroll((currentPosition + 1) * width, 0);
  }, []);

  const handleScroll = useCallback(() => {
    const { width } = listRef.current.getBoundingClientRect();
    setCanScrollLeft(listRef.current.scrollLeft > 0);
    setCanScrollRight(
      listRef.current.scrollLeft + width < listRef.current.scrollWidth
    );
  }, []);

  useLayoutEffect(() => {
    if (!listRef.current) {
      return;
    }
    const { width } = listRef.current.getBoundingClientRect();
    setCanScrollRight(
      listRef.current.scrollLeft + width < listRef.current.scrollWidth
    );
  }, []);

  const handlePiecePlay = useCallback(
    (pieceId) => {
      dispatch(
        userPlayedPiece({
          selectionPieceIds: pieceIds,
          index: pieceIds.indexOf(pieceId),
        })
      );
    },
    [dispatch, pieceIds]
  );

  if (pieceIds.length === 0) {
    return null;
  }

  return (
    <div className={styles.category}>
      <h1 className={styles['category__title']}>{title}</h1>
      <div className={styles['category__list']}>
        <div
          className={styles['category__list__button-container']}
          style={{
            visibility: canScrollLeft ? 'visible' : 'hidden',
          }}
        >
          <IconButton onClick={handlePreviousClick}>
            <ChevronLeft />
          </IconButton>
        </div>
        <div
          className={styles['category__list__pieces']}
          style={{ width: `calc(${contentWidth}px - 4rem)` }}
          ref={listRef}
          onScroll={handleScroll}
        >
          {pieceIds
            .filter((pieceId) => Boolean(byId[pieceId]))
            .map((pieceId) => (
              <Preview
                key={pieceId}
                pieceId={pieceId}
                width={`calc((${contentWidth}px - 4rem) / 6)`}
                getSubtitle={getSubtitle}
                onPlay={handlePiecePlay}
              />
            ))}
        </div>
        <div
          className={styles['category__list__button-container']}
          style={{
            visibility: canScrollRight ? 'visible' : 'hidden',
          }}
        >
          <IconButton onClick={handleNextClick}>
            <ChevronRight />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Category;
