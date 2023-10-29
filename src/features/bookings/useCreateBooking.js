import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking as createBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  const { mutate: createBooking, isLoading: isCreating } = useMutation({
    mutationFn: createBookingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      toast.success("订单创建成功！");
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  return { isCreating, createBooking };
}
