import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import GuestRow from "./GuestRow";
import { useGuests } from "./useGuests";

function GuestTable() {
  const { isLoading, guests, count } = useGuests();

  if (isLoading) return <Spinner />;

  return (
    <Table columns="1fr 2.5fr 2fr 2.5fr 1fr">
      <Table.Header>
        <div>ID</div>
        <div>姓名/FULLNAME</div>
        <div>电话/TEL</div>
        <div>国籍/Nationality</div>
      </Table.Header>

      <Menus>
        <Table.Body
          data={guests}
          render={(guest) => <GuestRow guest={guest} key={guest.id} />}
        />
      </Menus>

      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
}

export default GuestTable;
