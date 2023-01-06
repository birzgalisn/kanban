import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type Board = {
  __typename?: "Board";
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  lists: Array<List>;
  title: Scalars["String"];
  updatedAt: Scalars["DateTime"];
  workspace: Workspace;
  workspaceId: Scalars["String"];
};

export type Card = {
  __typename?: "Card";
  comments: Array<Comment>;
  createdAt: Scalars["DateTime"];
  deadline?: Maybe<Scalars["DateTime"]>;
  description?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  list: List;
  listId: Scalars["String"];
  tags: Array<Tag>;
  title: Scalars["String"];
  todos: Array<Todo>;
  updatedAt: Scalars["DateTime"];
};

export type Comment = {
  __typename?: "Comment";
  card: Card;
  cardId?: Maybe<Scalars["String"]>;
  comment: Scalars["String"];
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  member: Member;
  memberId?: Maybe<Scalars["String"]>;
  updatedAt: Scalars["DateTime"];
};

export type CreateBoardInput = {
  title: Scalars["String"];
};

export type CreateCardInput = {
  title: Scalars["String"];
};

export type CreateListInput = {
  title: Scalars["String"];
};

export type CreateUserInput = {
  email: Scalars["String"];
  name: Scalars["String"];
  password: Scalars["String"];
};

export type CreateWorkspaceInput = {
  title: Scalars["String"];
};

export type Error = {
  message: Scalars["String"];
};

export type Invite = {
  __typename?: "Invite";
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  member: Member;
  memberId?: Maybe<Scalars["String"]>;
  updatedAt: Scalars["DateTime"];
  user: User;
  userId?: Maybe<Scalars["String"]>;
};

