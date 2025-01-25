"use server";

import { User } from "@/models";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { compareSync } from "bcryptjs";
import { encrypt } from "@/lib";
import { UserService } from "@/database";

export async function login(prevState: any, formData: FormData) {
  const userService = new UserService();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  if (!username || !password) return { message: "Login failed 11" };
  const user = await userService.findOne({ username });
  if (!user) return { message: "Login failed 1" };
  if (!compareSync(password, user.password)) return { message: "Login failed 112" };
  const expires = new Date(Date.now() + 60 * 60 * 1000);
  const session = await encrypt({ user, admin: user.admin, expires });
  cookies().set("session", session, { expires, httpOnly: true });
  redirect("/manager");
}

export async function logout() {
  cookies().set("session", "", { maxAge: 0 });
  redirect("/");
}
