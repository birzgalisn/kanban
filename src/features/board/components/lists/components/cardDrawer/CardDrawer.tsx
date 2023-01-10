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
        <div className="flex h-full w-full">
          <div className="flex h-full w-full flex-col border-r p-6">
            <Description {...props} />
          </div>
          <div className="flex w-full max-w-sm shrink-0 flex-col">
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
