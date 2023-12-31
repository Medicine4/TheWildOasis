// import { getToday } from "../utils/helpers";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("房型信息加载失败！");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasHttpImage = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
  const imageUrl = hasHttpImage
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. 创建or修改table里面的cabin，image上传的是storage里面图片的url
  let query = supabase.from("cabins");

  // A) props不存在id == 创建cabin
  if (!id) query = query.insert([{ ...newCabin, image: imageUrl }]);

  // B) props存在id == 修改cabin
  if (id) query = query.update({ ...newCabin, image: imageUrl }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("新房型创建失败！");
  }

  if (hasHttpImage) return data;

  // 2. 将图片存入storage里面
  const { error: StorageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. 如果图片存储出错，那么取消本次cabin上传
  if (StorageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(StorageError);
    throw new Error("房型图片上传失败，且成功创建的新房型已被删除!");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("房型删除失败！");
  }

  return data;
}

export async function getNotEmptyCabin(startDate, endDate) {
  const { data, error: cabinIdError } = await supabase
    .from("bookings")
    .select("cabinId")
    .or(
      `and(startDate.gt.${startDate},startDate.lt.${endDate}),and(endDate.gt.${startDate},endDate.lt.${endDate}),and(startDate.eq.${startDate}),and(endDate.eq.${endDate}),and(startDate.lt.${startDate},endDate.gt.${endDate})`
    );

  if (cabinIdError) {
    console.log(cabinIdError);
  }

  return data;
}

// const { data, error } = await supabase
// .from("bookings")
// .select("*, guests(fullName, nationality, countryFlag)")
// .or(
//   `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
// )
// .order("created_at");