export type List = {
  __typename?: "List";
  board: Board;
  boardId: Scalars["String"];
  cards: Array<Card>;
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  title: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type Member = {
  __typename?: "Member";
  comments: Array<Comment>;
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  invites: Array<Invite>;
  isOwner: Scalars["Boolean"];
  updatedAt: Scalars["DateTime"];
  user: User;
  userId?: Maybe<Scalars["String"]>;
  workspace: Workspace;
  workspaceId?: Maybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  createBoard: MutationCreateBoardResult;
  createCard: MutationCreateCardResult;
  createList: MutationCreateListResult;
  createUser: MutationCreateUserResult;
  createWorkspace: MutationCreateWorkspaceResult;
  moveCard: Card;
  updateCard: MutationUpdateCardResult;
};

export type MutationCreateBoardArgs = {
  input: CreateBoardInput;
  workspaceId: Scalars["String"];
};

export type MutationCreateCardArgs = {
  input: CreateCardInput;
  listId: Scalars["String"];
};

export type MutationCreateListArgs = {
  boardId: Scalars["String"];
  input: CreateListInput;
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationCreateWorkspaceArgs = {
  input: CreateWorkspaceInput;
};

export type MutationMoveCardArgs = {
  destination: Scalars["String"];
  id: Scalars["String"];
};

export type MutationUpdateCardArgs = {
  cardId: Scalars["String"];
  input: UpdateCardInput;
};

export type MutationCreateBoardResult = MutationCreateBoardSuccess | ZodError;

export type MutationCreateBoardSuccess = {
  __typename?: "MutationCreateBoardSuccess";
  data: Board;
};

export type MutationCreateCardResult = MutationCreateCardSuccess | ZodError;

export type MutationCreateCardSuccess = {
  __typename?: "MutationCreateCardSuccess";
  data: Card;
};

export type MutationCreateListResult = MutationCreateListSuccess | ZodError;

export type MutationCreateListSuccess = {
  __typename?: "MutationCreateListSuccess";
  data: List;
};

export type MutationCreateUserResult = MutationCreateUserSuccess | ZodError;

export type MutationCreateUserSuccess = {
  __typename?: "MutationCreateUserSuccess";
  data: User;
};

export type MutationCreateWorkspaceResult =
  | MutationCreateWorkspaceSuccess
  | ZodError;

export type MutationCreateWorkspaceSuccess = {
  __typename?: "MutationCreateWorkspaceSuccess";
  data: Workspace;
};

export type MutationUpdateCardResult = MutationUpdateCardSuccess | ZodError;

export type MutationUpdateCardSuccess = {
  __typename?: "MutationUpdateCardSuccess";
  data: Card;
};

export type Query = {
  __typename?: "Query";
  board: Board;
  card: Card;
  list: List;
  me: User;
  workspace: Workspace;
  workspaces?: Maybe<Array<Workspace>>;
};

export type QueryBoardArgs = {
  id: Scalars["String"];
};

export type QueryCardArgs = {
  id: Scalars["String"];
};

export type QueryListArgs = {
  id: Scalars["String"];
};

export type QueryWorkspaceArgs = {
  id: Scalars["String"];
};

/** User roles */
export enum Roles {
  Admin = "ADMIN",
  User = "USER",
}

export type Tag = {
  __typename?: "Tag";
  card: Card;
  cardId: Scalars["String"];
  colorHex?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  title: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type Todo = {
  __typename?: "Todo";
  card: Card;
  cardId: Scalars["String"];
  createdAt: Scalars["DateTime"];
  description: Scalars["String"];
  done: Scalars["Boolean"];
  id: Scalars["ID"];
  updatedAt: Scalars["DateTime"];
};

export type UpdateCardInput = {
  description: Scalars["String"];
};

export type User = {
  __typename?: "User";
  createdAt: Scalars["DateTime"];
  email?: Maybe<Scalars["String"]>;
  emailVerified?: Maybe<Scalars["DateTime"]>;
  id: Scalars["ID"];
  image?: Maybe<Scalars["String"]>;
  invites: Array<Invite>;
  name?: Maybe<Scalars["String"]>;
  role: Roles;
  updatedAt: Scalars["DateTime"];
  workspaces: Array<Member>;
};

export type Workspace = {
  __typename?: "Workspace";
  boards: Array<Board>;
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  members: Array<Member>;
  title: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type ZodError = Error & {
  __typename?: "ZodError";
  fieldErrors: Array<ZodFieldError>;
  message: Scalars["String"];
};

export type ZodFieldError = {
  __typename?: "ZodFieldError";
  message: Scalars["String"];
  path: Array<Scalars["String"]>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Board: ResolverTypeWrapper<Board>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Card: ResolverTypeWrapper<Card>;
  Comment: ResolverTypeWrapper<Comment>;
  CreateBoardInput: CreateBoardInput;
  CreateCardInput: CreateCardInput;
  CreateListInput: CreateListInput;
  CreateUserInput: CreateUserInput;
  CreateWorkspaceInput: CreateWorkspaceInput;
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  Error: ResolversTypes["ZodError"];
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Invite: ResolverTypeWrapper<Invite>;
  List: ResolverTypeWrapper<List>;
  Member: ResolverTypeWrapper<Member>;
  Mutation: ResolverTypeWrapper<{}>;
  MutationCreateBoardResult:
    | ResolversTypes["MutationCreateBoardSuccess"]
    | ResolversTypes["ZodError"];
  MutationCreateBoardSuccess: ResolverTypeWrapper<MutationCreateBoardSuccess>;
  MutationCreateCardResult:
    | ResolversTypes["MutationCreateCardSuccess"]
    | ResolversTypes["ZodError"];
  MutationCreateCardSuccess: ResolverTypeWrapper<MutationCreateCardSuccess>;
  MutationCreateListResult:
    | ResolversTypes["MutationCreateListSuccess"]
    | ResolversTypes["ZodError"];
  MutationCreateListSuccess: ResolverTypeWrapper<MutationCreateListSuccess>;
  MutationCreateUserResult:
    | ResolversTypes["MutationCreateUserSuccess"]
    | ResolversTypes["ZodError"];
  MutationCreateUserSuccess: ResolverTypeWrapper<MutationCreateUserSuccess>;
  MutationCreateWorkspaceResult:
    | ResolversTypes["MutationCreateWorkspaceSuccess"]
    | ResolversTypes["ZodError"];
  MutationCreateWorkspaceSuccess: ResolverTypeWrapper<MutationCreateWorkspaceSuccess>;
  MutationUpdateCardResult:
    | ResolversTypes["MutationUpdateCardSuccess"]
    | ResolversTypes["ZodError"];
  MutationUpdateCardSuccess: ResolverTypeWrapper<MutationUpdateCardSuccess>;
  Query: ResolverTypeWrapper<{}>;
  Roles: Roles;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Tag: ResolverTypeWrapper<Tag>;
  Todo: ResolverTypeWrapper<Todo>;
  UpdateCardInput: UpdateCardInput;
  User: ResolverTypeWrapper<User>;
  Workspace: ResolverTypeWrapper<Workspace>;
  ZodError: ResolverTypeWrapper<ZodError>;
  ZodFieldError: ResolverTypeWrapper<ZodFieldError>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Board: Board;
  Boolean: Scalars["Boolean"];
  Card: Card;
  Comment: Comment;
  CreateBoardInput: CreateBoardInput;
  CreateCardInput: CreateCardInput;
  CreateListInput: CreateListInput;
  CreateUserInput: CreateUserInput;
  CreateWorkspaceInput: CreateWorkspaceInput;
  Date: Scalars["Date"];
  DateTime: Scalars["DateTime"];
  Error: ResolversParentTypes["ZodError"];
  ID: Scalars["ID"];
  Invite: Invite;
  List: List;
  Member: Member;
  Mutation: {};
  MutationCreateBoardResult:
    | ResolversParentTypes["MutationCreateBoardSuccess"]
    | ResolversParentTypes["ZodError"];
  MutationCreateBoardSuccess: MutationCreateBoardSuccess;
  MutationCreateCardResult:
    | ResolversParentTypes["MutationCreateCardSuccess"]
    | ResolversParentTypes["ZodError"];
  MutationCreateCardSuccess: MutationCreateCardSuccess;
  MutationCreateListResult:
    | ResolversParentTypes["MutationCreateListSuccess"]
    | ResolversParentTypes["ZodError"];
  MutationCreateListSuccess: MutationCreateListSuccess;
  MutationCreateUserResult:
    | ResolversParentTypes["MutationCreateUserSuccess"]
    | ResolversParentTypes["ZodError"];
  MutationCreateUserSuccess: MutationCreateUserSuccess;
  MutationCreateWorkspaceResult:
    | ResolversParentTypes["MutationCreateWorkspaceSuccess"]
    | ResolversParentTypes["ZodError"];
  MutationCreateWorkspaceSuccess: MutationCreateWorkspaceSuccess;
  MutationUpdateCardResult:
    | ResolversParentTypes["MutationUpdateCardSuccess"]
    | ResolversParentTypes["ZodError"];
  MutationUpdateCardSuccess: MutationUpdateCardSuccess;
  Query: {};
  String: Scalars["String"];
  Tag: Tag;
  Todo: Todo;
  UpdateCardInput: UpdateCardInput;
  User: User;
  Workspace: Workspace;
  ZodError: ZodError;
  ZodFieldError: ZodFieldError;
};

export type BoardResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Board"] = ResolversParentTypes["Board"],
> = {
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  lists?: Resolver<Array<ResolversTypes["List"]>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  workspace?: Resolver<ResolversTypes["Workspace"], ParentType, ContextType>;
  workspaceId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CardResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Card"] = ResolversParentTypes["Card"],
> = {
  comments?: Resolver<
    Array<ResolversTypes["Comment"]>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  deadline?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  list?: Resolver<ResolversTypes["List"], ParentType, ContextType>;
  listId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes["Tag"]>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  todos?: Resolver<Array<ResolversTypes["Todo"]>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Comment"] = ResolversParentTypes["Comment"],
> = {
  card?: Resolver<ResolversTypes["Card"], ParentType, ContextType>;
  cardId?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  comment?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  member?: Resolver<ResolversTypes["Member"], ParentType, ContextType>;
  memberId?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export type ErrorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Error"] = ResolversParentTypes["Error"],
> = {
  __resolveType: TypeResolveFn<"ZodError", ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type InviteResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Invite"] = ResolversParentTypes["Invite"],
> = {
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  member?: Resolver<ResolversTypes["Member"], ParentType, ContextType>;
  memberId?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ListResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["List"] = ResolversParentTypes["List"],
> = {
  board?: Resolver<ResolversTypes["Board"], ParentType, ContextType>;
  boardId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  cards?: Resolver<Array<ResolversTypes["Card"]>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MemberResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Member"] = ResolversParentTypes["Member"],
> = {
  comments?: Resolver<
    Array<ResolversTypes["Comment"]>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  invites?: Resolver<Array<ResolversTypes["Invite"]>, ParentType, ContextType>;
  isOwner?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  workspace?: Resolver<ResolversTypes["Workspace"], ParentType, ContextType>;
  workspaceId?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = {
  createBoard?: Resolver<
    ResolversTypes["MutationCreateBoardResult"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateBoardArgs, "input" | "workspaceId">
  >;
  createCard?: Resolver<
    ResolversTypes["MutationCreateCardResult"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCardArgs, "input" | "listId">
  >;
  createList?: Resolver<
    ResolversTypes["MutationCreateListResult"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateListArgs, "boardId" | "input">
  >;
  createUser?: Resolver<
    ResolversTypes["MutationCreateUserResult"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, "input">
  >;
  createWorkspace?: Resolver<
    ResolversTypes["MutationCreateWorkspaceResult"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateWorkspaceArgs, "input">
  >;
  moveCard?: Resolver<
    ResolversTypes["Card"],
    ParentType,
    ContextType,
    RequireFields<MutationMoveCardArgs, "destination" | "id">
  >;
  updateCard?: Resolver<
    ResolversTypes["MutationUpdateCardResult"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCardArgs, "cardId" | "input">
  >;
};

export type MutationCreateBoardResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MutationCreateBoardResult"] = ResolversParentTypes["MutationCreateBoardResult"],
> = {
  __resolveType: TypeResolveFn<
    "MutationCreateBoardSuccess" | "ZodError",
    ParentType,
    ContextType
  >;
};

export type MutationCreateBoardSuccessResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MutationCreateBoardSuccess"] = ResolversParentTypes["MutationCreateBoardSuccess"],
> = {
  data?: Resolver<ResolversTypes["Board"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationCreateCardResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MutationCreateCardResult"] = ResolversParentTypes["MutationCreateCardResult"],
> = {
  __resolveType: TypeResolveFn<
    "MutationCreateCardSuccess" | "ZodError",
    ParentType,
    ContextType
  >;
};

export type MutationCreateCardSuccessResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MutationCreateCardSuccess"] = ResolversParentTypes["MutationCreateCardSuccess"],
> = {
  data?: Resolver<ResolversTypes["Card"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationCreateListResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MutationCreateListResult"] = ResolversParentTypes["MutationCreateListResult"],
> = {
  __resolveType: TypeResolveFn<
    "MutationCreateListSuccess" | "ZodError",
    ParentType,
    ContextType
  >;
};

export type MutationCreateListSuccessResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MutationCreateListSuccess"] = ResolversParentTypes["MutationCreateListSuccess"],
> = {
  data?: Resolver<ResolversTypes["List"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationCreateUserResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MutationCreateUserResult"] = ResolversParentTypes["MutationCreateUserResult"],
> = {
  __resolveType: TypeResolveFn<
    "MutationCreateUserSuccess" | "ZodError",
    ParentType,
    ContextType
  >;
};

export type MutationCreateUserSuccessResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MutationCreateUserSuccess"] = ResolversParentTypes["MutationCreateUserSuccess"],
> = {
  data?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationCreateWorkspaceResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MutationCreateWorkspaceResult"] = ResolversParentTypes["MutationCreateWorkspaceResult"],
> = {
  __resolveType: TypeResolveFn<
    "MutationCreateWorkspaceSuccess" | "ZodError",
    ParentType,
    ContextType
  >;
};

export type MutationCreateWorkspaceSuccessResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MutationCreateWorkspaceSuccess"] = ResolversParentTypes["MutationCreateWorkspaceSuccess"],
> = {
  data?: Resolver<ResolversTypes["Workspace"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationUpdateCardResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MutationUpdateCardResult"] = ResolversParentTypes["MutationUpdateCardResult"],
> = {
  __resolveType: TypeResolveFn<
    "MutationUpdateCardSuccess" | "ZodError",
    ParentType,
    ContextType
  >;
};

export type MutationUpdateCardSuccessResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MutationUpdateCardSuccess"] = ResolversParentTypes["MutationUpdateCardSuccess"],
> = {
  data?: Resolver<ResolversTypes["Card"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  board?: Resolver<
    ResolversTypes["Board"],
    ParentType,
    ContextType,
    RequireFields<QueryBoardArgs, "id">
  >;
  card?: Resolver<
    ResolversTypes["Card"],
    ParentType,
    ContextType,
    RequireFields<QueryCardArgs, "id">
  >;
  list?: Resolver<
    ResolversTypes["List"],
    ParentType,
    ContextType,
    RequireFields<QueryListArgs, "id">
  >;
  me?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  workspace?: Resolver<
    ResolversTypes["Workspace"],
    ParentType,
    ContextType,
    RequireFields<QueryWorkspaceArgs, "id">
  >;
  workspaces?: Resolver<
    Maybe<Array<ResolversTypes["Workspace"]>>,
    ParentType,
    ContextType
  >;
};

export type TagResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Tag"] = ResolversParentTypes["Tag"],
> = {
  card?: Resolver<ResolversTypes["Card"], ParentType, ContextType>;
  cardId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  colorHex?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TodoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Todo"] = ResolversParentTypes["Todo"],
> = {
  card?: Resolver<ResolversTypes["Card"], ParentType, ContextType>;
  cardId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  done?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"],
> = {
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  emailVerified?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  invites?: Resolver<Array<ResolversTypes["Invite"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes["Roles"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  workspaces?: Resolver<
    Array<ResolversTypes["Member"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkspaceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Workspace"] = ResolversParentTypes["Workspace"],
> = {
  boards?: Resolver<Array<ResolversTypes["Board"]>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes["Member"]>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ZodErrorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ZodError"] = ResolversParentTypes["ZodError"],
> = {
  fieldErrors?: Resolver<
    Array<ResolversTypes["ZodFieldError"]>,
    ParentType,
    ContextType
  >;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ZodFieldErrorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ZodFieldError"] = ResolversParentTypes["ZodFieldError"],
> = {
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  path?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Board?: BoardResolvers<ContextType>;
  Card?: CardResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Error?: ErrorResolvers<ContextType>;
  Invite?: InviteResolvers<ContextType>;
  List?: ListResolvers<ContextType>;
  Member?: MemberResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutationCreateBoardResult?: MutationCreateBoardResultResolvers<ContextType>;
  MutationCreateBoardSuccess?: MutationCreateBoardSuccessResolvers<ContextType>;
  MutationCreateCardResult?: MutationCreateCardResultResolvers<ContextType>;
  MutationCreateCardSuccess?: MutationCreateCardSuccessResolvers<ContextType>;
  MutationCreateListResult?: MutationCreateListResultResolvers<ContextType>;
  MutationCreateListSuccess?: MutationCreateListSuccessResolvers<ContextType>;
  MutationCreateUserResult?: MutationCreateUserResultResolvers<ContextType>;
  MutationCreateUserSuccess?: MutationCreateUserSuccessResolvers<ContextType>;
  MutationCreateWorkspaceResult?: MutationCreateWorkspaceResultResolvers<ContextType>;
  MutationCreateWorkspaceSuccess?: MutationCreateWorkspaceSuccessResolvers<ContextType>;
  MutationUpdateCardResult?: MutationUpdateCardResultResolvers<ContextType>;
  MutationUpdateCardSuccess?: MutationUpdateCardSuccessResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  Todo?: TodoResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Workspace?: WorkspaceResolvers<ContextType>;
  ZodError?: ZodErrorResolvers<ContextType>;
  ZodFieldError?: ZodFieldErrorResolvers<ContextType>;
};
