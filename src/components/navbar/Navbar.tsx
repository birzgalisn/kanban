import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

import { ActiveLink } from "@/ui/activeLink";
import { Avatar } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { Logo } from "@/ui/logo";
import { Dropdown, DropdownGroup, DropdownItem } from "../dropdown";
import { AvatarSkeleton, TextSkeleton } from "../skeleton";
import { Divider } from "./components/Divider";

type Path = {
  title?: string;
  url?: string;
};

export const Navbar: React.FC<{ isLoading?: boolean; path?: Array<Path> }> = ({
  isLoading = true,
  path = [],
}) => {
  const { data: session } = useSession();
  const user = session?.user;
  const [project] = path;

  return (
    <nav className="flex w-screen flex-col border-b bg-white px-6">
      <div className="flex h-24 items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo noTitle width={21} height={21} href="/workspaces" />
          <div className="hidden items-center gap-4 xs:flex">
            <Divider />
            <Link className="flex items-center gap-2" href="/workspaces">
              {user ? (
                <>
                  <Avatar src={user?.image} alt={user?.name} size="w-7 h-7" />
                  <span className="max-w-[7rem] truncate font-medium">
                    {user?.name}
                  </span>
                </>
              ) : (
                <>
                  <AvatarSkeleton className="h-7 w-7" />
                  <TextSkeleton className="h-6 w-20" />
                </>
              )}
            </Link>
            {path &&
              path.map((p) => (
                <React.Fragment key={p.url}>
                  <Divider />
                  {!isLoading ? (
                    <Link
                      className="max-w-[7rem] truncate font-medium"
                      href={p.url!}
                    >
                      {p.title}
                    </Link>
                  ) : (
                    <TextSkeleton className="h-6 w-28" />
                  )}
                </React.Fragment>
              ))}
          </div>
        </div>
        <div className="z-10 flex items-center gap-4">
          <Dropdown
            button={
              <Avatar
                className="cursor-pointer"
                src={user?.image}
                alt={user?.name}
                size="w-7 h-7"
              />
            }
          >
            <DropdownGroup>
              <DropdownItem>
                <p className="truncate px-3 py-1">
                  Signed in as{" "}
                  <span className="font-semibold">{user?.name}</span>
                </p>
              </DropdownItem>
            </DropdownGroup>
            <DropdownGroup>
              <DropdownItem>
                <Link href="/workspaces">
                  <Button variant="transparent" size="xs" fluid left>
                    Overview
                  </Button>
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link href="/settings">
                  <Button variant="transparent" size="xs" fluid left>
                    Settings
                  </Button>
                </Link>
              </DropdownItem>
            </DropdownGroup>
            <DropdownGroup>
              <DropdownItem>
                <Button
                  variant="transparent"
                  size="xs"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  fluid
                  left
                >
                  Sign out
                </Button>
              </DropdownItem>
            </DropdownGroup>
          </Dropdown>
        </div>
      </div>
      <div className="relative -left-6 -mb-px flex h-9 w-[calc(100%+3rem)] overflow-hidden overflow-x-auto">
        <div className="flex first:pl-6 last:pr-6">
          {!project ? (
            <>
              <ActiveLink title="Overview" href="/workspaces" />
              <ActiveLink title="Settings" href="/settings" />
            </>
          ) : (
            <>
              <ActiveLink title="Project" href={`${project.url}`} />
              <ActiveLink title="Members" href={`${project.url}/members`} />
              <ActiveLink title="Settings" href={`${project.url}/settings`} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
