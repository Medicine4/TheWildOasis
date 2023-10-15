import PropTypes from "prop-types";

Empty.propTypes = {
  resource: PropTypes.string,
};

function Empty({ resource }) {
  return <p>暂无{resource}数据.</p>;
}

export default Empty;
