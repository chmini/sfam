import { MdSportsSoccer, MdSportsBaseball, MdSportsBasketball, MdSportsTennis } from 'react-icons/md';
import { FaTableTennis, FaBowlingBall } from 'react-icons/fa';
import { GiShuttlecock } from 'react-icons/gi';

import * as S from './SportsIcon.styles';

interface Props {
  sportsCategory: string;
  size?: number;
}

interface Icons {
  [key: string]: JSX.Element;
}

const ICONS: Icons = {
  SOCCER: <MdSportsSoccer />,
  BASEBALL: <MdSportsBaseball />,
  BASKETBALL: <MdSportsBasketball />,
  TABLETENNIS: <FaTableTennis />,
  BOWLING: <FaBowlingBall />,
  BADMINTON: <GiShuttlecock />,
  TENNIS: <MdSportsTennis />,
};

const SportsIcon = ({ sportsCategory, size }: Props) => <S.Wrapper fontSize={size}>{ICONS[sportsCategory]}</S.Wrapper>;

export default SportsIcon;
