import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      queryClient.setQueryData(["user"], user),
        toast.success("用户信息更新成功！");
    },
    onError: (err) => {
      console.log(err);
      toast.error("用户信息更新失败！");
    },
  });

  return { isUpdating, updateUser };
}
