import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({ fullName, avatar, password }) {
  // 1. 更新fullName或者password
  let updateData;
  if (fullName) updateData = { data: { fullName } };
  if (password) updateData = { password };
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. 如果有选择更新头像，就上传头像到bucket
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: StorageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (StorageError) throw new Error(StorageError.message);

  // 3. 更新当前用户的头像信息
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);
  return updatedUser;

  // https://lousiukjohxxmqodtjxv.supabase.co/storage/v1/object/public/avatars/default-user.jpg
}
