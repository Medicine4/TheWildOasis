import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGuest as deleteGuestApi } from "../../services/apiGuests";
import toast from "react-hot-toast";

export function useDeleteGuest() {
  const queryClient = useQueryClient();

  const { mutate: deleteGuest, isLoading: isDeleting } = useMutation({
    mutationFn: deleteGuestApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["guests"],
      });
      toast.success("房客删除成功！");
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  return { deleteGuest, isDeleting };
}
