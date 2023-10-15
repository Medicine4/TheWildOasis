import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import { PropTypes } from "prop-types";

SortBy.propTypes = {
  options: PropTypes.array,
};

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("SortBy") || "";

  function handleChange(e) {
    searchParams.set("SortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      value={sortBy}
      type="white"
      onChange={handleChange}
    />
  );
}

export default SortBy;
