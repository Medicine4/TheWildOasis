import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useEffect, useState } from "react";
import { useCheckin } from "./useCheckin";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { booking, isLoading } = useBooking();
  const { isCheckingIn, checkin } = useCheckin();
  const moveBack = useMoveBack();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  const {
    id: bookingId,
    guests,
    totalPrice,
    // numGuests,
    // hasBreakfast,
    // numNights,
  } = booking;

  if (isLoading || isCheckingIn) return <Spinner />;

  function handleCheckin() {
    if (!confirmPaid) return;
    checkin(bookingId);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">办理入住 #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; 返回</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
          id="confirm"
          disabled={confirmPaid}
        >
          确认 <strong>{guests.fullName}</strong> 已支付{" "}
          {formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid} onClick={handleCheckin}>
          #{bookingId} 办理入住
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          返回
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
