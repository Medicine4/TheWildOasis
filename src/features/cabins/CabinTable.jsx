import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";

function CabinTable() {
  const { isLoading, error, cabins } = useCabins();

  if (isLoading) return <Spinner />;
  if (error) return alert("error!");

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>房号/Cabin</div>
        <div>容量/Capacity</div>
        <div>价格/Price</div>
        <div>折扣/Discount</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={cabins}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  );
}

export default CabinTable;
