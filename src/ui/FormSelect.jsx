import styled from "styled-components";
import PropTypes from "prop-types";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);

  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

FormSelect.propTypes = {
  options: PropTypes.array,
  value: PropTypes.string,
  register: PropTypes.func,
  name: PropTypes.string,
};

function FormSelect({ options, value, register, name }) {
  return (
    <StyledSelect defaultValue={value} {...register(name)}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} name={opt.value}>
          {opt.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default FormSelect;
