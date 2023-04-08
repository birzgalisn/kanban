import React from 'react';

import { Menu } from '@headlessui/react';

export const DropdownItem: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  return (
    <div className="px-1 py-1">
      <Menu.Item>{children}</Menu.Item>
    </div>
  );
};
