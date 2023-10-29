import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";
import countryList from "country-list";

export async function getGuests({ sortBy, page }) {
  let query = supabase.from("guests").select("*", { count: "exact" });

  // 1) SoryBy
  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  // 2) Pagination
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = page * PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.log(error);
    throw new Error("房客信息加载失败！");
  }

  return { data, count };
}

export async function deleteGuest(id) {
  const { data, error } = await supabase.from("guests").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("房客信息删除失败！");
  }

  return data;
}

export async function createGuest(newGuest) {
  // 1. 根据房客信息创建国旗url
  const countryCode = countryList.getCode(newGuest.nationality);
  const countryFlag = `https://flagcdn.com/${countryCode}.svg`;

  // 2. 上传guest
  const { data, error } = await supabase
    .from("guests")
    .insert([{ ...newGuest, countryFlag }])
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error("房客创建失败！");
  }

  return data;
}

export async function editGuest(newGuest, id) {
  // 1. 根据房客信息创建国旗url
  const countryCode = countryList.getCode(newGuest.nationality).toLowerCase();
  const countryFlag = `https://flagcdn.com/${countryCode}.svg`;

  // 2. 上传guest
  const { data, error } = await supabase
    .from("guests")
    .update([{ ...newGuest, countryFlag: countryFlag }])
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error("房客信息修改失败！");
  }

  return data;
}
