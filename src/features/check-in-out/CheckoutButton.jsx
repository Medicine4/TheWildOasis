import Button from "../../ui/Button";
import PropTypes from "prop-types";
import { useCheckout } from "../check-in-out/useCheckout";

CheckoutButton.propTypes = {
  bookingId: PropTypes.number,
};

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      办理退房
    </Button>
  );
}

export default CheckoutButton;
