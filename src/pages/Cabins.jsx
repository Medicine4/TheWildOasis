import AddCabin from "../features/cabins/AddCabin.jsx";
import CabinTable from "../features/cabins/CabinTable.jsx";
import CabinTableOperation from "../features/cabins/CabinTableOperation.jsx";
import Heading from "../ui/Heading.jsx";
import Row from "../ui/Row";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperation />
      </Row>

      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
