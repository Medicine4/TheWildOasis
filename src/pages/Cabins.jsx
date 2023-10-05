import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable.jsx";
import Heading from "../ui/Heading.jsx";
import Row from "../ui/Row";
import Button from "../ui/Button.jsx";
import CreateCabinForm from "../features/cabins/CreateCabinForm.jsx";

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p> Fliter / Sort </p>
      </Row>

      <Row>
        <CabinTable />

        <Button onClick={() => setShowForm((show) => !show)}>
          添加一个新房型
        </Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
