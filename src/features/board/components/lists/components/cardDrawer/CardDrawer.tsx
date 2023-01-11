import { forwardRef } from "react";

import type { DrawerHandle } from "@/components/drawer";
import type { CardQuery } from "../../hooks/__generated__/useViewCard.generated";

import { Drawer } from "@/components/drawer";
import { Actions } from "./components/actions";
import { Description } from "./components/description";
import { Status } from "./components/status";
import { Title } from "./components/title";

export type Card = CardQuery["card"];

type CardDrawerHanlde = {} & DrawerHandle;

type CardDrawerProps = { isLoading: boolean; card?: Card };

export const CardDrawer = forwardRef<CardDrawerHanlde, CardDrawerProps>(
  function CardDrawer(props, ref) {
    return (
      <Drawer title={<Title {...props} />} ref={ref}>
        <div className="flex h-full w-full flex-col overflow-auto md:flex-row">
          <div className="block w-full flex-col border-b p-6 md:flex md:w-[calc(100%-20rem)] md:overflow-auto md:border-r lg:w-[calc(100%-24rem)]">
            <Description {...props} />
          </div>
          <div className="flex w-full flex-col md:w-80 lg:w-96">
            <div className="flex h-fit w-full flex-col border-b p-6">
              <Status {...props} />
            </div>
            <Actions
              drawerRef={ref as React.RefObject<DrawerHandle>}
              {...props}
            />
          </div>
        </div>
      </Drawer>
    );
  },
);
