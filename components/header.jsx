"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { use } from "react";
import { Button } from "./ui/button";
import { Authenticated, Unauthenticated } from "convex/react";
import { BarLoader } from "react-spinners";
import { useStoreUser } from "@/hooks/use-store-user";

const Header = () => {

  const {isLoading} =useStoreUser()
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-xl z-20 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/*Logo */}
          <Link href={"/"} className="flex items-center">
            <Image
              src="/logo2.png"
              alt="Logo_orGenZer"
              width={500}
              height={500}
              className="w-full h-13"
              priority
            />

            {/*Pro Badge*/}
          </Link>

          {/*Search location  */}

          {/*Right side action */}
          <div className="flex items-center">
            <Authenticated>
              {/*create event button  */}
              <UserButton />
            </Authenticated>

            <Unauthenticated>
              <SignInButton mode="modal">
                <Button size="sm">Sign In</Button>
              </SignInButton>
            </Unauthenticated>
          </div>
        </div>

        {/*Search location  -for mobile*/}

        {/*Loader */}
        {isLoading &&( <div className="absolute bottom-0 left-0 w-full">
          <BarLoader width={"100%"} color="#FFB500"/>
        </div>
        )}
      </nav>

      {/*Modals  */}
    </>
  );
};

export default Header;
