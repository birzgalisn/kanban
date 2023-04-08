import { gql, useLazyQuery } from '@apollo/client';
import { useRef } from 'react';

import type { DrawerHandle } from '@/components/drawer';
import type { CardQuery, CardQueryVariables } from './__generated__/useViewCard.generated';

export const GET_CARD = gql`
  query Card($id: String!) {
    card(id: $id) {
      id
      title
      description
    }
  }
`;

export type UseViewCardProps = CardQueryVariables;

export function useViewCard() {
  const [viewCardQuery, viewCardResult] = useLazyQuery<CardQuery, CardQueryVariables>(GET_CARD);

  const viewCardDrawerRef = useRef<DrawerHandle>(null);

  const viewCard = (variables: UseViewCardProps) => {
    viewCardQuery({ variables });
    if (viewCardDrawerRef.current) {
      viewCardDrawerRef.current.toggleVisibility();
    }
  };

  return [viewCard, viewCardResult, viewCardDrawerRef] as const;
}
