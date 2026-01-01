"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { use, useState } from "react";
import { Button } from "./ui/button";
import { Authenticated, Unauthenticated } from "convex/react";
import { BarLoader } from "react-spinners";
import { useStoreUser } from "@/hooks/use-store-user";
import { Building, Plus, Ticket } from "lucide-react";
import OnboardingModal from "./onboarding-modal";
import { useOnboarding } from "@/hooks/use-onboarding";
import SearchLocationBar from "./search-location-bar";

const Header = () => {
  const { isLoading } = useStoreUser();

  const { showUpgradeModal, setshowUpgradeModal } = useState(false);

    const { showOnboarding, handleOnboardingComplete, handleOnboardingSkip } =
    useOnboarding();
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
          <div className="hidden md:flex flex-1 justify-center">
            <SearchLocationBar />
          </div>
          {/*Right side action */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setshowUpgradeModal(true)}
            >
              Pricing
            </Button>

            <Button variant="ghost" size="sm" asChild className={"mr-2"}>
              <Link href="/explore">Explore</Link>
            </Button>
            <Authenticated>
              {/*create event button  */}
              <Button size="sm" asChild className="flex gap-2 mr-4">
                <Link href="/create-event">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Create Event</span>
                </Link>
              </Button>

              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="My Tickets"
                    labelIcon={<Ticket size={16} />}
                    href="/my-tickets"
                  />
                  <UserButton.Link
                    label="My Events"
                    labelIcon={<Building size={16} />}
                    href="/my-events"
                  />
                  <UserButton.Action label="manageAccount" />
                </UserButton.MenuItems>
              </UserButton>
            </Authenticated>

            <Unauthenticated>
              <SignInButton mode="modal">
                <Button size="sm">Sign In</Button>
              </SignInButton>

            </Unauthenticated>

          </div>
        </div>

        {/*Search location  -for mobile*/}
        <div className="md:hidden border-t px-3 py-3">
            <SearchLocationBar />
          </div>
    
        {/*Loader */}
        {isLoading && (
          <div className="absolute bottom-0 left-0 w-full">
            <BarLoader width={"100%"} color="#FFB500" />
          </div>
        )}
      </nav>

      {/*Modals  */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={handleOnboardingSkip}
        onComplete={handleOnboardingComplete}
      />


    </>
  );
};

export default Header;
