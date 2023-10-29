import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import { signup as signupApi } from "../../services/apiAuth";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,

    onSuccess: () => {
      toast.success("用户创建成功！");
    },
    onError: (err) => {
      console.log(err);
      toast.error("用户创建失败😭");
    },
  });

  return { signup, isLoading };
}
