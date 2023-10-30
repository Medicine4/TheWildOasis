import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import { getNames } from "country-list";

import { useCreateGuest } from "./useCreateGuest";
import { useEditGuest } from "./useEditGuest";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import styled from "styled-components";

const Select = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);

  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

CreateGuestForm.propTypes = {
  guestToedit: PropTypes.object,
  onCloseModal: PropTypes.func,
};

function CreateGuestForm({ guestToedit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = guestToedit;
  const isEditSession = Boolean(editId);
  //   const option = useMemo(() => countryList().getData(), []);
  const counrties = getNames().map((name) => {
    return { value: name, label: name };
  });

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isCreating, createGuest } = useCreateGuest();
  const { isEditing, editGuest } = useEditGuest();

  const isWorking = isEditing || isCreating;

  function onSubmit(data) {
    if (isEditSession) {
      editGuest(
        { newGuest: { ...data }, id: editId },
        {
          onSuccess: () => {
            reset(), onCloseModal?.();
          },
        }
      );
      console.log(data);
    } else {
      createGuest(
        { ...data },
        {
          onSuccess: () => {
            reset(), onCloseModal?.();
          },
        }
      );
    }
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="姓名" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isWorking}
          {...register("fullName", {
            required: "必填",
          })}
        />
      </FormRow>

      <FormRow label="电话" error={errors?.tel?.message}>
        <Input
          type="text"
          id="tel"
          disabled={isWorking}
          {...register("tel", {
            required: "必填",
          })}
        />
      </FormRow>

      <FormRow label="国籍" error={errors?.nationality?.message}>
        <Select
          id="nationality"
          disabled={isWorking}
          defaultValue={editValues.nationality}
          {...register("nationality")}
        >
          {counrties.map((cou) => (
            <option
              key={cou.value}
              value={cou.value}
              name={cou.value}
              // selected={editValues.nationality === cou.value}
            >
              {cou.label}
            </option>
          ))}
        </Select>
      </FormRow>

      <FormRow label="身份证号" error={errors?.nationalID?.message}>
        <Input
          type="text"
          id="nationalID"
          disabled={isWorking}
          {...register("nationalID", {
            required: "必填",
          })}
        />
      </FormRow>

      <FormRow>
        <div>
          <Button
            variation="secondary"
            type="reset"
            onClick={() => onCloseModal?.()} // 细节
          >
            取消
          </Button>
          <Button disabled={isWorking}>
            {isEditSession ? "编辑" : "创建"}
          </Button>
        </div>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
