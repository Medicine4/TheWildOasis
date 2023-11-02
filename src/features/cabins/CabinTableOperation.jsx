import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";
import TimeSelect from "../../ui/TimeSelect";

function CabinTableOperation() {
  return (
    <TableOperations>
      <TimeSelect />
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "全部" },
          { value: "no-discount", label: "没有折扣" },
          { value: "with-discount", label: "有折扣" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "按名称排序(A-Z)" },
          { value: "name-desc", label: "按名称排序(Z-A)" },
          { value: "regularPrice-asc", label: "按价格升序" },
          { value: "regularPrice-desc", label: "按价格降序" },
          { value: "maxCapacity-asc", label: "按容量升序" },
          { value: "maxCapacity-desc", label: "按容量降序" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperation;
