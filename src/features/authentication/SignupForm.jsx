import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, handleSubmit, formState, reset, getValues } = useForm();
  const { errors } = formState;

  const { isLoading, signup } = useSignup();

  function onSubmit({ fullName, email, password }) {
    signup(
      {
        email,
        password,
        fullName,
      },
      {
        onSettled: () => reset(),
      }
    );
  }

  // function onError(error) {
  //   console.log(error);
  // }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="用户名" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", {
            required: "必填",
          })}
        />
      </FormRow>

      <FormRow label="电子邮箱" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "必填",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "请提供一个有效的电子邮箱地址",
            },
          })}
        />
      </FormRow>

      <FormRow label="密码（最少 8 个字符）" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "必填",
            minLength: {
              value: 8,
              message: "密码至少需要 8 个字符",
            },
          })}
        />
      </FormRow>

      <FormRow label="重复输入密码" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "必填",
            validate: (value) =>
              value === getValues().password || "重复输入有误",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={reset}
        >
          取消
        </Button>
        <Button disabled={isLoading}>创建新用户</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
