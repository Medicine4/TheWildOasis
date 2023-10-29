import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function GuestTableOperation() {
  return (
    <TableOperations>
      <SortBy
        options={[
          { value: "fullName-asc", label: "按照姓名首字母(A-Z)" },
          { value: "fullName-desc", label: "按照姓名首字母(Z-A)" },
          { value: "nationality-asc", label: "按照国籍首字母(A-Z)" },
          { value: "nationality-desc", label: "按照国籍首字母(Z-A)" },
        ]}
      />
    </TableOperations>
  );
}

export default GuestTableOperation;
