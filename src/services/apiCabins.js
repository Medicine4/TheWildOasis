import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded!");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasNewImage = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
  const imageUrl = hasNewImage
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
    throw new Error("Cabins could not be created!");
  }

  // 2. 将图片存入storage里面
  const { error: StorageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. 如果图片存储出错，那么取消本次cabin上传
  if (StorageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(StorageError);
    throw new Error(
      "Cabin image could not be uploaded and cabin was not created!"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be deleted!");
  }

  return data;
}
