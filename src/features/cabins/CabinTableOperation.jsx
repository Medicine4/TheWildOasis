import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperation() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "全部" },
          { value: "no-discount", label: "没有折扣" },
          { value: "with-discount", label: "有折扣" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperation;
