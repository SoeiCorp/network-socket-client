"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function revalidateChatrooms() {
  revalidateTag("chatrooms");
}
