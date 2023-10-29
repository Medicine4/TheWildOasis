import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editGuest as editGuestApi } from "../../services/apiGuests";
import toast from "react-hot-toast";

export function useEditGuest() {
  const queryClient = useQueryClient();

  const { mutate: editGuest, isLoading: isEditing } = useMutation({
    mutationFn: ({ newGuest, id }) => editGuestApi(newGuest, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["guests"],
      });
      toast.success("房客信息修改成功！");
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  return { editGuest, isEditing };
}
