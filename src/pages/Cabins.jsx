import { useEffect } from "react";
import Heading from "../ui/Heading.jsx";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins.js";

function Cabins() {
  useEffect(function () {
    getCabins().then((data) => console.log(data));
  }, []);

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
    </Row>
  );
}

export default Cabins;
