import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import { useBookings } from "./useBookings";
// import { useSearchParams } from "react-router-dom";

function BookingTable() {
  const {
    bookings,
    //  count,
    isLoading,
  } = useBookings();
  // const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  // // 1)
  // const filterValue = searchParams.get("status") || "all";

  // let filteredBookings;
  // if (filterValue === "all") filteredBookings = bookings;
  // if (filterValue === "checked-out")
  //   filteredBookings = bookings.filter(
  //     (booking) => booking.status === "checked-out"
  //   );
  // if (filterValue === "checked-in")
  //   filteredBookings = bookings.filter(
  //     (booking) => booking.status === "checked-in"
  //   );
  // if (filterValue === "unconfirmed")
  //   filteredBookings = bookings.filter(
  //     (booking) => booking.status === "unconfirmed"
  //   );

  return (
    <Menus>
      <Table columns="1fr 1.6fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>房号/Cabin</div>
          <div>房客/guest</div>
          <div>入住时间/dates</div>
          <div>订单状态/status</div>
          <div>总价格/amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <span>Footer</span>
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
