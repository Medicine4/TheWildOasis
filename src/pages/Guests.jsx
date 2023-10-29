import AddGuest from "../features/guests/AddGuest.jsx";
import GuestTable from "../features/guests/GuestTable.jsx";
import GuestTableOperation from "../features/guests/GuestTableOperation.jsx";
import Heading from "../ui/Heading.jsx";
import Row from "../ui/Row";

function Guests() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">房客信息</Heading>
        <GuestTableOperation />
      </Row>

      <Row>
        <GuestTable />
        <AddGuest />
      </Row>
    </>
  );
}

export default Guests;
