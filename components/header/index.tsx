"use client";
import React, { useEffect, useState } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight, CircleUser, Users } from "lucide-react";
import Cookies from "js-cookie";
import { User } from "@/types";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    const cookie = Cookies.get("user");
    if (cookie) {
      try {
        const parsed = JSON.parse(cookie);
        setUserInfo(parsed);
      } catch (err) {
        console.error("Cookie parsing error", err);
      }
    }
  }, []);
  function path() {
    const paths = pathname.slice(2);
    let res = "";
    for (let i = 0; i < paths.length; i++) {
      if (paths[i] == "/") break;
      res += paths[i];
    }
    return res;
  }
  return (
    <div className="p-3 border-b border-foreground/40 w-full flex items-center justify-between bg-white text-black">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div>
          <div className="flex items-center gap-2 cursor-pointer  ">
            <Link href={"/"}>
              <p className="font-medium max-[500px]:text-sm max-[425px]:hidden t">
                Asosiy
              </p>
            </Link>
            <ChevronRight
              size={18}
              className={`${pathname == "/" && "hidden"} max-[425px]:hidden`}
            />
            <p onClick={() => router.back()} className="max-[500px]:text-sm">
              {pathname == "/"
                ? ""
                : pathname.slice(1, 2).toUpperCase() + path()}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">

        <div className="flex items-center  gap-2">
          <div className="flex flex-col items-end">
            <h1 className="max-[500px]:text-sm max-[342px]:hidden">
              {userInfo?.first_name} {userInfo?.last_name}
            </h1>
            {userInfo?.role && (
              <p className="flex items-center gap-1 text-sm max-[500px]:text-[12px] max-[342px]:hidden">
                <Users size={16} className="max-[500px]:text-sm" />
                {userInfo.role.slice(0, 1).toUpperCase() +
                  userInfo.role.slice(1)}
              </p>
            )}
          </div>
          {userInfo?.image ? (
  <Image
    width={40}
    height={40}
    src={userInfo.image}
    className="!size-10 rounded-full object-cover filter grayscale"
    alt="das"
  />
) : (
  <CircleUser size={35} className="text-black" />
)}

        </div>
      </div>
    </div>
  );
};

export default Header;
