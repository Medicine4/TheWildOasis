import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "全部" },
          { value: "checked-out", label: "已退房" },
          { value: "checked-in", label: "已入住" },
          { value: "unconfirmed", label: "未确认" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "按照入住时间（晚-早）" },
          { value: "startDate-asc", label: "按照入住时间（早-晚）" },
          {
            value: "totalPrice-desc",
            label: "按照总价格降序",
          },
          { value: "totalPrice-asc", label: "按照总价格升序" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
