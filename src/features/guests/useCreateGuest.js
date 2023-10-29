import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGuest as createGuestApi } from "../../services/apiGuests";
import toast from "react-hot-toast";

export function useCreateGuest() {
  const queryClient = useQueryClient();

  const { mutate: createGuest, isLoading: isCreating } = useMutation({
    mutationFn: createGuestApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["guests"],
      });
      toast.success("房客信息添加成功！");
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  return { createGuest, isCreating };
}
