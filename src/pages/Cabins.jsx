import CabinTable from "../features/cabins/CabinTable.jsx";
import Heading from "../ui/Heading.jsx";
import Row from "../ui/Row";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p> Fliter / Sort </p>
      </Row>

      <Row>
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
