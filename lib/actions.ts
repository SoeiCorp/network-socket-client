"use server";

import { revalidateTag } from "next/cache";

export async function revalidateChatrooms() {
  console.log("revalidating...");
  revalidateTag("chatrooms");
}

export async function revalidateUsers() {
  console.log("revalidating...");
  revalidateTag("users");
}
