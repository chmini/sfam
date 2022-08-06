import BestIcon from '@assets/icons/great.svg';
import LikeIcon from '@assets/icons/like.svg';
import DislikeIcon from '@assets/icons/dislike.svg';
import React from 'react';
import { ReviewButtonItem } from './ReviewButtonItem';
import * as S from './ReviewButtonGroup.styles';

interface Props {
  setReview: (value: string | ((prevVar: string) => string)) => void;
}

const ReviewButtonGroup = ({ setReview }: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setReview(e.currentTarget.id);
  };
  return (
    <S.Container>
      <ReviewButtonItem
        id='best'
        iconSrc={BestIcon}
        iconAlt='best'
        reviewText='최고에요'
        onClick={handleClick}
      />
      <ReviewButtonItem
        id='like'
        iconSrc={LikeIcon}
        iconAlt='like'
        reviewText='좋아요'
        onClick={handleClick}
      />
      <ReviewButtonItem
        id='dislike'
        iconSrc={DislikeIcon}
        iconAlt='dislike'
        reviewText='별로에요'
        onClick={handleClick}
      />
    </S.Container>
  );
};

export default ReviewButtonGroup;