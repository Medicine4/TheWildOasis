import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.object,
  onCloseModal: PropTypes.func,
};

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image: image }, id: editId },
        {
          onSuccess: () => {
            reset(), onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset(), onCloseModal?.();
          },
        }
      );
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="房号" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "必填",
          })}
        />
      </FormRow>

      <FormRow label="最大容量" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "必填",
            min: {
              value: 1,
              message: "人数必须大于等于1",
            },
          })}
        />
      </FormRow>

      <FormRow label="常规价格" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "必填",
            min: {
              value: 100,
              message: "价格必须大于等于100",
            },
          })}
        />
      </FormRow>

      <FormRow label="折扣" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "必填",
            validate: {
              positive: (value) => {
                value <= getValues("regularPrice") || "折扣必须小于等于价格";
              },
            },
          })}
        />
      </FormRow>

      <FormRow label="描述" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", {
            required: "必填",
          })}
        />
      </FormRow>

      <FormRow label="房型图片" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "必填",
          })}
        />
      </FormRow>

      <FormRow>
        <div>
          {/* type is an HTML attribute! */}
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

export default CreateCabinForm;
