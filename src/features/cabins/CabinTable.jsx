import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useSearchParams } from "react-router-dom";
import { useGetNotEmptyCabin } from "./useGetEmptyCabin";

function CabinTable() {
  const { isLoading, error, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  const { data: notEmptyCabinId, isLoading: isLoading0 } =
    useGetNotEmptyCabin();

  if (isLoading || isLoading0) return <Spinner />;
  if (!cabins) return <Empty resource="房型" />;
  if (error) return alert("error!");

  // 1) Filter 过滤
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2) SortBy 排序
  const sortBy = searchParams.get("SortBy") || "startDate-desc";

  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  // 3) 排除所选日期内的非空cabin
  const notEmptyCabinIdArray = notEmptyCabinId.map((id) => id.cabinId);
  const emptyCabins = sortedCabins.filter(
    (cabin) => !notEmptyCabinIdArray.includes(cabin.id)
  );

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

      <Menus>
        <Table.Body
          data={emptyCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Menus>
    </Table>
  );
}

export default CabinTable;
