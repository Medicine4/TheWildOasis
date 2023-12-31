import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import toast from "react-hot-toast";

import { useUpdateUser } from "./useUpdateUser";
import { useUser } from "./useUser";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { user } = useUser();

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    if (user.email === "medicinee@qq.com") {
      toast.error("当前账户不支持修改密码，请重新创建用户使用此功能！");
      return;
    }

    updateUser(
      { password },
      {
        onSuccess: () => {
          reset({ password: "", passwordConfirm: "" });
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="新密码（最少8个字符）" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "必填",
            minLength: {
              value: 8,
              message: "最少8个字符",
            },
          })}
        />
      </FormRow>

      <FormRow label="确认密码" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "必填",
            validate: (value) =>
              getValues().password === value || "重复输入错误",
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" variation="secondary">
          取消
        </Button>
        <Button disabled={isUpdating}>更新密码</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
