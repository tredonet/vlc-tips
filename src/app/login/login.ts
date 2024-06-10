"use server";

import { connect } from "@/db";
import { User } from "@/models";
import { User as IUser } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { compareSync } from "bcryptjs";
import { encrypt } from "@/lib";

export async function login(prevState: any, formData: FormData) {
  await connect();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  if (!username || !password) return { message: "Login failed 11" };
  const user = (await User.findOne({ username })) as IUser;
  if (!user) return { message: "Login failed 1" };
  if (!compareSync(password, user.password))
    return { message: "Login failed 112" };
  const expires = new Date(Date.now() + 60 * 60 * 1000);
  const session = await encrypt({ user, admin: user.admin, expires });
  cookies().set("session", session, { expires, httpOnly: true });
  redirect("/manager");
}

export async function logout() {
  cookies().set("session", "", { maxAge: 0 });
  redirect("/");
}
