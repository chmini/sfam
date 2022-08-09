import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { axiosAuthInstance } from '@api/axiosInstances';
import { Avatar } from '@components/Avatar';
import { Button } from '@components/Button';
import { Divider } from '@components/Divider';
import { MatchRecordChart } from '@components/MatchRecordChart';
import { Paragraph } from '@components/Paragraph';
import { ReviewGroup } from '@components/ReviewGroup';
import { SportsIcon } from '@components/SportsIcon';
import { TeamMember } from '@components/TeamMember';
import { SPORTS_TEXT } from '@constants/text';
import { Response } from '@interface/response';
import { TeamInfo } from '@interface/team';
import { userState } from '@recoil/atoms';
import { Anchor, B1, B3, ColWrapper, Container, GrayB3, InnerWrapper, Label, RowWrapper } from '@styles/common';

const TeamDetailPage: NextPage = () => {
  const router = useRouter();
  const user = useRecoilValue(userState);

  const [teamInfo, setTeamInfo] = React.useState<TeamInfo>({
    name: '',
    description: '',
    sportsCategory: '',
    leader: {},
    members: [],
    matchRecord: {
      win: 0,
      draw: 0,
      lose: 0,
    },
    matchReview: {
      bestCount: 0,
      likeCount: 0,
      dislikeCount: 0,
    },
  });
  const [isLeader, setIsLeader] = React.useState(false);

  React.useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;

    (async () => {
      const {
        data: { data },
      } = await axiosAuthInstance.get<Response<TeamInfo>>(`/api/teams/${id as string}`);

      setTeamInfo(() => data);
      if (data.leader.id === user.id) {
        setIsLeader(true);
      }
    })();
  }, [router.isReady]);

  return (
    <Container>
      <RowWrapper>
        <Avatar />
        <InnerWrapper
          flexDirection='column'
          justifyContent='center'
          margin='0px 16px'
        >
          <InnerWrapper>
            <B1>{teamInfo.name}</B1>
            <SportsIcon sportsCategory={teamInfo.sportsCategory} />
          </InnerWrapper>
          <GrayB3>{SPORTS_TEXT[teamInfo.sportsCategory]}</GrayB3>
          <B3>팀원 수: {teamInfo.members.length}명</B3>
        </InnerWrapper>
      </RowWrapper>
      <Divider />
      <Paragraph>{teamInfo.description}</Paragraph>
      <Divider />
      <ColWrapper>
        <Label>팀 후기</Label>
        <ReviewGroup
          bestCount={teamInfo.matchReview.bestCount}
          likeCount={teamInfo.matchReview.likeCount}
          dislikeCount={teamInfo.matchReview.dislikeCount}
        />
      </ColWrapper>
      <Divider />
      <ColWrapper>
        <Label>팀 전적</Label>
        <MatchRecordChart matchRecord={teamInfo.matchRecord} />
      </ColWrapper>
      <Divider />
      <ColWrapper>
        <RowWrapper>
          <InnerWrapper alignItems='center'>
            <Label>팀원 목록</Label>
            {isLeader && (
              <Link
                href={`/team/${router.query.id as string}/invitation`}
                passHref
              >
                <Anchor>
                  <Button
                    width='24px'
                    height='24px'
                    round
                  >
                    +
                  </Button>
                </Anchor>
              </Link>
            )}
          </InnerWrapper>
        </RowWrapper>
        <ColWrapper gap='16px'>
          {teamInfo.members.map((member) => (
            <div key={member.userId}>
              <TeamMember info={member} />
            </div>
          ))}
        </ColWrapper>
      </ColWrapper>
    </Container>
  );
};

export default TeamDetailPage;