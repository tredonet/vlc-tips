"use server";

import { redirect } from "next/navigation";
import { logout as _logout } from "../login/login";

export default async function logout() {
  await _logout();
  return redirect("/");
}
