import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { useTodayActivity } from "./useTodayActivity";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity() {
  const { isLoading, todayActivities } = useTodayActivity();

  if (isLoading) return <Spinner />;

  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">今日订单</Heading>
      </Row>
      {todayActivities.length === 0 ? (
        <NoActivity>今天没订单...放假咯</NoActivity>
      ) : (
        <TodayList>
          {todayActivities.map((act) => (
            <TodayItem activity={act} key={act.id} />
          ))}
        </TodayList>
      )}
    </StyledToday>
  );
}

export default TodayActivity;
