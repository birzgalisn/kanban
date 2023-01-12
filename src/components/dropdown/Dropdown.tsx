import React from "react";

import { Menu } from "@headlessui/react";

export const Dropdown: React.FC<{
  button: React.ReactElement;
  children: React.ReactNode;
}> = ({ button, children }) => {
  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button
        as="div"
        className="flex w-full items-center focus:outline-none"
      >
        {button}
      </Menu.Button>
      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-lg border bg-white shadow-lg focus:outline-none">
        {children}
      </Menu.Items>
    </Menu>
  );
};
