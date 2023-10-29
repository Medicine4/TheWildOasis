import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, tel)",
      { count: "exact" }
    );

  // 1) FILTER
  if (filter !== null) query = query.eq(filter.field, filter.value);

  // 2） SORTBY
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  // 3) PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = page * PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.log(error);
    throw new Error("订单加载失败！");
  }

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("找不到订单！");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("订单加载失败！");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("订单加载失败！");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("订单加载失败！");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("订单更新失败！");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("订单删除失败！");
  }
  return data;
}

export async function createBooking(newBooking) {
  // 分割数据
  // const { guest, booking } = newBooking;

  // 1. 创建用户
  // 1.1 根据国家创建国旗图url
  // const countryCode = countryList.getCountry(guest.nationality)?.code;
  // const countryFlag = `https://flagcdn.com/${countryCode}.svg`;

  // // 1.2 上传guest
  // const { data: createdGuest, error: guestError } = await supabase
  //   .from("guests")
  //   .insert([{ ...guest, countryFlag }])
  //   .select();

  // if (guestError) {
  //   console.log(guestError);
  //   throw new Error("房客信息创建失败！");
  // }

  // 2. 获取新创建的用户id
  // const guestId = createdGuest.id;

  // 3. 用新创建的用户创建一个新的订单
  const { data, error } = await supabase
    .from("bookings")
    .insert([{ ...newBooking, status: "unconfirmed", idPaid: false }])
    .select();

  // 4. 如果新订单创建失败，则删除原房客信息
  if (error) {
    console.log(error);
    throw new Error("订单创建失败！");
  }

  return data;
}
