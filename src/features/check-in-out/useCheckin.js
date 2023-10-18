import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
      }),
    onSuccess: (data) => {
      toast.success(`订单 ${data.id} 办理入住成功！`);
      queryClient.invalidateQueries({
        active: true,
      });
      navigate("/");
    },

    onError: (err, data) => {
      console.log(err.message);
      toast.error(`订单 ${data.id} 办理入住失败！`);
    },
  });

  return { checkin, isCheckingIn };
}
