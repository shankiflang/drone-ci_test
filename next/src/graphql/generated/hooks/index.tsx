import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** ISO8601 Date values */
  Date: any;
  /** A Float or a String */
  GraphQLStringOrFloat: any;
  /** Hashed string values */
  Hash: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** Represents NULL values */
  Void: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  auth_login?: Maybe<Auth_Tokens>;
  auth_logout?: Maybe<Scalars['Boolean']>;
  auth_password_request?: Maybe<Scalars['Boolean']>;
  auth_password_reset?: Maybe<Scalars['Boolean']>;
  auth_refresh?: Maybe<Auth_Tokens>;
  create_articles_item?: Maybe<Articles>;
  create_articles_items: Array<Articles>;
  create_collections_item?: Maybe<Directus_Collections>;
  create_comment?: Maybe<Directus_Activity>;
  create_comments_item?: Maybe<Comments>;
  create_comments_items: Array<Comments>;
  create_comments_likes_item?: Maybe<Comments_Likes>;
  create_comments_likes_items: Array<Comments_Likes>;
  create_dashboards_item?: Maybe<Directus_Dashboards>;
  create_dashboards_items: Array<Directus_Dashboards>;
  create_fields_item?: Maybe<Directus_Fields>;
  create_files_item?: Maybe<Directus_Files>;
  create_files_items: Array<Directus_Files>;
  create_flows_item?: Maybe<Directus_Flows>;
  create_flows_items: Array<Directus_Flows>;
  create_folders_item?: Maybe<Directus_Folders>;
  create_folders_items: Array<Directus_Folders>;
  create_notifications_item?: Maybe<Directus_Notifications>;
  create_notifications_items: Array<Directus_Notifications>;
  create_operations_item?: Maybe<Directus_Operations>;
  create_operations_items: Array<Directus_Operations>;
  create_panels_item?: Maybe<Directus_Panels>;
  create_panels_items: Array<Directus_Panels>;
  create_permissions_item?: Maybe<Directus_Permissions>;
  create_permissions_items: Array<Directus_Permissions>;
  create_presets_item?: Maybe<Directus_Presets>;
  create_presets_items: Array<Directus_Presets>;
  create_relations_item?: Maybe<Directus_Relations>;
  create_roles_item?: Maybe<Directus_Roles>;
  create_roles_items: Array<Directus_Roles>;
  create_shares_item?: Maybe<Directus_Shares>;
  create_shares_items: Array<Directus_Shares>;
  create_users_item?: Maybe<Directus_Users>;
  create_users_items: Array<Directus_Users>;
  create_webhooks_item?: Maybe<Directus_Webhooks>;
  create_webhooks_items: Array<Directus_Webhooks>;
  delete_articles_item?: Maybe<Delete_One>;
  delete_articles_items?: Maybe<Delete_Many>;
  delete_collections_item?: Maybe<Delete_Collection>;
  delete_comment?: Maybe<Delete_One>;
  delete_comments_item?: Maybe<Delete_One>;
  delete_comments_items?: Maybe<Delete_Many>;
  delete_comments_likes_item?: Maybe<Delete_One>;
  delete_comments_likes_items?: Maybe<Delete_Many>;
  delete_dashboards_item?: Maybe<Delete_One>;
  delete_dashboards_items?: Maybe<Delete_Many>;
  delete_fields_item?: Maybe<Delete_Field>;
  delete_files_item?: Maybe<Delete_One>;
  delete_files_items?: Maybe<Delete_Many>;
  delete_flows_item?: Maybe<Delete_One>;
  delete_flows_items?: Maybe<Delete_Many>;
  delete_folders_item?: Maybe<Delete_One>;
  delete_folders_items?: Maybe<Delete_Many>;
  delete_notifications_item?: Maybe<Delete_One>;
  delete_notifications_items?: Maybe<Delete_Many>;
  delete_operations_item?: Maybe<Delete_One>;
  delete_operations_items?: Maybe<Delete_Many>;
  delete_panels_item?: Maybe<Delete_One>;
  delete_panels_items?: Maybe<Delete_Many>;
  delete_permissions_item?: Maybe<Delete_One>;
  delete_permissions_items?: Maybe<Delete_Many>;
  delete_presets_item?: Maybe<Delete_One>;
  delete_presets_items?: Maybe<Delete_Many>;
  delete_relations_item?: Maybe<Delete_Relation>;
  delete_roles_item?: Maybe<Delete_One>;
  delete_roles_items?: Maybe<Delete_Many>;
  delete_shares_item?: Maybe<Delete_One>;
  delete_shares_items?: Maybe<Delete_Many>;
  delete_users_item?: Maybe<Delete_One>;
  delete_users_items?: Maybe<Delete_Many>;
  delete_webhooks_item?: Maybe<Delete_One>;
  delete_webhooks_items?: Maybe<Delete_Many>;
  import_file?: Maybe<Directus_Files>;
  update_articles_batch: Array<Articles>;
  update_articles_item?: Maybe<Articles>;
  update_articles_items: Array<Articles>;
  update_collections_item?: Maybe<Directus_Collections>;
  update_comment?: Maybe<Directus_Activity>;
  update_comments_batch: Array<Comments>;
  update_comments_item?: Maybe<Comments>;
  update_comments_items: Array<Comments>;
  update_comments_likes_batch: Array<Comments_Likes>;
  update_comments_likes_item?: Maybe<Comments_Likes>;
  update_comments_likes_items: Array<Comments_Likes>;
  update_dashboards_batch: Array<Directus_Dashboards>;
  update_dashboards_item?: Maybe<Directus_Dashboards>;
  update_dashboards_items: Array<Directus_Dashboards>;
  update_fields_item?: Maybe<Directus_Fields>;
  update_files_batch: Array<Directus_Files>;
  update_files_item?: Maybe<Directus_Files>;
  update_files_items: Array<Directus_Files>;
  update_flows_batch: Array<Directus_Flows>;
  update_flows_item?: Maybe<Directus_Flows>;
  update_flows_items: Array<Directus_Flows>;
  update_folders_batch: Array<Directus_Folders>;
  update_folders_item?: Maybe<Directus_Folders>;
  update_folders_items: Array<Directus_Folders>;
  update_notifications_batch: Array<Directus_Notifications>;
  update_notifications_item?: Maybe<Directus_Notifications>;
  update_notifications_items: Array<Directus_Notifications>;
  update_operations_batch: Array<Directus_Operations>;
  update_operations_item?: Maybe<Directus_Operations>;
  update_operations_items: Array<Directus_Operations>;
  update_panels_batch: Array<Directus_Panels>;
  update_panels_item?: Maybe<Directus_Panels>;
  update_panels_items: Array<Directus_Panels>;
  update_permissions_batch: Array<Directus_Permissions>;
  update_permissions_item?: Maybe<Directus_Permissions>;
  update_permissions_items: Array<Directus_Permissions>;
  update_presets_batch: Array<Directus_Presets>;
  update_presets_item?: Maybe<Directus_Presets>;
  update_presets_items: Array<Directus_Presets>;
  update_relations_item?: Maybe<Directus_Relations>;
  update_roles_batch: Array<Directus_Roles>;
  update_roles_item?: Maybe<Directus_Roles>;
  update_roles_items: Array<Directus_Roles>;
  update_settings?: Maybe<Directus_Settings>;
  update_shares_batch: Array<Directus_Shares>;
  update_shares_item?: Maybe<Directus_Shares>;
  update_shares_items: Array<Directus_Shares>;
  update_users_batch: Array<Directus_Users>;
  update_users_item?: Maybe<Directus_Users>;
  update_users_items: Array<Directus_Users>;
  update_users_me?: Maybe<Directus_Users>;
  update_webhooks_batch: Array<Directus_Webhooks>;
  update_webhooks_item?: Maybe<Directus_Webhooks>;
  update_webhooks_items: Array<Directus_Webhooks>;
  users_invite?: Maybe<Scalars['Boolean']>;
  users_invite_accept?: Maybe<Scalars['Boolean']>;
  users_me_tfa_disable?: Maybe<Scalars['Boolean']>;
  users_me_tfa_enable?: Maybe<Scalars['Boolean']>;
  users_me_tfa_generate?: Maybe<Users_Me_Tfa_Generate_Data>;
  utils_cache_clear?: Maybe<Scalars['Void']>;
  utils_hash_generate?: Maybe<Scalars['String']>;
  utils_hash_verify?: Maybe<Scalars['Boolean']>;
  utils_revert?: Maybe<Scalars['Boolean']>;
  utils_sort?: Maybe<Scalars['Boolean']>;
};


export type MutationAuth_LoginArgs = {
  email: Scalars['String'];
  mode?: InputMaybe<Auth_Mode>;
  otp?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};


export type MutationAuth_LogoutArgs = {
  refresh_token?: InputMaybe<Scalars['String']>;
};


export type MutationAuth_Password_RequestArgs = {
  email: Scalars['String'];
  reset_url?: InputMaybe<Scalars['String']>;
};


export type MutationAuth_Password_ResetArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationAuth_RefreshArgs = {
  mode?: InputMaybe<Auth_Mode>;
  refresh_token?: InputMaybe<Scalars['String']>;
};


export type MutationCreate_Articles_ItemArgs = {
  data: Create_Articles_Input;
};


export type MutationCreate_Articles_ItemsArgs = {
  data?: InputMaybe<Array<Create_Articles_Input>>;
  filter?: InputMaybe<Articles_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationCreate_Collections_ItemArgs = {
  data: Create_Directus_Collections_Input;
};


export type MutationCreate_CommentArgs = {
  collection: Scalars['String'];
  comment: Scalars['String'];
  item: Scalars['ID'];
};


export type MutationCreate_Comments_ItemArgs = {
  data: Create_Comments_Input;
};


export type MutationCreate_Comments_ItemsArgs = {
  data?: InputMaybe<Array<Create_Comments_Input>>;
  filter?: InputMaybe<Comments_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationCreate_Comments_Likes_ItemArgs = {
  data: Create_Comments_Likes_Input;
};


export type MutationCreate_Comments_Likes_ItemsArgs = {
  data?: InputMaybe<Array<Create_Comments_Likes_Input>>;
  filter?: InputMaybe<Comments_Likes_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationCreate_Dashboards_ItemArgs = {
  data: Create_Directus_Dashboards_Input;
};


export type MutationCreate_Dashboards_ItemsArgs = {
  data?: InputMaybe<Array<Create_Directus_Dashboards_Input>>;
  filter?: InputMaybe<Directus_Dashboards_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationCreate_Fields_ItemArgs = {
  collection: Scalars['String'];
  data: Create_Directus_Fields_Input;
};


export type MutationCreate_Files_ItemArgs = {
  data: Create_Directus_Files_Input;
};


export type MutationCreate_Files_ItemsArgs = {
  data?: InputMaybe<Array<Create_Directus_Files_Input>>;
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationCreate_Flows_ItemArgs = {
  data: Create_Directus_Flows_Input;
};


export type MutationCreate_Flows_ItemsArgs = {
  data?: InputMaybe<Array<Create_Directus_Flows_Input>>;
  filter?: InputMaybe<Directus_Flows_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationCreate_Folders_ItemArgs = {
  data: Create_Directus_Folders_Input;
};


export type MutationCreate_Folders_ItemsArgs = {
  data?: InputMaybe<Array<Create_Directus_Folders_Input>>;
  filter?: InputMaybe<Directus_Folders_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationCreate_Notifications_ItemArgs = {
  data: Create_Directus_Notifications_Input;
};


export type MutationCreate_Notifications_ItemsArgs = {
  data?: InputMaybe<Array<Create_Directus_Notifications_Input>>;
  filter?: InputMaybe<Directus_Notifications_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationCreate_Operations_ItemArgs = {
  data: Create_Directus_Operations_Input;
};


export type MutationCreate_Operations_ItemsArgs = {
  data?: InputMaybe<Array<Create_Directus_Operations_Input>>;
  filter?: InputMaybe<Directus_Operations_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationCreate_Panels_ItemArgs = {
  data: Create_Directus_Panels_Input;
};


export type MutationCreate_Panels_ItemsArgs = {
  data?: InputMaybe<Array<Create_Directus_Panels_Input>>;
  filter?: InputMaybe<Directus_Panels_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationCreate_Permissions_ItemArgs = {
  data: Create_Directus_Permissions_Input;
};


export type MutationCreate_Permissions_ItemsArgs = {
  data?: InputMaybe<Array<Create_Directus_Permissions_Input>>;
  filter?: InputMaybe<Directus_Permissions_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationCreate_Presets_ItemArgs = {
  data: Create_Directus_Presets_Input;
};


export type MutationCreate_Presets_ItemsArgs = {
  data?: InputMaybe<Array<Create_Directus_Presets_Input>>;
  filter?: InputMaybe<Directus_Presets_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationCreate_Relations_ItemArgs = {
  data: Create_Directus_Relations_Input;
};


export type MutationCreate_Roles_ItemArgs = {
  data: Create_Directus_Roles_Input;
};


export type MutationCreate_Roles_ItemsArgs = {
  data?: InputMaybe<Array<Create_Directus_Roles_Input>>;
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationCreate_Shares_ItemArgs = {
  data: Create_Directus_Shares_Input;
};


export type MutationCreate_Shares_ItemsArgs = {
  data?: InputMaybe<Array<Create_Directus_Shares_Input>>;
  filter?: InputMaybe<Directus_Shares_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationCreate_Users_ItemArgs = {
  data: Create_Directus_Users_Input;
};


export type MutationCreate_Users_ItemsArgs = {
  data?: InputMaybe<Array<Create_Directus_Users_Input>>;
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationCreate_Webhooks_ItemArgs = {
  data: Create_Directus_Webhooks_Input;
};


export type MutationCreate_Webhooks_ItemsArgs = {
  data?: InputMaybe<Array<Create_Directus_Webhooks_Input>>;
  filter?: InputMaybe<Directus_Webhooks_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationDelete_Articles_ItemArgs = {
  id: Scalars['ID'];
};


export type MutationDelete_Articles_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationDelete_Collections_ItemArgs = {
  collection: Scalars['String'];
};


export type MutationDelete_CommentArgs = {
  id: Scalars['ID'];
};


export type MutationDelete_Comments_ItemArgs = {
  id: Scalars['ID'];
};


export type MutationDelete_Comments_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationDelete_Comments_Likes_ItemArgs = {
  id: Scalars['ID'];
};


export type MutationDelete_Comments_Likes_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationDelete_Dashboards_ItemArgs = {
  id: Scalars['ID'];
};


export type MutationDelete_Dashboards_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationDelete_Fields_ItemArgs = {
  collection: Scalars['String'];
  field: Scalars['String'];
};


export type MutationDelete_Files_ItemArgs = {
  id: Scalars['ID'];
};


export type MutationDelete_Files_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationDelete_Flows_ItemArgs = {
  id: Scalars['ID'];
};


export type MutationDelete_Flows_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationDelete_Folders_ItemArgs = {
  id: Scalars['ID'];
};


export type MutationDelete_Folders_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationDelete_Notifications_ItemArgs = {
  id: Scalars['ID'];
};


export type MutationDelete_Notifications_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationDelete_Operations_ItemArgs = {
  id: Scalars['ID'];
};


export type MutationDelete_Operations_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationDelete_Panels_ItemArgs = {
  id: Scalars['ID'];
};


export type MutationDelete_Panels_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationDelete_Permissions_ItemArgs = {
  id: Scalars['ID'];
};


export type MutationDelete_Permissions_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationDelete_Presets_ItemArgs = {
  id: Scalars['ID'];
};


export type MutationDelete_Presets_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationDelete_Relations_ItemArgs = {
  collection: Scalars['String'];
  field: Scalars['String'];
};


export type MutationDelete_Roles_ItemArgs = {
  id: Scalars['ID'];
};


export type MutationDelete_Roles_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationDelete_Shares_ItemArgs = {
  id: Scalars['ID'];
};


export type MutationDelete_Shares_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationDelete_Users_ItemArgs = {
  id: Scalars['ID'];
};


export type MutationDelete_Users_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationDelete_Webhooks_ItemArgs = {
  id: Scalars['ID'];
};


export type MutationDelete_Webhooks_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationImport_FileArgs = {
  data?: InputMaybe<Create_Directus_Files_Input>;
  url: Scalars['String'];
};


export type MutationUpdate_Articles_BatchArgs = {
  data?: InputMaybe<Array<Update_Articles_Input>>;
  filter?: InputMaybe<Articles_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Articles_ItemArgs = {
  data: Update_Articles_Input;
  id: Scalars['ID'];
};


export type MutationUpdate_Articles_ItemsArgs = {
  data: Update_Articles_Input;
  filter?: InputMaybe<Articles_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Collections_ItemArgs = {
  collection: Scalars['String'];
  data: Update_Directus_Collections_Input;
};


export type MutationUpdate_CommentArgs = {
  comment: Scalars['String'];
  id: Scalars['ID'];
};


export type MutationUpdate_Comments_BatchArgs = {
  data?: InputMaybe<Array<Update_Comments_Input>>;
  filter?: InputMaybe<Comments_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Comments_ItemArgs = {
  data: Update_Comments_Input;
  id: Scalars['ID'];
};


export type MutationUpdate_Comments_ItemsArgs = {
  data: Update_Comments_Input;
  filter?: InputMaybe<Comments_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Comments_Likes_BatchArgs = {
  data?: InputMaybe<Array<Update_Comments_Likes_Input>>;
  filter?: InputMaybe<Comments_Likes_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Comments_Likes_ItemArgs = {
  data: Update_Comments_Likes_Input;
  id: Scalars['ID'];
};


export type MutationUpdate_Comments_Likes_ItemsArgs = {
  data: Update_Comments_Likes_Input;
  filter?: InputMaybe<Comments_Likes_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Dashboards_BatchArgs = {
  data?: InputMaybe<Array<Update_Directus_Dashboards_Input>>;
  filter?: InputMaybe<Directus_Dashboards_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Dashboards_ItemArgs = {
  data: Update_Directus_Dashboards_Input;
  id: Scalars['ID'];
};


export type MutationUpdate_Dashboards_ItemsArgs = {
  data: Update_Directus_Dashboards_Input;
  filter?: InputMaybe<Directus_Dashboards_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Fields_ItemArgs = {
  collection: Scalars['String'];
  data: Update_Directus_Fields_Input;
  field: Scalars['String'];
};


export type MutationUpdate_Files_BatchArgs = {
  data?: InputMaybe<Array<Update_Directus_Files_Input>>;
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Files_ItemArgs = {
  data: Update_Directus_Files_Input;
  id: Scalars['ID'];
};


export type MutationUpdate_Files_ItemsArgs = {
  data: Update_Directus_Files_Input;
  filter?: InputMaybe<Directus_Files_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Flows_BatchArgs = {
  data?: InputMaybe<Array<Update_Directus_Flows_Input>>;
  filter?: InputMaybe<Directus_Flows_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Flows_ItemArgs = {
  data: Update_Directus_Flows_Input;
  id: Scalars['ID'];
};


export type MutationUpdate_Flows_ItemsArgs = {
  data: Update_Directus_Flows_Input;
  filter?: InputMaybe<Directus_Flows_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Folders_BatchArgs = {
  data?: InputMaybe<Array<Update_Directus_Folders_Input>>;
  filter?: InputMaybe<Directus_Folders_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Folders_ItemArgs = {
  data: Update_Directus_Folders_Input;
  id: Scalars['ID'];
};


export type MutationUpdate_Folders_ItemsArgs = {
  data: Update_Directus_Folders_Input;
  filter?: InputMaybe<Directus_Folders_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Notifications_BatchArgs = {
  data?: InputMaybe<Array<Update_Directus_Notifications_Input>>;
  filter?: InputMaybe<Directus_Notifications_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Notifications_ItemArgs = {
  data: Update_Directus_Notifications_Input;
  id: Scalars['ID'];
};


export type MutationUpdate_Notifications_ItemsArgs = {
  data: Update_Directus_Notifications_Input;
  filter?: InputMaybe<Directus_Notifications_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Operations_BatchArgs = {
  data?: InputMaybe<Array<Update_Directus_Operations_Input>>;
  filter?: InputMaybe<Directus_Operations_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Operations_ItemArgs = {
  data: Update_Directus_Operations_Input;
  id: Scalars['ID'];
};


export type MutationUpdate_Operations_ItemsArgs = {
  data: Update_Directus_Operations_Input;
  filter?: InputMaybe<Directus_Operations_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Panels_BatchArgs = {
  data?: InputMaybe<Array<Update_Directus_Panels_Input>>;
  filter?: InputMaybe<Directus_Panels_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Panels_ItemArgs = {
  data: Update_Directus_Panels_Input;
  id: Scalars['ID'];
};


export type MutationUpdate_Panels_ItemsArgs = {
  data: Update_Directus_Panels_Input;
  filter?: InputMaybe<Directus_Panels_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Permissions_BatchArgs = {
  data?: InputMaybe<Array<Update_Directus_Permissions_Input>>;
  filter?: InputMaybe<Directus_Permissions_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Permissions_ItemArgs = {
  data: Update_Directus_Permissions_Input;
  id: Scalars['ID'];
};


export type MutationUpdate_Permissions_ItemsArgs = {
  data: Update_Directus_Permissions_Input;
  filter?: InputMaybe<Directus_Permissions_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Presets_BatchArgs = {
  data?: InputMaybe<Array<Update_Directus_Presets_Input>>;
  filter?: InputMaybe<Directus_Presets_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Presets_ItemArgs = {
  data: Update_Directus_Presets_Input;
  id: Scalars['ID'];
};


export type MutationUpdate_Presets_ItemsArgs = {
  data: Update_Directus_Presets_Input;
  filter?: InputMaybe<Directus_Presets_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Relations_ItemArgs = {
  collection: Scalars['String'];
  data: Update_Directus_Relations_Input;
  field: Scalars['String'];
};


export type MutationUpdate_Roles_BatchArgs = {
  data?: InputMaybe<Array<Update_Directus_Roles_Input>>;
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Roles_ItemArgs = {
  data: Update_Directus_Roles_Input;
  id: Scalars['ID'];
};


export type MutationUpdate_Roles_ItemsArgs = {
  data: Update_Directus_Roles_Input;
  filter?: InputMaybe<Directus_Roles_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_SettingsArgs = {
  data: Update_Directus_Settings_Input;
};


export type MutationUpdate_Shares_BatchArgs = {
  data?: InputMaybe<Array<Update_Directus_Shares_Input>>;
  filter?: InputMaybe<Directus_Shares_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Shares_ItemArgs = {
  data: Update_Directus_Shares_Input;
  id: Scalars['ID'];
};


export type MutationUpdate_Shares_ItemsArgs = {
  data: Update_Directus_Shares_Input;
  filter?: InputMaybe<Directus_Shares_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Users_BatchArgs = {
  data?: InputMaybe<Array<Update_Directus_Users_Input>>;
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Users_ItemArgs = {
  data: Update_Directus_Users_Input;
  id: Scalars['ID'];
};


export type MutationUpdate_Users_ItemsArgs = {
  data: Update_Directus_Users_Input;
  filter?: InputMaybe<Directus_Users_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Users_MeArgs = {
  data?: InputMaybe<Update_Directus_Users_Input>;
};


export type MutationUpdate_Webhooks_BatchArgs = {
  data?: InputMaybe<Array<Update_Directus_Webhooks_Input>>;
  filter?: InputMaybe<Directus_Webhooks_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Webhooks_ItemArgs = {
  data: Update_Directus_Webhooks_Input;
  id: Scalars['ID'];
};


export type MutationUpdate_Webhooks_ItemsArgs = {
  data: Update_Directus_Webhooks_Input;
  filter?: InputMaybe<Directus_Webhooks_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUsers_InviteArgs = {
  email: Scalars['String'];
  invite_url?: InputMaybe<Scalars['String']>;
  role: Scalars['String'];
};


export type MutationUsers_Invite_AcceptArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationUsers_Me_Tfa_DisableArgs = {
  otp: Scalars['String'];
};


export type MutationUsers_Me_Tfa_EnableArgs = {
  otp: Scalars['String'];
  secret: Scalars['String'];
};


export type MutationUsers_Me_Tfa_GenerateArgs = {
  password: Scalars['String'];
};


export type MutationUtils_Hash_GenerateArgs = {
  string: Scalars['String'];
};


export type MutationUtils_Hash_VerifyArgs = {
  hash: Scalars['String'];
  string: Scalars['String'];
};


export type MutationUtils_RevertArgs = {
  revision: Scalars['ID'];
};


export type MutationUtils_SortArgs = {
  collection: Scalars['String'];
  item: Scalars['ID'];
  to: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  activity: Array<Directus_Activity>;
  activity_aggregated: Array<Directus_Activity_Aggregated>;
  activity_by_id?: Maybe<Directus_Activity>;
  articles: Array<Articles>;
  articles_aggregated: Array<Articles_Aggregated>;
  articles_by_id?: Maybe<Articles>;
  collections: Array<Directus_Collections>;
  collections_by_name?: Maybe<Directus_Collections>;
  comments: Array<Comments>;
  comments_aggregated: Array<Comments_Aggregated>;
  comments_by_id?: Maybe<Comments>;
  comments_likes: Array<Comments_Likes>;
  comments_likes_aggregated: Array<Comments_Likes_Aggregated>;
  comments_likes_by_id?: Maybe<Comments_Likes>;
  dashboards: Array<Directus_Dashboards>;
  dashboards_aggregated: Array<Directus_Dashboards_Aggregated>;
  dashboards_by_id?: Maybe<Directus_Dashboards>;
  extensions?: Maybe<Extensions>;
  fields: Array<Directus_Fields>;
  fields_by_name?: Maybe<Directus_Fields>;
  fields_in_collection: Array<Directus_Fields>;
  files: Array<Directus_Files>;
  files_aggregated: Array<Directus_Files_Aggregated>;
  files_by_id?: Maybe<Directus_Files>;
  flows: Array<Directus_Flows>;
  flows_aggregated: Array<Directus_Flows_Aggregated>;
  flows_by_id?: Maybe<Directus_Flows>;
  folders: Array<Directus_Folders>;
  folders_aggregated: Array<Directus_Folders_Aggregated>;
  folders_by_id?: Maybe<Directus_Folders>;
  notifications: Array<Directus_Notifications>;
  notifications_aggregated: Array<Directus_Notifications_Aggregated>;
  notifications_by_id?: Maybe<Directus_Notifications>;
  operations: Array<Directus_Operations>;
  operations_aggregated: Array<Directus_Operations_Aggregated>;
  operations_by_id?: Maybe<Directus_Operations>;
  panels: Array<Directus_Panels>;
  panels_aggregated: Array<Directus_Panels_Aggregated>;
  panels_by_id?: Maybe<Directus_Panels>;
  permissions: Array<Directus_Permissions>;
  permissions_aggregated: Array<Directus_Permissions_Aggregated>;
  permissions_by_id?: Maybe<Directus_Permissions>;
  presets: Array<Directus_Presets>;
  presets_aggregated: Array<Directus_Presets_Aggregated>;
  presets_by_id?: Maybe<Directus_Presets>;
  relations: Array<Directus_Relations>;
  relations_by_name?: Maybe<Directus_Relations>;
  relations_in_collection: Array<Directus_Relations>;
  revisions: Array<Directus_Revisions>;
  revisions_aggregated: Array<Directus_Revisions_Aggregated>;
  revisions_by_id?: Maybe<Directus_Revisions>;
  roles: Array<Directus_Roles>;
  roles_aggregated: Array<Directus_Roles_Aggregated>;
  roles_by_id?: Maybe<Directus_Roles>;
  server_health?: Maybe<Scalars['JSON']>;
  server_info?: Maybe<Server_Info>;
  server_ping?: Maybe<Scalars['String']>;
  server_specs_graphql?: Maybe<Scalars['String']>;
  server_specs_oas?: Maybe<Scalars['JSON']>;
  settings?: Maybe<Directus_Settings>;
  shares: Array<Directus_Shares>;
  shares_aggregated: Array<Directus_Shares_Aggregated>;
  shares_by_id?: Maybe<Directus_Shares>;
  users: Array<Directus_Users>;
  users_aggregated: Array<Directus_Users_Aggregated>;
  users_by_id?: Maybe<Directus_Users>;
  users_me?: Maybe<Directus_Users>;
  webhooks: Array<Directus_Webhooks>;
  webhooks_aggregated: Array<Directus_Webhooks_Aggregated>;
  webhooks_by_id?: Maybe<Directus_Webhooks>;
};


export type QueryActivityArgs = {
  filter?: InputMaybe<Directus_Activity_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryActivity_AggregatedArgs = {
  filter?: InputMaybe<Directus_Activity_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryActivity_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryArticlesArgs = {
  filter?: InputMaybe<Articles_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryArticles_AggregatedArgs = {
  filter?: InputMaybe<Articles_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryArticles_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryCollections_By_NameArgs = {
  name: Scalars['String'];
};


export type QueryCommentsArgs = {
  filter?: InputMaybe<Comments_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryComments_AggregatedArgs = {
  filter?: InputMaybe<Comments_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryComments_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryComments_LikesArgs = {
  filter?: InputMaybe<Comments_Likes_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryComments_Likes_AggregatedArgs = {
  filter?: InputMaybe<Comments_Likes_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryComments_Likes_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryDashboardsArgs = {
  filter?: InputMaybe<Directus_Dashboards_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryDashboards_AggregatedArgs = {
  filter?: InputMaybe<Directus_Dashboards_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryDashboards_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryFields_By_NameArgs = {
  collection: Scalars['String'];
  field: Scalars['String'];
};


export type QueryFields_In_CollectionArgs = {
  collection: Scalars['String'];
};


export type QueryFilesArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryFiles_AggregatedArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryFiles_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryFlowsArgs = {
  filter?: InputMaybe<Directus_Flows_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryFlows_AggregatedArgs = {
  filter?: InputMaybe<Directus_Flows_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryFlows_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryFoldersArgs = {
  filter?: InputMaybe<Directus_Folders_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryFolders_AggregatedArgs = {
  filter?: InputMaybe<Directus_Folders_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryFolders_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryNotificationsArgs = {
  filter?: InputMaybe<Directus_Notifications_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryNotifications_AggregatedArgs = {
  filter?: InputMaybe<Directus_Notifications_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryNotifications_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryOperationsArgs = {
  filter?: InputMaybe<Directus_Operations_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryOperations_AggregatedArgs = {
  filter?: InputMaybe<Directus_Operations_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryOperations_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryPanelsArgs = {
  filter?: InputMaybe<Directus_Panels_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryPanels_AggregatedArgs = {
  filter?: InputMaybe<Directus_Panels_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryPanels_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryPermissionsArgs = {
  filter?: InputMaybe<Directus_Permissions_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryPermissions_AggregatedArgs = {
  filter?: InputMaybe<Directus_Permissions_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryPermissions_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryPresetsArgs = {
  filter?: InputMaybe<Directus_Presets_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryPresets_AggregatedArgs = {
  filter?: InputMaybe<Directus_Presets_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryPresets_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryRelations_By_NameArgs = {
  collection: Scalars['String'];
  field: Scalars['String'];
};


export type QueryRelations_In_CollectionArgs = {
  collection: Scalars['String'];
};


export type QueryRevisionsArgs = {
  filter?: InputMaybe<Directus_Revisions_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryRevisions_AggregatedArgs = {
  filter?: InputMaybe<Directus_Revisions_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryRevisions_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryRolesArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryRoles_AggregatedArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryRoles_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryServer_Specs_GraphqlArgs = {
  scope?: InputMaybe<Graphql_Sdl_Scope>;
};


export type QuerySharesArgs = {
  filter?: InputMaybe<Directus_Shares_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryShares_AggregatedArgs = {
  filter?: InputMaybe<Directus_Shares_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryShares_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsers_AggregatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsers_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryWebhooksArgs = {
  filter?: InputMaybe<Directus_Webhooks_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryWebhooks_AggregatedArgs = {
  filter?: InputMaybe<Directus_Webhooks_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryWebhooks_By_IdArgs = {
  id: Scalars['ID'];
};

export type Articles = {
  __typename?: 'articles';
  banner?: Maybe<Directus_Files>;
  category?: Maybe<Scalars['String']>;
  comments?: Maybe<Array<Maybe<Comments>>>;
  comments_func?: Maybe<Count_Functions>;
  content?: Maybe<Scalars['JSON']>;
  content_func?: Maybe<Count_Functions>;
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID'];
  read_time?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  sub_title?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};


export type ArticlesBannerArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ArticlesCommentsArgs = {
  filter?: InputMaybe<Comments_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ArticlesUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ArticlesUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Articles_Aggregated = {
  __typename?: 'articles_aggregated';
  avg?: Maybe<Articles_Aggregated_Fields>;
  avgDistinct?: Maybe<Articles_Aggregated_Fields>;
  count?: Maybe<Articles_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Articles_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Articles_Aggregated_Fields>;
  min?: Maybe<Articles_Aggregated_Fields>;
  sum?: Maybe<Articles_Aggregated_Fields>;
  sumDistinct?: Maybe<Articles_Aggregated_Fields>;
};

export type Articles_Aggregated_Count = {
  __typename?: 'articles_aggregated_count';
  banner?: Maybe<Scalars['Int']>;
  category?: Maybe<Scalars['Int']>;
  comments?: Maybe<Scalars['Int']>;
  content?: Maybe<Scalars['Int']>;
  date_created?: Maybe<Scalars['Int']>;
  date_updated?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  read_time?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  sub_title?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['Int']>;
  user_created?: Maybe<Scalars['Int']>;
  user_updated?: Maybe<Scalars['Int']>;
};

export type Articles_Aggregated_Fields = {
  __typename?: 'articles_aggregated_fields';
  id?: Maybe<Scalars['Float']>;
  read_time?: Maybe<Scalars['Float']>;
  sort?: Maybe<Scalars['Float']>;
};

export type Articles_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Articles_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Articles_Filter>>>;
  banner?: InputMaybe<Directus_Files_Filter>;
  category?: InputMaybe<String_Filter_Operators>;
  comments?: InputMaybe<Comments_Filter>;
  comments_func?: InputMaybe<Count_Function_Filter_Operators>;
  content?: InputMaybe<String_Filter_Operators>;
  content_func?: InputMaybe<Count_Function_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  read_time?: InputMaybe<Number_Filter_Operators>;
  sort?: InputMaybe<Number_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  sub_title?: InputMaybe<String_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
};

export enum Auth_Mode {
  Cookie = 'cookie',
  Json = 'json'
}

export type Auth_Tokens = {
  __typename?: 'auth_tokens';
  access_token?: Maybe<Scalars['String']>;
  expires?: Maybe<Scalars['Int']>;
  refresh_token?: Maybe<Scalars['String']>;
};

export type Boolean_Filter_Operators = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
  _null?: InputMaybe<Scalars['Boolean']>;
};

export type Comments = {
  __typename?: 'comments';
  article_id?: Maybe<Articles>;
  comment?: Maybe<Scalars['String']>;
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID'];
  likes?: Maybe<Array<Maybe<Comments_Likes>>>;
  likes_func?: Maybe<Count_Functions>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};


export type CommentsArticle_IdArgs = {
  filter?: InputMaybe<Articles_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type CommentsLikesArgs = {
  filter?: InputMaybe<Comments_Likes_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type CommentsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type CommentsUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Comments_Aggregated = {
  __typename?: 'comments_aggregated';
  avg?: Maybe<Comments_Aggregated_Fields>;
  avgDistinct?: Maybe<Comments_Aggregated_Fields>;
  count?: Maybe<Comments_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Comments_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Comments_Aggregated_Fields>;
  min?: Maybe<Comments_Aggregated_Fields>;
  sum?: Maybe<Comments_Aggregated_Fields>;
  sumDistinct?: Maybe<Comments_Aggregated_Fields>;
};

export type Comments_Aggregated_Count = {
  __typename?: 'comments_aggregated_count';
  article_id?: Maybe<Scalars['Int']>;
  comment?: Maybe<Scalars['Int']>;
  date_created?: Maybe<Scalars['Int']>;
  date_updated?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  likes?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  user_created?: Maybe<Scalars['Int']>;
  user_updated?: Maybe<Scalars['Int']>;
};

export type Comments_Aggregated_Fields = {
  __typename?: 'comments_aggregated_fields';
  article_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  sort?: Maybe<Scalars['Float']>;
};

export type Comments_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Comments_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Comments_Filter>>>;
  article_id?: InputMaybe<Articles_Filter>;
  comment?: InputMaybe<String_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  likes?: InputMaybe<Comments_Likes_Filter>;
  likes_func?: InputMaybe<Count_Function_Filter_Operators>;
  sort?: InputMaybe<Number_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
};

export type Comments_Likes = {
  __typename?: 'comments_likes';
  comment?: Maybe<Comments>;
  id: Scalars['ID'];
  user?: Maybe<Directus_Users>;
};


export type Comments_LikesCommentArgs = {
  filter?: InputMaybe<Comments_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Comments_LikesUserArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Comments_Likes_Aggregated = {
  __typename?: 'comments_likes_aggregated';
  avg?: Maybe<Comments_Likes_Aggregated_Fields>;
  avgDistinct?: Maybe<Comments_Likes_Aggregated_Fields>;
  count?: Maybe<Comments_Likes_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Comments_Likes_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Comments_Likes_Aggregated_Fields>;
  min?: Maybe<Comments_Likes_Aggregated_Fields>;
  sum?: Maybe<Comments_Likes_Aggregated_Fields>;
  sumDistinct?: Maybe<Comments_Likes_Aggregated_Fields>;
};

export type Comments_Likes_Aggregated_Count = {
  __typename?: 'comments_likes_aggregated_count';
  comment?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  user?: Maybe<Scalars['Int']>;
};

export type Comments_Likes_Aggregated_Fields = {
  __typename?: 'comments_likes_aggregated_fields';
  comment?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

export type Comments_Likes_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Comments_Likes_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Comments_Likes_Filter>>>;
  comment?: InputMaybe<Comments_Filter>;
  id?: InputMaybe<Number_Filter_Operators>;
  user?: InputMaybe<Directus_Users_Filter>;
};

export type Count_Function_Filter_Operators = {
  count?: InputMaybe<Number_Filter_Operators>;
};

export type Count_Functions = {
  __typename?: 'count_functions';
  count?: Maybe<Scalars['Int']>;
};

export type Create_Articles_Input = {
  banner?: InputMaybe<Create_Directus_Files_Input>;
  category?: InputMaybe<Scalars['String']>;
  comments?: InputMaybe<Array<InputMaybe<Create_Comments_Input>>>;
  content?: InputMaybe<Scalars['JSON']>;
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  read_time?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  sub_title?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Comments_Input = {
  article_id?: InputMaybe<Create_Articles_Input>;
  comment?: InputMaybe<Scalars['String']>;
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  likes?: InputMaybe<Array<InputMaybe<Create_Comments_Likes_Input>>>;
  sort?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Comments_Likes_Input = {
  comment?: InputMaybe<Create_Comments_Input>;
  id?: InputMaybe<Scalars['ID']>;
  user?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Directus_Collections_Fields_Input = {
  collection?: InputMaybe<Scalars['String']>;
  field?: InputMaybe<Scalars['String']>;
  meta?: InputMaybe<Directus_Fields_Meta_Input>;
  schema?: InputMaybe<Directus_Fields_Schema_Input>;
  type?: InputMaybe<Scalars['String']>;
};

export type Create_Directus_Collections_Input = {
  collection?: InputMaybe<Scalars['String']>;
  fields?: InputMaybe<Array<Create_Directus_Collections_Fields_Input>>;
  meta?: InputMaybe<Directus_Collections_Meta_Input>;
  schema?: InputMaybe<Directus_Collections_Schema_Input>;
};

export type Create_Directus_Dashboards_Input = {
  color?: InputMaybe<Scalars['String']>;
  date_created?: InputMaybe<Scalars['Date']>;
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  panels?: InputMaybe<Array<InputMaybe<Create_Directus_Panels_Input>>>;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Directus_Fields_Input = {
  collection?: InputMaybe<Scalars['String']>;
  field?: InputMaybe<Scalars['String']>;
  meta?: InputMaybe<Directus_Fields_Meta_Input>;
  schema?: InputMaybe<Directus_Fields_Schema_Input>;
  type?: InputMaybe<Scalars['String']>;
};

export type Create_Directus_Files_Input = {
  charset?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  embed?: InputMaybe<Scalars['String']>;
  filename_disk?: InputMaybe<Scalars['String']>;
  filename_download: Scalars['String'];
  filesize?: InputMaybe<Scalars['String']>;
  folder?: InputMaybe<Create_Directus_Folders_Input>;
  height?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
  location?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['JSON']>;
  modified_by?: InputMaybe<Create_Directus_Users_Input>;
  modified_on?: InputMaybe<Scalars['Date']>;
  storage: Scalars['String'];
  tags?: InputMaybe<Scalars['JSON']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  uploaded_by?: InputMaybe<Create_Directus_Users_Input>;
  uploaded_on?: InputMaybe<Scalars['Date']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type Create_Directus_Flows_Input = {
  accountability?: InputMaybe<Scalars['String']>;
  color?: InputMaybe<Scalars['String']>;
  date_created?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  operation?: InputMaybe<Create_Directus_Operations_Input>;
  operations?: InputMaybe<Array<InputMaybe<Create_Directus_Operations_Input>>>;
  options?: InputMaybe<Scalars['JSON']>;
  status?: InputMaybe<Scalars['String']>;
  trigger?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Directus_Folders_Input = {
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  parent?: InputMaybe<Create_Directus_Folders_Input>;
};

export type Create_Directus_Notifications_Input = {
  collection?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  item?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<Scalars['String']>;
  recipient?: InputMaybe<Create_Directus_Users_Input>;
  sender?: InputMaybe<Create_Directus_Users_Input>;
  status?: InputMaybe<Scalars['String']>;
  subject: Scalars['String'];
  timestamp?: InputMaybe<Scalars['Date']>;
};

export type Create_Directus_Operations_Input = {
  date_created?: InputMaybe<Scalars['Date']>;
  flow?: InputMaybe<Create_Directus_Flows_Input>;
  id?: InputMaybe<Scalars['ID']>;
  key: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<Scalars['JSON']>;
  position_x: Scalars['Int'];
  position_y: Scalars['Int'];
  reject?: InputMaybe<Create_Directus_Operations_Input>;
  resolve?: InputMaybe<Create_Directus_Operations_Input>;
  type: Scalars['String'];
  user_created?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Directus_Panels_Input = {
  color?: InputMaybe<Scalars['String']>;
  dashboard?: InputMaybe<Create_Directus_Dashboards_Input>;
  date_created?: InputMaybe<Scalars['Date']>;
  height: Scalars['Int'];
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<Scalars['JSON']>;
  position_x: Scalars['Int'];
  position_y: Scalars['Int'];
  show_header: Scalars['Boolean'];
  type: Scalars['String'];
  user_created?: InputMaybe<Create_Directus_Users_Input>;
  width: Scalars['Int'];
};

export type Create_Directus_Permissions_Input = {
  action: Scalars['String'];
  collection: Scalars['String'];
  fields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id?: InputMaybe<Scalars['ID']>;
  permissions?: InputMaybe<Scalars['JSON']>;
  presets?: InputMaybe<Scalars['JSON']>;
  role?: InputMaybe<Create_Directus_Roles_Input>;
  validation?: InputMaybe<Scalars['JSON']>;
};

export type Create_Directus_Presets_Input = {
  bookmark?: InputMaybe<Scalars['String']>;
  collection?: InputMaybe<Scalars['String']>;
  color?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<Scalars['JSON']>;
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  layout?: InputMaybe<Scalars['String']>;
  layout_options?: InputMaybe<Scalars['JSON']>;
  layout_query?: InputMaybe<Scalars['JSON']>;
  refresh_interval?: InputMaybe<Scalars['Int']>;
  role?: InputMaybe<Create_Directus_Roles_Input>;
  search?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Directus_Relations_Input = {
  collection?: InputMaybe<Scalars['String']>;
  field?: InputMaybe<Scalars['String']>;
  meta?: InputMaybe<Directus_Relations_Meta_Input>;
  related_collection?: InputMaybe<Scalars['String']>;
  schema?: InputMaybe<Directus_Relations_Schema_Input>;
};

export type Create_Directus_Roles_Input = {
  admin_access: Scalars['Boolean'];
  app_access?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  enforce_tfa: Scalars['Boolean'];
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  ip_access?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name: Scalars['String'];
  users?: InputMaybe<Array<InputMaybe<Create_Directus_Users_Input>>>;
};

export type Create_Directus_Shares_Input = {
  collection?: InputMaybe<Scalars['String']>;
  date_created?: InputMaybe<Scalars['Date']>;
  /** $t:shared_leave_blank_for_unlimited */
  date_end?: InputMaybe<Scalars['Date']>;
  /** $t:shared_leave_blank_for_unlimited */
  date_start?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  item?: InputMaybe<Scalars['String']>;
  /** $t:shared_leave_blank_for_unlimited */
  max_uses?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  /** $t:shared_leave_blank_for_unlimited */
  password?: InputMaybe<Scalars['Hash']>;
  role?: InputMaybe<Create_Directus_Roles_Input>;
  times_used?: InputMaybe<Scalars['Int']>;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Directus_Users_Input = {
  auth_data?: InputMaybe<Scalars['JSON']>;
  avatar?: InputMaybe<Create_Directus_Files_Input>;
  code?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  email_notifications?: InputMaybe<Scalars['Boolean']>;
  external_identifier?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  language?: InputMaybe<Scalars['String']>;
  last_access?: InputMaybe<Scalars['Date']>;
  last_name?: InputMaybe<Scalars['String']>;
  last_page?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<Array<InputMaybe<Create_Comments_Likes_Input>>>;
  location?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['Hash']>;
  provider?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Create_Directus_Roles_Input>;
  status?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['JSON']>;
  tfa_secret?: InputMaybe<Scalars['Hash']>;
  theme?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['Hash']>;
};

export type Create_Directus_Webhooks_Input = {
  actions: Array<InputMaybe<Scalars['String']>>;
  collections: Array<InputMaybe<Scalars['String']>>;
  data?: InputMaybe<Scalars['Boolean']>;
  headers?: InputMaybe<Scalars['JSON']>;
  id?: InputMaybe<Scalars['ID']>;
  method?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  status?: InputMaybe<Scalars['String']>;
  url: Scalars['String'];
};

export type Date_Filter_Operators = {
  _between?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _nbetween?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _neq?: InputMaybe<Scalars['String']>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
  _null?: InputMaybe<Scalars['Boolean']>;
};

export type Datetime_Function_Filter_Operators = {
  day?: InputMaybe<Number_Filter_Operators>;
  hour?: InputMaybe<Number_Filter_Operators>;
  minute?: InputMaybe<Number_Filter_Operators>;
  month?: InputMaybe<Number_Filter_Operators>;
  second?: InputMaybe<Number_Filter_Operators>;
  week?: InputMaybe<Number_Filter_Operators>;
  weekday?: InputMaybe<Number_Filter_Operators>;
  year?: InputMaybe<Number_Filter_Operators>;
};

export type Datetime_Functions = {
  __typename?: 'datetime_functions';
  day?: Maybe<Scalars['Int']>;
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  week?: Maybe<Scalars['Int']>;
  weekday?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

export type Delete_Collection = {
  __typename?: 'delete_collection';
  collection?: Maybe<Scalars['String']>;
};

export type Delete_Field = {
  __typename?: 'delete_field';
  collection?: Maybe<Scalars['String']>;
  field?: Maybe<Scalars['String']>;
};

export type Delete_Many = {
  __typename?: 'delete_many';
  ids: Array<Maybe<Scalars['ID']>>;
};

export type Delete_One = {
  __typename?: 'delete_one';
  id: Scalars['ID'];
};

export type Delete_Relation = {
  __typename?: 'delete_relation';
  collection?: Maybe<Scalars['String']>;
  field?: Maybe<Scalars['String']>;
};

export type Directus_Activity = {
  __typename?: 'directus_activity';
  action: Scalars['String'];
  collection: Scalars['String'];
  comment?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  ip?: Maybe<Scalars['String']>;
  item: Scalars['String'];
  origin?: Maybe<Scalars['String']>;
  revisions?: Maybe<Array<Maybe<Directus_Revisions>>>;
  revisions_func?: Maybe<Count_Functions>;
  timestamp?: Maybe<Scalars['Date']>;
  timestamp_func?: Maybe<Datetime_Functions>;
  user?: Maybe<Directus_Users>;
  user_agent?: Maybe<Scalars['String']>;
};


export type Directus_ActivityRevisionsArgs = {
  filter?: InputMaybe<Directus_Revisions_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_ActivityUserArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Activity_Aggregated = {
  __typename?: 'directus_activity_aggregated';
  avg?: Maybe<Directus_Activity_Aggregated_Fields>;
  avgDistinct?: Maybe<Directus_Activity_Aggregated_Fields>;
  count?: Maybe<Directus_Activity_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Directus_Activity_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Directus_Activity_Aggregated_Fields>;
  min?: Maybe<Directus_Activity_Aggregated_Fields>;
  sum?: Maybe<Directus_Activity_Aggregated_Fields>;
  sumDistinct?: Maybe<Directus_Activity_Aggregated_Fields>;
};

export type Directus_Activity_Aggregated_Count = {
  __typename?: 'directus_activity_aggregated_count';
  action?: Maybe<Scalars['Int']>;
  collection?: Maybe<Scalars['Int']>;
  comment?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  ip?: Maybe<Scalars['Int']>;
  item?: Maybe<Scalars['Int']>;
  origin?: Maybe<Scalars['Int']>;
  revisions?: Maybe<Scalars['Int']>;
  timestamp?: Maybe<Scalars['Int']>;
  user?: Maybe<Scalars['Int']>;
  user_agent?: Maybe<Scalars['Int']>;
};

export type Directus_Activity_Aggregated_Fields = {
  __typename?: 'directus_activity_aggregated_fields';
  id?: Maybe<Scalars['Float']>;
};

export type Directus_Activity_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Activity_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Activity_Filter>>>;
  action?: InputMaybe<String_Filter_Operators>;
  collection?: InputMaybe<String_Filter_Operators>;
  comment?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  ip?: InputMaybe<String_Filter_Operators>;
  item?: InputMaybe<String_Filter_Operators>;
  origin?: InputMaybe<String_Filter_Operators>;
  revisions?: InputMaybe<Directus_Revisions_Filter>;
  revisions_func?: InputMaybe<Count_Function_Filter_Operators>;
  timestamp?: InputMaybe<Date_Filter_Operators>;
  timestamp_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  user?: InputMaybe<Directus_Users_Filter>;
  user_agent?: InputMaybe<String_Filter_Operators>;
};

export type Directus_Collections = {
  __typename?: 'directus_collections';
  collection?: Maybe<Scalars['String']>;
  meta?: Maybe<Directus_Collections_Meta>;
  schema?: Maybe<Directus_Collections_Schema>;
};

export type Directus_Collections_Meta = {
  __typename?: 'directus_collections_meta';
  accountability?: Maybe<Scalars['String']>;
  archive_app_filter: Scalars['Boolean'];
  archive_field?: Maybe<Scalars['String']>;
  archive_value?: Maybe<Scalars['String']>;
  collapse: Scalars['String'];
  collection: Scalars['String'];
  color?: Maybe<Scalars['String']>;
  display_template?: Maybe<Scalars['String']>;
  group?: Maybe<Scalars['String']>;
  hidden: Scalars['Boolean'];
  icon?: Maybe<Scalars['String']>;
  item_duplication_fields?: Maybe<Scalars['JSON']>;
  note?: Maybe<Scalars['String']>;
  singleton: Scalars['Boolean'];
  sort?: Maybe<Scalars['Int']>;
  sort_field?: Maybe<Scalars['String']>;
  translations?: Maybe<Scalars['JSON']>;
  unarchive_value?: Maybe<Scalars['String']>;
};

export type Directus_Collections_Meta_Input = {
  accountability?: InputMaybe<Scalars['String']>;
  archive_app_filter: Scalars['Boolean'];
  archive_field?: InputMaybe<Scalars['String']>;
  archive_value?: InputMaybe<Scalars['String']>;
  collapse: Scalars['String'];
  collection: Scalars['String'];
  color?: InputMaybe<Scalars['String']>;
  display_template?: InputMaybe<Scalars['String']>;
  group?: InputMaybe<Scalars['String']>;
  hidden: Scalars['Boolean'];
  icon?: InputMaybe<Scalars['String']>;
  item_duplication_fields?: InputMaybe<Scalars['JSON']>;
  note?: InputMaybe<Scalars['String']>;
  singleton: Scalars['Boolean'];
  sort?: InputMaybe<Scalars['Int']>;
  sort_field?: InputMaybe<Scalars['String']>;
  translations?: InputMaybe<Scalars['JSON']>;
  unarchive_value?: InputMaybe<Scalars['String']>;
};

export type Directus_Collections_Schema = {
  __typename?: 'directus_collections_schema';
  comment?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Directus_Collections_Schema_Input = {
  comment?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Directus_Dashboards = {
  __typename?: 'directus_dashboards';
  color?: Maybe<Scalars['String']>;
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  panels?: Maybe<Array<Maybe<Directus_Panels>>>;
  panels_func?: Maybe<Count_Functions>;
  user_created?: Maybe<Directus_Users>;
};


export type Directus_DashboardsPanelsArgs = {
  filter?: InputMaybe<Directus_Panels_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_DashboardsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Dashboards_Aggregated = {
  __typename?: 'directus_dashboards_aggregated';
  count?: Maybe<Directus_Dashboards_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Directus_Dashboards_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
};

export type Directus_Dashboards_Aggregated_Count = {
  __typename?: 'directus_dashboards_aggregated_count';
  color?: Maybe<Scalars['Int']>;
  date_created?: Maybe<Scalars['Int']>;
  icon?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
  note?: Maybe<Scalars['Int']>;
  panels?: Maybe<Scalars['Int']>;
  user_created?: Maybe<Scalars['Int']>;
};

export type Directus_Dashboards_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Dashboards_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Dashboards_Filter>>>;
  color?: InputMaybe<String_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  note?: InputMaybe<String_Filter_Operators>;
  panels?: InputMaybe<Directus_Panels_Filter>;
  panels_func?: InputMaybe<Count_Function_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
};

export type Directus_Fields = {
  __typename?: 'directus_fields';
  collection?: Maybe<Scalars['String']>;
  field?: Maybe<Scalars['String']>;
  meta?: Maybe<Directus_Fields_Meta>;
  schema?: Maybe<Directus_Fields_Schema>;
  type?: Maybe<Scalars['String']>;
};

export type Directus_Fields_Meta = {
  __typename?: 'directus_fields_meta';
  collection: Scalars['String'];
  conditions?: Maybe<Scalars['JSON']>;
  display?: Maybe<Scalars['String']>;
  display_options?: Maybe<Scalars['JSON']>;
  field: Scalars['String'];
  group?: Maybe<Scalars['String']>;
  hidden: Scalars['Boolean'];
  id: Scalars['Int'];
  interface?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  options?: Maybe<Scalars['JSON']>;
  readonly: Scalars['Boolean'];
  required?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Scalars['Int']>;
  special?: Maybe<Array<Maybe<Scalars['String']>>>;
  translations?: Maybe<Scalars['JSON']>;
  validation?: Maybe<Scalars['JSON']>;
  validation_message?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['String']>;
};

export type Directus_Fields_Meta_Input = {
  collection: Scalars['String'];
  conditions?: InputMaybe<Scalars['JSON']>;
  display?: InputMaybe<Scalars['String']>;
  display_options?: InputMaybe<Scalars['JSON']>;
  field: Scalars['String'];
  group?: InputMaybe<Scalars['String']>;
  hidden: Scalars['Boolean'];
  id: Scalars['Int'];
  interface?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<Scalars['JSON']>;
  readonly: Scalars['Boolean'];
  required?: InputMaybe<Scalars['Boolean']>;
  sort?: InputMaybe<Scalars['Int']>;
  special?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  translations?: InputMaybe<Scalars['JSON']>;
  validation?: InputMaybe<Scalars['JSON']>;
  validation_message?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['String']>;
};

export type Directus_Fields_Schema = {
  __typename?: 'directus_fields_schema';
  comment?: Maybe<Scalars['String']>;
  data_type?: Maybe<Scalars['String']>;
  default_value?: Maybe<Scalars['String']>;
  foreign_key_column?: Maybe<Scalars['String']>;
  foreign_key_table?: Maybe<Scalars['String']>;
  has_auto_increment?: Maybe<Scalars['Boolean']>;
  is_nullable?: Maybe<Scalars['Boolean']>;
  is_primary_key?: Maybe<Scalars['Boolean']>;
  is_unique?: Maybe<Scalars['Boolean']>;
  max_length?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  numeric_precision?: Maybe<Scalars['Int']>;
  numeric_scale?: Maybe<Scalars['Int']>;
  table?: Maybe<Scalars['String']>;
};

export type Directus_Fields_Schema_Input = {
  comment?: InputMaybe<Scalars['String']>;
  data_type?: InputMaybe<Scalars['String']>;
  default_value?: InputMaybe<Scalars['String']>;
  foreign_key_column?: InputMaybe<Scalars['String']>;
  foreign_key_table?: InputMaybe<Scalars['String']>;
  has_auto_increment?: InputMaybe<Scalars['Boolean']>;
  is_nullable?: InputMaybe<Scalars['Boolean']>;
  is_primary_key?: InputMaybe<Scalars['Boolean']>;
  is_unique?: InputMaybe<Scalars['Boolean']>;
  max_length?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  numeric_precision?: InputMaybe<Scalars['Int']>;
  numeric_scale?: InputMaybe<Scalars['Int']>;
  table?: InputMaybe<Scalars['String']>;
};

export type Directus_Files = {
  __typename?: 'directus_files';
  charset?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  embed?: Maybe<Scalars['String']>;
  filename_disk?: Maybe<Scalars['String']>;
  filename_download: Scalars['String'];
  filesize?: Maybe<Scalars['String']>;
  folder?: Maybe<Directus_Folders>;
  height?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  location?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
  metadata_func?: Maybe<Count_Functions>;
  modified_by?: Maybe<Directus_Users>;
  modified_on?: Maybe<Scalars['Date']>;
  modified_on_func?: Maybe<Datetime_Functions>;
  storage: Scalars['String'];
  tags?: Maybe<Scalars['JSON']>;
  tags_func?: Maybe<Count_Functions>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  uploaded_by?: Maybe<Directus_Users>;
  uploaded_on?: Maybe<Scalars['Date']>;
  uploaded_on_func?: Maybe<Datetime_Functions>;
  width?: Maybe<Scalars['Int']>;
};


export type Directus_FilesFolderArgs = {
  filter?: InputMaybe<Directus_Folders_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_FilesModified_ByArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_FilesUploaded_ByArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Files_Aggregated = {
  __typename?: 'directus_files_aggregated';
  avg?: Maybe<Directus_Files_Aggregated_Fields>;
  avgDistinct?: Maybe<Directus_Files_Aggregated_Fields>;
  count?: Maybe<Directus_Files_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Directus_Files_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Directus_Files_Aggregated_Fields>;
  min?: Maybe<Directus_Files_Aggregated_Fields>;
  sum?: Maybe<Directus_Files_Aggregated_Fields>;
  sumDistinct?: Maybe<Directus_Files_Aggregated_Fields>;
};

export type Directus_Files_Aggregated_Count = {
  __typename?: 'directus_files_aggregated_count';
  charset?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['Int']>;
  duration?: Maybe<Scalars['Int']>;
  embed?: Maybe<Scalars['Int']>;
  filename_disk?: Maybe<Scalars['Int']>;
  filename_download?: Maybe<Scalars['Int']>;
  filesize?: Maybe<Scalars['Int']>;
  folder?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  location?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['Int']>;
  modified_by?: Maybe<Scalars['Int']>;
  modified_on?: Maybe<Scalars['Int']>;
  storage?: Maybe<Scalars['Int']>;
  tags?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
  uploaded_by?: Maybe<Scalars['Int']>;
  uploaded_on?: Maybe<Scalars['Int']>;
  width?: Maybe<Scalars['Int']>;
};

export type Directus_Files_Aggregated_Fields = {
  __typename?: 'directus_files_aggregated_fields';
  duration?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type Directus_Files_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Files_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Files_Filter>>>;
  charset?: InputMaybe<String_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  duration?: InputMaybe<Number_Filter_Operators>;
  embed?: InputMaybe<String_Filter_Operators>;
  filename_disk?: InputMaybe<String_Filter_Operators>;
  filename_download?: InputMaybe<String_Filter_Operators>;
  filesize?: InputMaybe<String_Filter_Operators>;
  folder?: InputMaybe<Directus_Folders_Filter>;
  height?: InputMaybe<Number_Filter_Operators>;
  id?: InputMaybe<String_Filter_Operators>;
  location?: InputMaybe<String_Filter_Operators>;
  metadata?: InputMaybe<String_Filter_Operators>;
  metadata_func?: InputMaybe<Count_Function_Filter_Operators>;
  modified_by?: InputMaybe<Directus_Users_Filter>;
  modified_on?: InputMaybe<Date_Filter_Operators>;
  modified_on_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  storage?: InputMaybe<String_Filter_Operators>;
  tags?: InputMaybe<String_Filter_Operators>;
  tags_func?: InputMaybe<Count_Function_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  type?: InputMaybe<String_Filter_Operators>;
  uploaded_by?: InputMaybe<Directus_Users_Filter>;
  uploaded_on?: InputMaybe<Date_Filter_Operators>;
  uploaded_on_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  width?: InputMaybe<Number_Filter_Operators>;
};

export type Directus_Flows = {
  __typename?: 'directus_flows';
  accountability?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  operation?: Maybe<Directus_Operations>;
  operations?: Maybe<Array<Maybe<Directus_Operations>>>;
  operations_func?: Maybe<Count_Functions>;
  options?: Maybe<Scalars['JSON']>;
  options_func?: Maybe<Count_Functions>;
  status?: Maybe<Scalars['String']>;
  trigger?: Maybe<Scalars['String']>;
  user_created?: Maybe<Directus_Users>;
};


export type Directus_FlowsOperationArgs = {
  filter?: InputMaybe<Directus_Operations_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_FlowsOperationsArgs = {
  filter?: InputMaybe<Directus_Operations_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_FlowsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Flows_Aggregated = {
  __typename?: 'directus_flows_aggregated';
  count?: Maybe<Directus_Flows_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Directus_Flows_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
};

export type Directus_Flows_Aggregated_Count = {
  __typename?: 'directus_flows_aggregated_count';
  accountability?: Maybe<Scalars['Int']>;
  color?: Maybe<Scalars['Int']>;
  date_created?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['Int']>;
  icon?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
  operation?: Maybe<Scalars['Int']>;
  operations?: Maybe<Scalars['Int']>;
  options?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  trigger?: Maybe<Scalars['Int']>;
  user_created?: Maybe<Scalars['Int']>;
};

export type Directus_Flows_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Flows_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Flows_Filter>>>;
  accountability?: InputMaybe<String_Filter_Operators>;
  color?: InputMaybe<String_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  operation?: InputMaybe<Directus_Operations_Filter>;
  operations?: InputMaybe<Directus_Operations_Filter>;
  operations_func?: InputMaybe<Count_Function_Filter_Operators>;
  options?: InputMaybe<String_Filter_Operators>;
  options_func?: InputMaybe<Count_Function_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  trigger?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
};

export type Directus_Folders = {
  __typename?: 'directus_folders';
  id: Scalars['ID'];
  name: Scalars['String'];
  parent?: Maybe<Directus_Folders>;
};


export type Directus_FoldersParentArgs = {
  filter?: InputMaybe<Directus_Folders_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Folders_Aggregated = {
  __typename?: 'directus_folders_aggregated';
  count?: Maybe<Directus_Folders_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Directus_Folders_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
};

export type Directus_Folders_Aggregated_Count = {
  __typename?: 'directus_folders_aggregated_count';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
  parent?: Maybe<Scalars['Int']>;
};

export type Directus_Folders_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Folders_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Folders_Filter>>>;
  id?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  parent?: InputMaybe<Directus_Folders_Filter>;
};

export type Directus_Notifications = {
  __typename?: 'directus_notifications';
  collection?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  item?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  recipient?: Maybe<Directus_Users>;
  sender?: Maybe<Directus_Users>;
  status?: Maybe<Scalars['String']>;
  subject: Scalars['String'];
  timestamp?: Maybe<Scalars['Date']>;
  timestamp_func?: Maybe<Datetime_Functions>;
};


export type Directus_NotificationsRecipientArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_NotificationsSenderArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Notifications_Aggregated = {
  __typename?: 'directus_notifications_aggregated';
  avg?: Maybe<Directus_Notifications_Aggregated_Fields>;
  avgDistinct?: Maybe<Directus_Notifications_Aggregated_Fields>;
  count?: Maybe<Directus_Notifications_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Directus_Notifications_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Directus_Notifications_Aggregated_Fields>;
  min?: Maybe<Directus_Notifications_Aggregated_Fields>;
  sum?: Maybe<Directus_Notifications_Aggregated_Fields>;
  sumDistinct?: Maybe<Directus_Notifications_Aggregated_Fields>;
};

export type Directus_Notifications_Aggregated_Count = {
  __typename?: 'directus_notifications_aggregated_count';
  collection?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  item?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['Int']>;
  recipient?: Maybe<Scalars['Int']>;
  sender?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  subject?: Maybe<Scalars['Int']>;
  timestamp?: Maybe<Scalars['Int']>;
};

export type Directus_Notifications_Aggregated_Fields = {
  __typename?: 'directus_notifications_aggregated_fields';
  id?: Maybe<Scalars['Float']>;
};

export type Directus_Notifications_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Notifications_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Notifications_Filter>>>;
  collection?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  item?: InputMaybe<String_Filter_Operators>;
  message?: InputMaybe<String_Filter_Operators>;
  recipient?: InputMaybe<Directus_Users_Filter>;
  sender?: InputMaybe<Directus_Users_Filter>;
  status?: InputMaybe<String_Filter_Operators>;
  subject?: InputMaybe<String_Filter_Operators>;
  timestamp?: InputMaybe<Date_Filter_Operators>;
  timestamp_func?: InputMaybe<Datetime_Function_Filter_Operators>;
};

export type Directus_Operations = {
  __typename?: 'directus_operations';
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  flow?: Maybe<Directus_Flows>;
  id: Scalars['ID'];
  key: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  options?: Maybe<Scalars['JSON']>;
  options_func?: Maybe<Count_Functions>;
  position_x: Scalars['Int'];
  position_y: Scalars['Int'];
  reject?: Maybe<Directus_Operations>;
  resolve?: Maybe<Directus_Operations>;
  type: Scalars['String'];
  user_created?: Maybe<Directus_Users>;
};


export type Directus_OperationsFlowArgs = {
  filter?: InputMaybe<Directus_Flows_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_OperationsRejectArgs = {
  filter?: InputMaybe<Directus_Operations_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_OperationsResolveArgs = {
  filter?: InputMaybe<Directus_Operations_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_OperationsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Operations_Aggregated = {
  __typename?: 'directus_operations_aggregated';
  avg?: Maybe<Directus_Operations_Aggregated_Fields>;
  avgDistinct?: Maybe<Directus_Operations_Aggregated_Fields>;
  count?: Maybe<Directus_Operations_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Directus_Operations_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Directus_Operations_Aggregated_Fields>;
  min?: Maybe<Directus_Operations_Aggregated_Fields>;
  sum?: Maybe<Directus_Operations_Aggregated_Fields>;
  sumDistinct?: Maybe<Directus_Operations_Aggregated_Fields>;
};

export type Directus_Operations_Aggregated_Count = {
  __typename?: 'directus_operations_aggregated_count';
  date_created?: Maybe<Scalars['Int']>;
  flow?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  key?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
  options?: Maybe<Scalars['Int']>;
  position_x?: Maybe<Scalars['Int']>;
  position_y?: Maybe<Scalars['Int']>;
  reject?: Maybe<Scalars['Int']>;
  resolve?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
  user_created?: Maybe<Scalars['Int']>;
};

export type Directus_Operations_Aggregated_Fields = {
  __typename?: 'directus_operations_aggregated_fields';
  position_x?: Maybe<Scalars['Float']>;
  position_y?: Maybe<Scalars['Float']>;
};

export type Directus_Operations_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Operations_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Operations_Filter>>>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  flow?: InputMaybe<Directus_Flows_Filter>;
  id?: InputMaybe<String_Filter_Operators>;
  key?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  options?: InputMaybe<String_Filter_Operators>;
  options_func?: InputMaybe<Count_Function_Filter_Operators>;
  position_x?: InputMaybe<Number_Filter_Operators>;
  position_y?: InputMaybe<Number_Filter_Operators>;
  reject?: InputMaybe<Directus_Operations_Filter>;
  resolve?: InputMaybe<Directus_Operations_Filter>;
  type?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
};

export type Directus_Panels = {
  __typename?: 'directus_panels';
  color?: Maybe<Scalars['String']>;
  dashboard?: Maybe<Directus_Dashboards>;
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  height: Scalars['Int'];
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  options?: Maybe<Scalars['JSON']>;
  options_func?: Maybe<Count_Functions>;
  position_x: Scalars['Int'];
  position_y: Scalars['Int'];
  show_header: Scalars['Boolean'];
  type: Scalars['String'];
  user_created?: Maybe<Directus_Users>;
  width: Scalars['Int'];
};


export type Directus_PanelsDashboardArgs = {
  filter?: InputMaybe<Directus_Dashboards_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_PanelsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Panels_Aggregated = {
  __typename?: 'directus_panels_aggregated';
  avg?: Maybe<Directus_Panels_Aggregated_Fields>;
  avgDistinct?: Maybe<Directus_Panels_Aggregated_Fields>;
  count?: Maybe<Directus_Panels_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Directus_Panels_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Directus_Panels_Aggregated_Fields>;
  min?: Maybe<Directus_Panels_Aggregated_Fields>;
  sum?: Maybe<Directus_Panels_Aggregated_Fields>;
  sumDistinct?: Maybe<Directus_Panels_Aggregated_Fields>;
};

export type Directus_Panels_Aggregated_Count = {
  __typename?: 'directus_panels_aggregated_count';
  color?: Maybe<Scalars['Int']>;
  dashboard?: Maybe<Scalars['Int']>;
  date_created?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  icon?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
  note?: Maybe<Scalars['Int']>;
  options?: Maybe<Scalars['Int']>;
  position_x?: Maybe<Scalars['Int']>;
  position_y?: Maybe<Scalars['Int']>;
  show_header?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
  user_created?: Maybe<Scalars['Int']>;
  width?: Maybe<Scalars['Int']>;
};

export type Directus_Panels_Aggregated_Fields = {
  __typename?: 'directus_panels_aggregated_fields';
  height?: Maybe<Scalars['Float']>;
  position_x?: Maybe<Scalars['Float']>;
  position_y?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type Directus_Panels_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Panels_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Panels_Filter>>>;
  color?: InputMaybe<String_Filter_Operators>;
  dashboard?: InputMaybe<Directus_Dashboards_Filter>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  height?: InputMaybe<Number_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  note?: InputMaybe<String_Filter_Operators>;
  options?: InputMaybe<String_Filter_Operators>;
  options_func?: InputMaybe<Count_Function_Filter_Operators>;
  position_x?: InputMaybe<Number_Filter_Operators>;
  position_y?: InputMaybe<Number_Filter_Operators>;
  show_header?: InputMaybe<Boolean_Filter_Operators>;
  type?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  width?: InputMaybe<Number_Filter_Operators>;
};

export type Directus_Permissions = {
  __typename?: 'directus_permissions';
  action: Scalars['String'];
  collection: Scalars['String'];
  fields?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['ID'];
  permissions?: Maybe<Scalars['JSON']>;
  permissions_func?: Maybe<Count_Functions>;
  presets?: Maybe<Scalars['JSON']>;
  presets_func?: Maybe<Count_Functions>;
  role?: Maybe<Directus_Roles>;
  validation?: Maybe<Scalars['JSON']>;
  validation_func?: Maybe<Count_Functions>;
};


export type Directus_PermissionsRoleArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Permissions_Aggregated = {
  __typename?: 'directus_permissions_aggregated';
  avg?: Maybe<Directus_Permissions_Aggregated_Fields>;
  avgDistinct?: Maybe<Directus_Permissions_Aggregated_Fields>;
  count?: Maybe<Directus_Permissions_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Directus_Permissions_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Directus_Permissions_Aggregated_Fields>;
  min?: Maybe<Directus_Permissions_Aggregated_Fields>;
  sum?: Maybe<Directus_Permissions_Aggregated_Fields>;
  sumDistinct?: Maybe<Directus_Permissions_Aggregated_Fields>;
};

export type Directus_Permissions_Aggregated_Count = {
  __typename?: 'directus_permissions_aggregated_count';
  action?: Maybe<Scalars['Int']>;
  collection?: Maybe<Scalars['Int']>;
  fields?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  permissions?: Maybe<Scalars['Int']>;
  presets?: Maybe<Scalars['Int']>;
  role?: Maybe<Scalars['Int']>;
  validation?: Maybe<Scalars['Int']>;
};

export type Directus_Permissions_Aggregated_Fields = {
  __typename?: 'directus_permissions_aggregated_fields';
  id?: Maybe<Scalars['Float']>;
};

export type Directus_Permissions_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Permissions_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Permissions_Filter>>>;
  action?: InputMaybe<String_Filter_Operators>;
  collection?: InputMaybe<String_Filter_Operators>;
  fields?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  permissions?: InputMaybe<String_Filter_Operators>;
  permissions_func?: InputMaybe<Count_Function_Filter_Operators>;
  presets?: InputMaybe<String_Filter_Operators>;
  presets_func?: InputMaybe<Count_Function_Filter_Operators>;
  role?: InputMaybe<Directus_Roles_Filter>;
  validation?: InputMaybe<String_Filter_Operators>;
  validation_func?: InputMaybe<Count_Function_Filter_Operators>;
};

export type Directus_Presets = {
  __typename?: 'directus_presets';
  bookmark?: Maybe<Scalars['String']>;
  collection?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  filter?: Maybe<Scalars['JSON']>;
  filter_func?: Maybe<Count_Functions>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  layout?: Maybe<Scalars['String']>;
  layout_options?: Maybe<Scalars['JSON']>;
  layout_options_func?: Maybe<Count_Functions>;
  layout_query?: Maybe<Scalars['JSON']>;
  layout_query_func?: Maybe<Count_Functions>;
  refresh_interval?: Maybe<Scalars['Int']>;
  role?: Maybe<Directus_Roles>;
  search?: Maybe<Scalars['String']>;
  user?: Maybe<Directus_Users>;
};


export type Directus_PresetsRoleArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_PresetsUserArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Presets_Aggregated = {
  __typename?: 'directus_presets_aggregated';
  avg?: Maybe<Directus_Presets_Aggregated_Fields>;
  avgDistinct?: Maybe<Directus_Presets_Aggregated_Fields>;
  count?: Maybe<Directus_Presets_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Directus_Presets_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Directus_Presets_Aggregated_Fields>;
  min?: Maybe<Directus_Presets_Aggregated_Fields>;
  sum?: Maybe<Directus_Presets_Aggregated_Fields>;
  sumDistinct?: Maybe<Directus_Presets_Aggregated_Fields>;
};

export type Directus_Presets_Aggregated_Count = {
  __typename?: 'directus_presets_aggregated_count';
  bookmark?: Maybe<Scalars['Int']>;
  collection?: Maybe<Scalars['Int']>;
  color?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['Int']>;
  icon?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  layout?: Maybe<Scalars['Int']>;
  layout_options?: Maybe<Scalars['Int']>;
  layout_query?: Maybe<Scalars['Int']>;
  refresh_interval?: Maybe<Scalars['Int']>;
  role?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['Int']>;
  user?: Maybe<Scalars['Int']>;
};

export type Directus_Presets_Aggregated_Fields = {
  __typename?: 'directus_presets_aggregated_fields';
  id?: Maybe<Scalars['Float']>;
  refresh_interval?: Maybe<Scalars['Float']>;
};

export type Directus_Presets_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Presets_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Presets_Filter>>>;
  bookmark?: InputMaybe<String_Filter_Operators>;
  collection?: InputMaybe<String_Filter_Operators>;
  color?: InputMaybe<String_Filter_Operators>;
  filter?: InputMaybe<String_Filter_Operators>;
  filter_func?: InputMaybe<Count_Function_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  layout?: InputMaybe<String_Filter_Operators>;
  layout_options?: InputMaybe<String_Filter_Operators>;
  layout_options_func?: InputMaybe<Count_Function_Filter_Operators>;
  layout_query?: InputMaybe<String_Filter_Operators>;
  layout_query_func?: InputMaybe<Count_Function_Filter_Operators>;
  refresh_interval?: InputMaybe<Number_Filter_Operators>;
  role?: InputMaybe<Directus_Roles_Filter>;
  search?: InputMaybe<String_Filter_Operators>;
  user?: InputMaybe<Directus_Users_Filter>;
};

export type Directus_Relations = {
  __typename?: 'directus_relations';
  collection?: Maybe<Scalars['String']>;
  field?: Maybe<Scalars['String']>;
  meta?: Maybe<Directus_Relations_Meta>;
  related_collection?: Maybe<Scalars['String']>;
  schema?: Maybe<Directus_Relations_Schema>;
};

export type Directus_Relations_Meta = {
  __typename?: 'directus_relations_meta';
  id?: Maybe<Scalars['Int']>;
  junction_field?: Maybe<Scalars['String']>;
  many_collection?: Maybe<Scalars['String']>;
  many_field?: Maybe<Scalars['String']>;
  one_allowed_collections?: Maybe<Array<Maybe<Scalars['String']>>>;
  one_collection?: Maybe<Scalars['String']>;
  one_collection_field?: Maybe<Scalars['String']>;
  one_deselect_action?: Maybe<Scalars['String']>;
  one_field?: Maybe<Scalars['String']>;
  sort_field?: Maybe<Scalars['String']>;
};

export type Directus_Relations_Meta_Input = {
  id?: InputMaybe<Scalars['Int']>;
  junction_field?: InputMaybe<Scalars['String']>;
  many_collection?: InputMaybe<Scalars['String']>;
  many_field?: InputMaybe<Scalars['String']>;
  one_allowed_collections?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  one_collection?: InputMaybe<Scalars['String']>;
  one_collection_field?: InputMaybe<Scalars['String']>;
  one_deselect_action?: InputMaybe<Scalars['String']>;
  one_field?: InputMaybe<Scalars['String']>;
  sort_field?: InputMaybe<Scalars['String']>;
};

export type Directus_Relations_Schema = {
  __typename?: 'directus_relations_schema';
  column: Scalars['String'];
  constraint_name?: Maybe<Scalars['String']>;
  foreign_key_column: Scalars['String'];
  foreign_key_table: Scalars['String'];
  on_delete: Scalars['String'];
  on_update: Scalars['String'];
  table: Scalars['String'];
};

export type Directus_Relations_Schema_Input = {
  column: Scalars['String'];
  constraint_name?: InputMaybe<Scalars['String']>;
  foreign_key_column: Scalars['String'];
  foreign_key_table: Scalars['String'];
  on_delete: Scalars['String'];
  on_update: Scalars['String'];
  table: Scalars['String'];
};

export type Directus_Revisions = {
  __typename?: 'directus_revisions';
  activity?: Maybe<Directus_Activity>;
  collection: Scalars['String'];
  data?: Maybe<Scalars['JSON']>;
  data_func?: Maybe<Count_Functions>;
  delta?: Maybe<Scalars['JSON']>;
  delta_func?: Maybe<Count_Functions>;
  id: Scalars['ID'];
  item: Scalars['String'];
  parent?: Maybe<Directus_Revisions>;
};


export type Directus_RevisionsActivityArgs = {
  filter?: InputMaybe<Directus_Activity_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_RevisionsParentArgs = {
  filter?: InputMaybe<Directus_Revisions_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Revisions_Aggregated = {
  __typename?: 'directus_revisions_aggregated';
  avg?: Maybe<Directus_Revisions_Aggregated_Fields>;
  avgDistinct?: Maybe<Directus_Revisions_Aggregated_Fields>;
  count?: Maybe<Directus_Revisions_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Directus_Revisions_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Directus_Revisions_Aggregated_Fields>;
  min?: Maybe<Directus_Revisions_Aggregated_Fields>;
  sum?: Maybe<Directus_Revisions_Aggregated_Fields>;
  sumDistinct?: Maybe<Directus_Revisions_Aggregated_Fields>;
};

export type Directus_Revisions_Aggregated_Count = {
  __typename?: 'directus_revisions_aggregated_count';
  activity?: Maybe<Scalars['Int']>;
  collection?: Maybe<Scalars['Int']>;
  data?: Maybe<Scalars['Int']>;
  delta?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  item?: Maybe<Scalars['Int']>;
  parent?: Maybe<Scalars['Int']>;
};

export type Directus_Revisions_Aggregated_Fields = {
  __typename?: 'directus_revisions_aggregated_fields';
  activity?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  parent?: Maybe<Scalars['Float']>;
};

export type Directus_Revisions_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Revisions_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Revisions_Filter>>>;
  activity?: InputMaybe<Directus_Activity_Filter>;
  collection?: InputMaybe<String_Filter_Operators>;
  data?: InputMaybe<String_Filter_Operators>;
  data_func?: InputMaybe<Count_Function_Filter_Operators>;
  delta?: InputMaybe<String_Filter_Operators>;
  delta_func?: InputMaybe<Count_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  item?: InputMaybe<String_Filter_Operators>;
  parent?: InputMaybe<Directus_Revisions_Filter>;
};

export type Directus_Roles = {
  __typename?: 'directus_roles';
  admin_access: Scalars['Boolean'];
  app_access?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  enforce_tfa: Scalars['Boolean'];
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  ip_access?: Maybe<Array<Maybe<Scalars['String']>>>;
  name: Scalars['String'];
  users?: Maybe<Array<Maybe<Directus_Users>>>;
  users_func?: Maybe<Count_Functions>;
};


export type Directus_RolesUsersArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Roles_Aggregated = {
  __typename?: 'directus_roles_aggregated';
  count?: Maybe<Directus_Roles_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Directus_Roles_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
};

export type Directus_Roles_Aggregated_Count = {
  __typename?: 'directus_roles_aggregated_count';
  admin_access?: Maybe<Scalars['Int']>;
  app_access?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['Int']>;
  enforce_tfa?: Maybe<Scalars['Int']>;
  icon?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  ip_access?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
  users?: Maybe<Scalars['Int']>;
};

export type Directus_Roles_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Roles_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Roles_Filter>>>;
  admin_access?: InputMaybe<Boolean_Filter_Operators>;
  app_access?: InputMaybe<Boolean_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  enforce_tfa?: InputMaybe<Boolean_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<String_Filter_Operators>;
  ip_access?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  users?: InputMaybe<Directus_Users_Filter>;
  users_func?: InputMaybe<Count_Function_Filter_Operators>;
};

export type Directus_Settings = {
  __typename?: 'directus_settings';
  auth_login_attempts?: Maybe<Scalars['Int']>;
  auth_password_policy?: Maybe<Scalars['String']>;
  basemaps?: Maybe<Scalars['JSON']>;
  basemaps_func?: Maybe<Count_Functions>;
  custom_aspect_ratios?: Maybe<Scalars['JSON']>;
  custom_aspect_ratios_func?: Maybe<Count_Functions>;
  custom_css?: Maybe<Scalars['String']>;
  default_language?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  mapbox_key?: Maybe<Scalars['String']>;
  module_bar?: Maybe<Scalars['JSON']>;
  module_bar_func?: Maybe<Count_Functions>;
  /** $t:field_options.directus_settings.project_color_note */
  project_color?: Maybe<Scalars['String']>;
  project_descriptor?: Maybe<Scalars['String']>;
  project_logo?: Maybe<Directus_Files>;
  project_name?: Maybe<Scalars['String']>;
  project_url?: Maybe<Scalars['String']>;
  public_background?: Maybe<Directus_Files>;
  public_foreground?: Maybe<Directus_Files>;
  public_note?: Maybe<Scalars['String']>;
  storage_asset_presets?: Maybe<Scalars['JSON']>;
  storage_asset_presets_func?: Maybe<Count_Functions>;
  storage_asset_transform?: Maybe<Scalars['String']>;
  storage_default_folder?: Maybe<Directus_Folders>;
  translation_strings?: Maybe<Scalars['JSON']>;
  translation_strings_func?: Maybe<Count_Functions>;
};


export type Directus_SettingsProject_LogoArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_SettingsPublic_BackgroundArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_SettingsPublic_ForegroundArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_SettingsStorage_Default_FolderArgs = {
  filter?: InputMaybe<Directus_Folders_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Shares = {
  __typename?: 'directus_shares';
  collection?: Maybe<Scalars['String']>;
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  /** $t:shared_leave_blank_for_unlimited */
  date_end?: Maybe<Scalars['Date']>;
  date_end_func?: Maybe<Datetime_Functions>;
  /** $t:shared_leave_blank_for_unlimited */
  date_start?: Maybe<Scalars['Date']>;
  date_start_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID'];
  item?: Maybe<Scalars['String']>;
  /** $t:shared_leave_blank_for_unlimited */
  max_uses?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  /** $t:shared_leave_blank_for_unlimited */
  password?: Maybe<Scalars['Hash']>;
  role?: Maybe<Directus_Roles>;
  times_used?: Maybe<Scalars['Int']>;
  user_created?: Maybe<Directus_Users>;
};


export type Directus_SharesRoleArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_SharesUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Shares_Aggregated = {
  __typename?: 'directus_shares_aggregated';
  avg?: Maybe<Directus_Shares_Aggregated_Fields>;
  avgDistinct?: Maybe<Directus_Shares_Aggregated_Fields>;
  count?: Maybe<Directus_Shares_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Directus_Shares_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Directus_Shares_Aggregated_Fields>;
  min?: Maybe<Directus_Shares_Aggregated_Fields>;
  sum?: Maybe<Directus_Shares_Aggregated_Fields>;
  sumDistinct?: Maybe<Directus_Shares_Aggregated_Fields>;
};

export type Directus_Shares_Aggregated_Count = {
  __typename?: 'directus_shares_aggregated_count';
  collection?: Maybe<Scalars['Int']>;
  date_created?: Maybe<Scalars['Int']>;
  /** $t:shared_leave_blank_for_unlimited */
  date_end?: Maybe<Scalars['Int']>;
  /** $t:shared_leave_blank_for_unlimited */
  date_start?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  item?: Maybe<Scalars['Int']>;
  /** $t:shared_leave_blank_for_unlimited */
  max_uses?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
  /** $t:shared_leave_blank_for_unlimited */
  password?: Maybe<Scalars['Int']>;
  role?: Maybe<Scalars['Int']>;
  times_used?: Maybe<Scalars['Int']>;
  user_created?: Maybe<Scalars['Int']>;
};

export type Directus_Shares_Aggregated_Fields = {
  __typename?: 'directus_shares_aggregated_fields';
  /** $t:shared_leave_blank_for_unlimited */
  max_uses?: Maybe<Scalars['Float']>;
  times_used?: Maybe<Scalars['Float']>;
};

export type Directus_Shares_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Shares_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Shares_Filter>>>;
  collection?: InputMaybe<String_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_end?: InputMaybe<Date_Filter_Operators>;
  date_end_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_start?: InputMaybe<Date_Filter_Operators>;
  date_start_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  id?: InputMaybe<String_Filter_Operators>;
  item?: InputMaybe<String_Filter_Operators>;
  max_uses?: InputMaybe<Number_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  password?: InputMaybe<Hash_Filter_Operators>;
  role?: InputMaybe<Directus_Roles_Filter>;
  times_used?: InputMaybe<Number_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
};

export type Directus_Users = {
  __typename?: 'directus_users';
  auth_data?: Maybe<Scalars['JSON']>;
  auth_data_func?: Maybe<Count_Functions>;
  avatar?: Maybe<Directus_Files>;
  code?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  email_notifications?: Maybe<Scalars['Boolean']>;
  external_identifier?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  language?: Maybe<Scalars['String']>;
  last_access?: Maybe<Scalars['Date']>;
  last_access_func?: Maybe<Datetime_Functions>;
  last_name?: Maybe<Scalars['String']>;
  last_page?: Maybe<Scalars['String']>;
  likes?: Maybe<Array<Maybe<Comments_Likes>>>;
  likes_func?: Maybe<Count_Functions>;
  location?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['Hash']>;
  provider?: Maybe<Scalars['String']>;
  role?: Maybe<Directus_Roles>;
  status?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['JSON']>;
  tags_func?: Maybe<Count_Functions>;
  tfa_secret?: Maybe<Scalars['Hash']>;
  theme?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['Hash']>;
};


export type Directus_UsersAvatarArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_UsersLikesArgs = {
  filter?: InputMaybe<Comments_Likes_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_UsersRoleArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Users_Aggregated = {
  __typename?: 'directus_users_aggregated';
  count?: Maybe<Directus_Users_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Directus_Users_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
};

export type Directus_Users_Aggregated_Count = {
  __typename?: 'directus_users_aggregated_count';
  auth_data?: Maybe<Scalars['Int']>;
  avatar?: Maybe<Scalars['Int']>;
  code?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['Int']>;
  email_notifications?: Maybe<Scalars['Int']>;
  external_identifier?: Maybe<Scalars['Int']>;
  first_name?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  language?: Maybe<Scalars['Int']>;
  last_access?: Maybe<Scalars['Int']>;
  last_name?: Maybe<Scalars['Int']>;
  last_page?: Maybe<Scalars['Int']>;
  likes?: Maybe<Scalars['Int']>;
  location?: Maybe<Scalars['Int']>;
  password?: Maybe<Scalars['Int']>;
  provider?: Maybe<Scalars['Int']>;
  role?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  tags?: Maybe<Scalars['Int']>;
  tfa_secret?: Maybe<Scalars['Int']>;
  theme?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['Int']>;
  token?: Maybe<Scalars['Int']>;
};

export type Directus_Users_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Users_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Users_Filter>>>;
  auth_data?: InputMaybe<String_Filter_Operators>;
  auth_data_func?: InputMaybe<Count_Function_Filter_Operators>;
  avatar?: InputMaybe<Directus_Files_Filter>;
  code?: InputMaybe<String_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  email?: InputMaybe<String_Filter_Operators>;
  email_notifications?: InputMaybe<Boolean_Filter_Operators>;
  external_identifier?: InputMaybe<String_Filter_Operators>;
  first_name?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<String_Filter_Operators>;
  language?: InputMaybe<String_Filter_Operators>;
  last_access?: InputMaybe<Date_Filter_Operators>;
  last_access_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  last_name?: InputMaybe<String_Filter_Operators>;
  last_page?: InputMaybe<String_Filter_Operators>;
  likes?: InputMaybe<Comments_Likes_Filter>;
  likes_func?: InputMaybe<Count_Function_Filter_Operators>;
  location?: InputMaybe<String_Filter_Operators>;
  password?: InputMaybe<Hash_Filter_Operators>;
  provider?: InputMaybe<String_Filter_Operators>;
  role?: InputMaybe<Directus_Roles_Filter>;
  status?: InputMaybe<String_Filter_Operators>;
  tags?: InputMaybe<String_Filter_Operators>;
  tags_func?: InputMaybe<Count_Function_Filter_Operators>;
  tfa_secret?: InputMaybe<Hash_Filter_Operators>;
  theme?: InputMaybe<String_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  token?: InputMaybe<Hash_Filter_Operators>;
};

export type Directus_Webhooks = {
  __typename?: 'directus_webhooks';
  actions: Array<Maybe<Scalars['String']>>;
  collections: Array<Maybe<Scalars['String']>>;
  data?: Maybe<Scalars['Boolean']>;
  headers?: Maybe<Scalars['JSON']>;
  headers_func?: Maybe<Count_Functions>;
  id: Scalars['ID'];
  method?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type Directus_Webhooks_Aggregated = {
  __typename?: 'directus_webhooks_aggregated';
  avg?: Maybe<Directus_Webhooks_Aggregated_Fields>;
  avgDistinct?: Maybe<Directus_Webhooks_Aggregated_Fields>;
  count?: Maybe<Directus_Webhooks_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Directus_Webhooks_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Directus_Webhooks_Aggregated_Fields>;
  min?: Maybe<Directus_Webhooks_Aggregated_Fields>;
  sum?: Maybe<Directus_Webhooks_Aggregated_Fields>;
  sumDistinct?: Maybe<Directus_Webhooks_Aggregated_Fields>;
};

export type Directus_Webhooks_Aggregated_Count = {
  __typename?: 'directus_webhooks_aggregated_count';
  actions?: Maybe<Scalars['Int']>;
  collections?: Maybe<Scalars['Int']>;
  data?: Maybe<Scalars['Int']>;
  headers?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  method?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['Int']>;
};

export type Directus_Webhooks_Aggregated_Fields = {
  __typename?: 'directus_webhooks_aggregated_fields';
  id?: Maybe<Scalars['Float']>;
};

export type Directus_Webhooks_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Webhooks_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Webhooks_Filter>>>;
  actions?: InputMaybe<String_Filter_Operators>;
  collections?: InputMaybe<String_Filter_Operators>;
  data?: InputMaybe<Boolean_Filter_Operators>;
  headers?: InputMaybe<String_Filter_Operators>;
  headers_func?: InputMaybe<Count_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  method?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  url?: InputMaybe<String_Filter_Operators>;
};

export type Extensions = {
  __typename?: 'extensions';
  displays?: Maybe<Array<Maybe<Scalars['String']>>>;
  interfaces?: Maybe<Array<Maybe<Scalars['String']>>>;
  layouts?: Maybe<Array<Maybe<Scalars['String']>>>;
  modules?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export enum Graphql_Sdl_Scope {
  Items = 'items',
  System = 'system'
}

export type Hash_Filter_Operators = {
  _empty?: InputMaybe<Scalars['Boolean']>;
  _nempty?: InputMaybe<Scalars['Boolean']>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
  _null?: InputMaybe<Scalars['Boolean']>;
};

export type Number_Filter_Operators = {
  _between?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _eq?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _gt?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _gte?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _lt?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _lte?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _nbetween?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _neq?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
  _null?: InputMaybe<Scalars['Boolean']>;
};

export type Server_Info = {
  __typename?: 'server_info';
  custom_css?: Maybe<Scalars['String']>;
  directus?: Maybe<Server_Info_Directus>;
  node?: Maybe<Server_Info_Node>;
  os?: Maybe<Server_Info_Os>;
  project_background?: Maybe<Scalars['String']>;
  project_color?: Maybe<Scalars['String']>;
  project_foreground?: Maybe<Scalars['String']>;
  project_logo?: Maybe<Scalars['String']>;
  project_name?: Maybe<Scalars['String']>;
  project_note?: Maybe<Scalars['String']>;
};

export type Server_Info_Directus = {
  __typename?: 'server_info_directus';
  version?: Maybe<Scalars['String']>;
};

export type Server_Info_Node = {
  __typename?: 'server_info_node';
  uptime?: Maybe<Scalars['Int']>;
  version?: Maybe<Scalars['String']>;
};

export type Server_Info_Os = {
  __typename?: 'server_info_os';
  totalmem?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  uptime?: Maybe<Scalars['Int']>;
  version?: Maybe<Scalars['String']>;
};

export type String_Filter_Operators = {
  _contains?: InputMaybe<Scalars['String']>;
  _empty?: InputMaybe<Scalars['Boolean']>;
  _ends_with?: InputMaybe<Scalars['String']>;
  _eq?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  _ncontains?: InputMaybe<Scalars['String']>;
  _nempty?: InputMaybe<Scalars['Boolean']>;
  _nends_with?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
  _nstarts_with?: InputMaybe<Scalars['String']>;
  _null?: InputMaybe<Scalars['Boolean']>;
  _starts_with?: InputMaybe<Scalars['String']>;
};

export type Update_Articles_Input = {
  banner?: InputMaybe<Update_Directus_Files_Input>;
  category?: InputMaybe<Scalars['String']>;
  comments?: InputMaybe<Array<InputMaybe<Update_Comments_Input>>>;
  content?: InputMaybe<Scalars['JSON']>;
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  read_time?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  sub_title?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Comments_Input = {
  article_id?: InputMaybe<Update_Articles_Input>;
  comment?: InputMaybe<Scalars['String']>;
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  likes?: InputMaybe<Array<InputMaybe<Update_Comments_Likes_Input>>>;
  sort?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Comments_Likes_Input = {
  comment?: InputMaybe<Update_Comments_Input>;
  id?: InputMaybe<Scalars['ID']>;
  user?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Directus_Collections_Input = {
  meta?: InputMaybe<Directus_Collections_Meta_Input>;
};

export type Update_Directus_Dashboards_Input = {
  color?: InputMaybe<Scalars['String']>;
  date_created?: InputMaybe<Scalars['Date']>;
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  panels?: InputMaybe<Array<InputMaybe<Update_Directus_Panels_Input>>>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Directus_Fields_Input = {
  collection?: InputMaybe<Scalars['String']>;
  field?: InputMaybe<Scalars['String']>;
  meta?: InputMaybe<Directus_Fields_Meta_Input>;
  schema?: InputMaybe<Directus_Fields_Schema_Input>;
  type?: InputMaybe<Scalars['String']>;
};

export type Update_Directus_Files_Input = {
  charset?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  embed?: InputMaybe<Scalars['String']>;
  filename_disk?: InputMaybe<Scalars['String']>;
  filename_download?: InputMaybe<Scalars['String']>;
  filesize?: InputMaybe<Scalars['String']>;
  folder?: InputMaybe<Update_Directus_Folders_Input>;
  height?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
  location?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['JSON']>;
  modified_by?: InputMaybe<Update_Directus_Users_Input>;
  modified_on?: InputMaybe<Scalars['Date']>;
  storage?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['JSON']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  uploaded_by?: InputMaybe<Update_Directus_Users_Input>;
  uploaded_on?: InputMaybe<Scalars['Date']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type Update_Directus_Flows_Input = {
  accountability?: InputMaybe<Scalars['String']>;
  color?: InputMaybe<Scalars['String']>;
  date_created?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  operation?: InputMaybe<Update_Directus_Operations_Input>;
  operations?: InputMaybe<Array<InputMaybe<Update_Directus_Operations_Input>>>;
  options?: InputMaybe<Scalars['JSON']>;
  status?: InputMaybe<Scalars['String']>;
  trigger?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Directus_Folders_Input = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Update_Directus_Folders_Input>;
};

export type Update_Directus_Notifications_Input = {
  collection?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  item?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<Scalars['String']>;
  recipient?: InputMaybe<Update_Directus_Users_Input>;
  sender?: InputMaybe<Update_Directus_Users_Input>;
  status?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['Date']>;
};

export type Update_Directus_Operations_Input = {
  date_created?: InputMaybe<Scalars['Date']>;
  flow?: InputMaybe<Update_Directus_Flows_Input>;
  id?: InputMaybe<Scalars['ID']>;
  key?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<Scalars['JSON']>;
  position_x?: InputMaybe<Scalars['Int']>;
  position_y?: InputMaybe<Scalars['Int']>;
  reject?: InputMaybe<Update_Directus_Operations_Input>;
  resolve?: InputMaybe<Update_Directus_Operations_Input>;
  type?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Directus_Panels_Input = {
  color?: InputMaybe<Scalars['String']>;
  dashboard?: InputMaybe<Update_Directus_Dashboards_Input>;
  date_created?: InputMaybe<Scalars['Date']>;
  height?: InputMaybe<Scalars['Int']>;
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<Scalars['JSON']>;
  position_x?: InputMaybe<Scalars['Int']>;
  position_y?: InputMaybe<Scalars['Int']>;
  show_header?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
  width?: InputMaybe<Scalars['Int']>;
};

export type Update_Directus_Permissions_Input = {
  action?: InputMaybe<Scalars['String']>;
  collection?: InputMaybe<Scalars['String']>;
  fields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id?: InputMaybe<Scalars['ID']>;
  permissions?: InputMaybe<Scalars['JSON']>;
  presets?: InputMaybe<Scalars['JSON']>;
  role?: InputMaybe<Update_Directus_Roles_Input>;
  validation?: InputMaybe<Scalars['JSON']>;
};

export type Update_Directus_Presets_Input = {
  bookmark?: InputMaybe<Scalars['String']>;
  collection?: InputMaybe<Scalars['String']>;
  color?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<Scalars['JSON']>;
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  layout?: InputMaybe<Scalars['String']>;
  layout_options?: InputMaybe<Scalars['JSON']>;
  layout_query?: InputMaybe<Scalars['JSON']>;
  refresh_interval?: InputMaybe<Scalars['Int']>;
  role?: InputMaybe<Update_Directus_Roles_Input>;
  search?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Directus_Relations_Input = {
  collection?: InputMaybe<Scalars['String']>;
  field?: InputMaybe<Scalars['String']>;
  meta?: InputMaybe<Directus_Relations_Meta_Input>;
  related_collection?: InputMaybe<Scalars['String']>;
  schema?: InputMaybe<Directus_Relations_Schema_Input>;
};

export type Update_Directus_Roles_Input = {
  admin_access?: InputMaybe<Scalars['Boolean']>;
  app_access?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  enforce_tfa?: InputMaybe<Scalars['Boolean']>;
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  ip_access?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<Update_Directus_Users_Input>>>;
};

export type Update_Directus_Settings_Input = {
  auth_login_attempts?: InputMaybe<Scalars['Int']>;
  auth_password_policy?: InputMaybe<Scalars['String']>;
  basemaps?: InputMaybe<Scalars['JSON']>;
  custom_aspect_ratios?: InputMaybe<Scalars['JSON']>;
  custom_css?: InputMaybe<Scalars['String']>;
  default_language?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  mapbox_key?: InputMaybe<Scalars['String']>;
  module_bar?: InputMaybe<Scalars['JSON']>;
  /** $t:field_options.directus_settings.project_color_note */
  project_color?: InputMaybe<Scalars['String']>;
  project_descriptor?: InputMaybe<Scalars['String']>;
  project_logo?: InputMaybe<Update_Directus_Files_Input>;
  project_name?: InputMaybe<Scalars['String']>;
  project_url?: InputMaybe<Scalars['String']>;
  public_background?: InputMaybe<Update_Directus_Files_Input>;
  public_foreground?: InputMaybe<Update_Directus_Files_Input>;
  public_note?: InputMaybe<Scalars['String']>;
  storage_asset_presets?: InputMaybe<Scalars['JSON']>;
  storage_asset_transform?: InputMaybe<Scalars['String']>;
  storage_default_folder?: InputMaybe<Update_Directus_Folders_Input>;
  translation_strings?: InputMaybe<Scalars['JSON']>;
};

export type Update_Directus_Shares_Input = {
  collection?: InputMaybe<Scalars['String']>;
  date_created?: InputMaybe<Scalars['Date']>;
  /** $t:shared_leave_blank_for_unlimited */
  date_end?: InputMaybe<Scalars['Date']>;
  /** $t:shared_leave_blank_for_unlimited */
  date_start?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  item?: InputMaybe<Scalars['String']>;
  /** $t:shared_leave_blank_for_unlimited */
  max_uses?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  /** $t:shared_leave_blank_for_unlimited */
  password?: InputMaybe<Scalars['Hash']>;
  role?: InputMaybe<Update_Directus_Roles_Input>;
  times_used?: InputMaybe<Scalars['Int']>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Directus_Users_Input = {
  auth_data?: InputMaybe<Scalars['JSON']>;
  avatar?: InputMaybe<Update_Directus_Files_Input>;
  code?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  email_notifications?: InputMaybe<Scalars['Boolean']>;
  external_identifier?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  language?: InputMaybe<Scalars['String']>;
  last_access?: InputMaybe<Scalars['Date']>;
  last_name?: InputMaybe<Scalars['String']>;
  last_page?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<Array<InputMaybe<Update_Comments_Likes_Input>>>;
  location?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['Hash']>;
  provider?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Update_Directus_Roles_Input>;
  status?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['JSON']>;
  tfa_secret?: InputMaybe<Scalars['Hash']>;
  theme?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['Hash']>;
};

export type Update_Directus_Webhooks_Input = {
  actions?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  collections?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  data?: InputMaybe<Scalars['Boolean']>;
  headers?: InputMaybe<Scalars['JSON']>;
  id?: InputMaybe<Scalars['ID']>;
  method?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type Users_Me_Tfa_Generate_Data = {
  __typename?: 'users_me_tfa_generate_data';
  otpauth_url?: Maybe<Scalars['String']>;
  secret?: Maybe<Scalars['String']>;
};

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  otp?: InputMaybe<Scalars['String']>;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', auth_login?: { __typename?: 'auth_tokens', access_token?: string | null, refresh_token?: string | null } | null };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', auth_logout?: boolean | null };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', auth_refresh?: { __typename?: 'auth_tokens', access_token?: string | null, refresh_token?: string | null } | null };

export type GetAllFieldsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllFieldsQuery = { __typename?: 'Query', fields: Array<{ __typename?: 'directus_fields', collection?: string | null, field?: string | null, type?: string | null, meta?: { __typename?: 'directus_fields_meta', interface?: string | null, options?: any | null, required?: boolean | null, readonly: boolean, translations?: any | null } | null, schema?: { __typename?: 'directus_fields_schema', name?: string | null, foreign_key_table?: string | null, max_length?: number | null, default_value?: string | null } | null }> };

export type GetAllFieldsInCollectionQueryVariables = Exact<{
  collection: Scalars['String'];
}>;


export type GetAllFieldsInCollectionQuery = { __typename?: 'Query', fields_in_collection: Array<{ __typename?: 'directus_fields', collection?: string | null, field?: string | null, type?: string | null, meta?: { __typename?: 'directus_fields_meta', interface?: string | null, options?: any | null, required?: boolean | null, readonly: boolean, translations?: any | null } | null, schema?: { __typename?: 'directus_fields_schema', name?: string | null, foreign_key_table?: string | null, max_length?: number | null, default_value?: string | null } | null }> };

export type FilePartsFragment = { __typename?: 'directus_files', type?: string | null, title?: string | null, filename_download: string, description?: string | null };

export type DeleteFileMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteFileMutation = { __typename?: 'Mutation', delete_files_item?: { __typename?: 'delete_one', id: string } | null };

export type DeleteFilesMutationVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type DeleteFilesMutation = { __typename?: 'Mutation', delete_files_items?: { __typename?: 'delete_many', ids: Array<string | null> } | null };

export type ImportFileFromUrlMutationVariables = Exact<{
  url: Scalars['String'];
  data: Create_Directus_Files_Input;
}>;


export type ImportFileFromUrlMutation = { __typename?: 'Mutation', import_file?: { __typename?: 'directus_files', id: string, type?: string | null, title?: string | null, filename_download: string, description?: string | null } | null };

export type UpdateFileMutationVariables = Exact<{
  id: Scalars['ID'];
  data: Update_Directus_Files_Input;
}>;


export type UpdateFileMutation = { __typename?: 'Mutation', update_files_item?: { __typename?: 'directus_files', id: string, type?: string | null, title?: string | null, filename_download: string, description?: string | null } | null };

export type GetFileByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetFileByIdQuery = { __typename?: 'Query', files_by_id?: { __typename?: 'directus_files', id: string, filename_download: string, storage: string, uploaded_on?: any | null, description?: string | null, modified_on?: any | null, type?: string | null, title?: string | null } | null };

export type ImagePartsFragment = { __typename?: 'directus_files', modified_on?: any | null, type?: string | null, title?: string | null };

export type CreatePresetMutationVariables = Exact<{
  data: Create_Directus_Presets_Input;
}>;


export type CreatePresetMutation = { __typename?: 'Mutation', create_presets_item?: { __typename?: 'directus_presets', id: string, filter?: any | null, search?: string | null, collection?: string | null, layout_query?: any | null, layout_options?: any | null, user?: { __typename?: 'directus_users', id: string } | null } | null };

export type DeletePresetByIdMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePresetByIdMutation = { __typename?: 'Mutation', delete_presets_item?: { __typename?: 'delete_one', id: string } | null };

export type UpdatePresetByIdMutationVariables = Exact<{
  id: Scalars['ID'];
  data: Update_Directus_Presets_Input;
}>;


export type UpdatePresetByIdMutation = { __typename?: 'Mutation', update_presets_item?: { __typename?: 'directus_presets', id: string, filter?: any | null, search?: string | null, collection?: string | null, layout_query?: any | null, layout_options?: any | null, user?: { __typename?: 'directus_users', id: string } | null } | null };

export type GetPresetsByUsersIdQueryVariables = Exact<{
  filter: Directus_Presets_Filter;
}>;


export type GetPresetsByUsersIdQuery = { __typename?: 'Query', presets: Array<{ __typename?: 'directus_presets', id: string, filter?: any | null, search?: string | null, collection?: string | null, layout_query?: any | null, layout_options?: any | null, user?: { __typename?: 'directus_users', id: string } | null }> };

export type GetAllRelationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRelationsQuery = { __typename?: 'Query', relations: Array<{ __typename?: 'directus_relations', collection?: string | null, field?: string | null, related_collection?: string | null, meta?: { __typename?: 'directus_relations_meta', one_field?: string | null, many_collection?: string | null } | null }> };

export type GetRelationQueryVariables = Exact<{
  collection: Scalars['String'];
  field: Scalars['String'];
}>;


export type GetRelationQuery = { __typename?: 'Query', relations_by_name?: { __typename?: 'directus_relations', collection?: string | null, field?: string | null, related_collection?: string | null } | null };

export type RolePartsFragment = { __typename?: 'directus_roles', id: string, name: string, enforce_tfa: boolean, admin_access: boolean, app_access?: boolean | null, icon?: string | null };

export type GetGqlSchemaQueryVariables = Exact<{
  scope?: InputMaybe<Graphql_Sdl_Scope>;
}>;


export type GetGqlSchemaQuery = { __typename?: 'Query', server_specs_graphql?: string | null };

export type NamePartsFragment = { __typename?: 'directus_users', first_name?: string | null, last_name?: string | null };

export type CreateUserMutationVariables = Exact<{
  data: Create_Directus_Users_Input;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', create_users_item?: { __typename?: 'directus_users', id: string, email?: string | null, status?: string | null, provider?: string | null, location?: string | null, title?: string | null, theme?: string | null, tfa_secret?: any | null, first_name?: string | null, last_name?: string | null, avatar?: { __typename?: 'directus_files', id: string, modified_on?: any | null, type?: string | null, title?: string | null } | null, role?: { __typename?: 'directus_roles', id: string, name: string, enforce_tfa: boolean, admin_access: boolean, app_access?: boolean | null, icon?: string | null } | null } | null };

export type DeleteUserItemMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteUserItemMutation = { __typename?: 'Mutation', delete_users_item?: { __typename?: 'delete_one', id: string } | null };

export type DisableOtpMutationVariables = Exact<{
  otp: Scalars['String'];
}>;


export type DisableOtpMutation = { __typename?: 'Mutation', users_me_tfa_disable?: boolean | null };

export type EnableOtpMutationVariables = Exact<{
  otp: Scalars['String'];
  secret: Scalars['String'];
}>;


export type EnableOtpMutation = { __typename?: 'Mutation', users_me_tfa_enable?: boolean | null };

export type GenerateOtpMutationVariables = Exact<{
  password: Scalars['String'];
}>;


export type GenerateOtpMutation = { __typename?: 'Mutation', users_me_tfa_generate?: { __typename?: 'users_me_tfa_generate_data', secret?: string | null, otpauth_url?: string | null } | null };

export type UpdateCurrentUserMutationVariables = Exact<{
  id: Scalars['ID'];
  data: Update_Directus_Users_Input;
}>;


export type UpdateCurrentUserMutation = { __typename?: 'Mutation', update_users_item?: { __typename?: 'directus_users', id: string, email?: string | null, status?: string | null, provider?: string | null, location?: string | null, title?: string | null, theme?: string | null, tfa_secret?: any | null, first_name?: string | null, last_name?: string | null, avatar?: { __typename?: 'directus_files', id: string, modified_on?: any | null, type?: string | null, title?: string | null } | null, role?: { __typename?: 'directus_roles', id: string, name: string, enforce_tfa: boolean, admin_access: boolean, app_access?: boolean | null, icon?: string | null } | null } | null };

export type UpdateUserByIdMutationVariables = Exact<{
  id: Scalars['ID'];
  data: Update_Directus_Users_Input;
}>;


export type UpdateUserByIdMutation = { __typename?: 'Mutation', update_users_item?: { __typename?: 'directus_users', id: string, email?: string | null, status?: string | null, provider?: string | null, location?: string | null, title?: string | null, theme?: string | null, tfa_secret?: any | null, first_name?: string | null, last_name?: string | null, avatar?: { __typename?: 'directus_files', id: string, modified_on?: any | null, type?: string | null, title?: string | null } | null, role?: { __typename?: 'directus_roles', id: string, name: string, enforce_tfa: boolean, admin_access: boolean, app_access?: boolean | null, icon?: string | null } | null } | null };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', users_me?: { __typename?: 'directus_users', id: string, email?: string | null, status?: string | null, provider?: string | null, location?: string | null, title?: string | null, theme?: string | null, tfa_secret?: any | null, code?: string | null, first_name?: string | null, last_name?: string | null, avatar?: { __typename?: 'directus_files', id: string, modified_on?: any | null, type?: string | null, title?: string | null } | null, role?: { __typename?: 'directus_roles', id: string, name: string, enforce_tfa: boolean, admin_access: boolean, app_access?: boolean | null, icon?: string | null } | null, likes?: Array<{ __typename?: 'comments_likes', id: string, comment?: { __typename?: 'comments', id: string } | null } | null> | null } | null };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', users_by_id?: { __typename?: 'directus_users', id: string, email?: string | null, status?: string | null, provider?: string | null, location?: string | null, title?: string | null, theme?: string | null, tfa_secret?: any | null, first_name?: string | null, last_name?: string | null, avatar?: { __typename?: 'directus_files', id: string, modified_on?: any | null, type?: string | null, title?: string | null } | null, role?: { __typename?: 'directus_roles', id: string, name: string, enforce_tfa: boolean, admin_access: boolean, app_access?: boolean | null, icon?: string | null } | null } | null };

export type GetUsersQueryVariables = Exact<{
  filter: Directus_Users_Filter;
}>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'directus_users', id: string, email?: string | null, status?: string | null, provider?: string | null, location?: string | null, title?: string | null, theme?: string | null, tfa_secret?: any | null, code?: string | null, first_name?: string | null, last_name?: string | null, avatar?: { __typename?: 'directus_files', id: string, modified_on?: any | null, type?: string | null, title?: string | null } | null, role?: { __typename?: 'directus_roles', id: string, name: string, enforce_tfa: boolean, admin_access: boolean, app_access?: boolean | null, icon?: string | null } | null }> };

export const FilePartsFragmentDoc = gql`
    fragment FileParts on directus_files {
  type
  title
  type
  filename_download
  description
}
    `;
export const ImagePartsFragmentDoc = gql`
    fragment ImageParts on directus_files {
  modified_on
  type
  title
}
    `;
export const RolePartsFragmentDoc = gql`
    fragment RoleParts on directus_roles {
  id
  name
  enforce_tfa
  admin_access
  app_access
  icon
}
    `;
export const NamePartsFragmentDoc = gql`
    fragment NameParts on directus_users {
  first_name
  last_name
}
    `;
export const LoginUserDocument = gql`
    mutation LoginUser($email: String!, $password: String!, $otp: String) {
  auth_login(email: $email, password: $password, otp: $otp, mode: cookie) {
    access_token
    refresh_token
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      otp: // value for 'otp'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = gql`
    mutation LogoutUser {
  auth_logout
}
    `;
export type LogoutUserMutationFn = Apollo.MutationFunction<LogoutUserMutation, LogoutUserMutationVariables>;

/**
 * __useLogoutUserMutation__
 *
 * To run a mutation, you first call `useLogoutUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutUserMutation, { data, loading, error }] = useLogoutUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutUserMutation(baseOptions?: Apollo.MutationHookOptions<LogoutUserMutation, LogoutUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutUserMutation, LogoutUserMutationVariables>(LogoutUserDocument, options);
      }
export type LogoutUserMutationHookResult = ReturnType<typeof useLogoutUserMutation>;
export type LogoutUserMutationResult = Apollo.MutationResult<LogoutUserMutation>;
export type LogoutUserMutationOptions = Apollo.BaseMutationOptions<LogoutUserMutation, LogoutUserMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation RefreshToken {
  auth_refresh(mode: cookie) {
    access_token
    refresh_token
  }
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const GetAllFieldsDocument = gql`
    query GetAllFields {
  fields {
    collection
    field
    type
    meta {
      interface
      options
      required
      readonly
      translations
    }
    schema {
      name
      foreign_key_table
      max_length
      default_value
    }
  }
}
    `;

/**
 * __useGetAllFieldsQuery__
 *
 * To run a query within a React component, call `useGetAllFieldsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllFieldsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllFieldsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllFieldsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllFieldsQuery, GetAllFieldsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllFieldsQuery, GetAllFieldsQueryVariables>(GetAllFieldsDocument, options);
      }
export function useGetAllFieldsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllFieldsQuery, GetAllFieldsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllFieldsQuery, GetAllFieldsQueryVariables>(GetAllFieldsDocument, options);
        }
export type GetAllFieldsQueryHookResult = ReturnType<typeof useGetAllFieldsQuery>;
export type GetAllFieldsLazyQueryHookResult = ReturnType<typeof useGetAllFieldsLazyQuery>;
export type GetAllFieldsQueryResult = Apollo.QueryResult<GetAllFieldsQuery, GetAllFieldsQueryVariables>;
export const GetAllFieldsInCollectionDocument = gql`
    query GetAllFieldsInCollection($collection: String!) {
  fields_in_collection(collection: $collection) {
    collection
    field
    type
    meta {
      interface
      options
      required
      readonly
      translations
    }
    schema {
      name
      foreign_key_table
      max_length
      default_value
    }
  }
}
    `;

/**
 * __useGetAllFieldsInCollectionQuery__
 *
 * To run a query within a React component, call `useGetAllFieldsInCollectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllFieldsInCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllFieldsInCollectionQuery({
 *   variables: {
 *      collection: // value for 'collection'
 *   },
 * });
 */
export function useGetAllFieldsInCollectionQuery(baseOptions: Apollo.QueryHookOptions<GetAllFieldsInCollectionQuery, GetAllFieldsInCollectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllFieldsInCollectionQuery, GetAllFieldsInCollectionQueryVariables>(GetAllFieldsInCollectionDocument, options);
      }
export function useGetAllFieldsInCollectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllFieldsInCollectionQuery, GetAllFieldsInCollectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllFieldsInCollectionQuery, GetAllFieldsInCollectionQueryVariables>(GetAllFieldsInCollectionDocument, options);
        }
export type GetAllFieldsInCollectionQueryHookResult = ReturnType<typeof useGetAllFieldsInCollectionQuery>;
export type GetAllFieldsInCollectionLazyQueryHookResult = ReturnType<typeof useGetAllFieldsInCollectionLazyQuery>;
export type GetAllFieldsInCollectionQueryResult = Apollo.QueryResult<GetAllFieldsInCollectionQuery, GetAllFieldsInCollectionQueryVariables>;
export const DeleteFileDocument = gql`
    mutation DeleteFile($id: ID!) {
  delete_files_item(id: $id) {
    id
  }
}
    `;
export type DeleteFileMutationFn = Apollo.MutationFunction<DeleteFileMutation, DeleteFileMutationVariables>;

/**
 * __useDeleteFileMutation__
 *
 * To run a mutation, you first call `useDeleteFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFileMutation, { data, loading, error }] = useDeleteFileMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteFileMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFileMutation, DeleteFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFileMutation, DeleteFileMutationVariables>(DeleteFileDocument, options);
      }
export type DeleteFileMutationHookResult = ReturnType<typeof useDeleteFileMutation>;
export type DeleteFileMutationResult = Apollo.MutationResult<DeleteFileMutation>;
export type DeleteFileMutationOptions = Apollo.BaseMutationOptions<DeleteFileMutation, DeleteFileMutationVariables>;
export const DeleteFilesDocument = gql`
    mutation DeleteFiles($ids: [ID!]!) {
  delete_files_items(ids: $ids) {
    ids
  }
}
    `;
export type DeleteFilesMutationFn = Apollo.MutationFunction<DeleteFilesMutation, DeleteFilesMutationVariables>;

/**
 * __useDeleteFilesMutation__
 *
 * To run a mutation, you first call `useDeleteFilesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFilesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFilesMutation, { data, loading, error }] = useDeleteFilesMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteFilesMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFilesMutation, DeleteFilesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFilesMutation, DeleteFilesMutationVariables>(DeleteFilesDocument, options);
      }
export type DeleteFilesMutationHookResult = ReturnType<typeof useDeleteFilesMutation>;
export type DeleteFilesMutationResult = Apollo.MutationResult<DeleteFilesMutation>;
export type DeleteFilesMutationOptions = Apollo.BaseMutationOptions<DeleteFilesMutation, DeleteFilesMutationVariables>;
export const ImportFileFromUrlDocument = gql`
    mutation ImportFileFromUrl($url: String!, $data: create_directus_files_input!) {
  import_file(url: $url, data: $data) {
    id
    ...FileParts
  }
}
    ${FilePartsFragmentDoc}`;
export type ImportFileFromUrlMutationFn = Apollo.MutationFunction<ImportFileFromUrlMutation, ImportFileFromUrlMutationVariables>;

/**
 * __useImportFileFromUrlMutation__
 *
 * To run a mutation, you first call `useImportFileFromUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImportFileFromUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [importFileFromUrlMutation, { data, loading, error }] = useImportFileFromUrlMutation({
 *   variables: {
 *      url: // value for 'url'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useImportFileFromUrlMutation(baseOptions?: Apollo.MutationHookOptions<ImportFileFromUrlMutation, ImportFileFromUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ImportFileFromUrlMutation, ImportFileFromUrlMutationVariables>(ImportFileFromUrlDocument, options);
      }
export type ImportFileFromUrlMutationHookResult = ReturnType<typeof useImportFileFromUrlMutation>;
export type ImportFileFromUrlMutationResult = Apollo.MutationResult<ImportFileFromUrlMutation>;
export type ImportFileFromUrlMutationOptions = Apollo.BaseMutationOptions<ImportFileFromUrlMutation, ImportFileFromUrlMutationVariables>;
export const UpdateFileDocument = gql`
    mutation UpdateFile($id: ID!, $data: update_directus_files_input!) {
  update_files_item(id: $id, data: $data) {
    id
    ...FileParts
  }
}
    ${FilePartsFragmentDoc}`;
export type UpdateFileMutationFn = Apollo.MutationFunction<UpdateFileMutation, UpdateFileMutationVariables>;

/**
 * __useUpdateFileMutation__
 *
 * To run a mutation, you first call `useUpdateFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFileMutation, { data, loading, error }] = useUpdateFileMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateFileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFileMutation, UpdateFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFileMutation, UpdateFileMutationVariables>(UpdateFileDocument, options);
      }
export type UpdateFileMutationHookResult = ReturnType<typeof useUpdateFileMutation>;
export type UpdateFileMutationResult = Apollo.MutationResult<UpdateFileMutation>;
export type UpdateFileMutationOptions = Apollo.BaseMutationOptions<UpdateFileMutation, UpdateFileMutationVariables>;
export const GetFileByIdDocument = gql`
    query getFileById($id: ID!) {
  files_by_id(id: $id) {
    id
    ...ImageParts
    filename_download
    storage
    uploaded_on
    description
  }
}
    ${ImagePartsFragmentDoc}`;

/**
 * __useGetFileByIdQuery__
 *
 * To run a query within a React component, call `useGetFileByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFileByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFileByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetFileByIdQuery(baseOptions: Apollo.QueryHookOptions<GetFileByIdQuery, GetFileByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFileByIdQuery, GetFileByIdQueryVariables>(GetFileByIdDocument, options);
      }
export function useGetFileByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFileByIdQuery, GetFileByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFileByIdQuery, GetFileByIdQueryVariables>(GetFileByIdDocument, options);
        }
export type GetFileByIdQueryHookResult = ReturnType<typeof useGetFileByIdQuery>;
export type GetFileByIdLazyQueryHookResult = ReturnType<typeof useGetFileByIdLazyQuery>;
export type GetFileByIdQueryResult = Apollo.QueryResult<GetFileByIdQuery, GetFileByIdQueryVariables>;
export const CreatePresetDocument = gql`
    mutation CreatePreset($data: create_directus_presets_input!) {
  create_presets_item(data: $data) {
    id
    filter
    user {
      id
    }
    search
    collection
    layout_query
    layout_options
  }
}
    `;
export type CreatePresetMutationFn = Apollo.MutationFunction<CreatePresetMutation, CreatePresetMutationVariables>;

/**
 * __useCreatePresetMutation__
 *
 * To run a mutation, you first call `useCreatePresetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePresetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPresetMutation, { data, loading, error }] = useCreatePresetMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePresetMutation(baseOptions?: Apollo.MutationHookOptions<CreatePresetMutation, CreatePresetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePresetMutation, CreatePresetMutationVariables>(CreatePresetDocument, options);
      }
export type CreatePresetMutationHookResult = ReturnType<typeof useCreatePresetMutation>;
export type CreatePresetMutationResult = Apollo.MutationResult<CreatePresetMutation>;
export type CreatePresetMutationOptions = Apollo.BaseMutationOptions<CreatePresetMutation, CreatePresetMutationVariables>;
export const DeletePresetByIdDocument = gql`
    mutation DeletePresetById($id: ID!) {
  delete_presets_item(id: $id) {
    id
  }
}
    `;
export type DeletePresetByIdMutationFn = Apollo.MutationFunction<DeletePresetByIdMutation, DeletePresetByIdMutationVariables>;

/**
 * __useDeletePresetByIdMutation__
 *
 * To run a mutation, you first call `useDeletePresetByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePresetByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePresetByIdMutation, { data, loading, error }] = useDeletePresetByIdMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePresetByIdMutation(baseOptions?: Apollo.MutationHookOptions<DeletePresetByIdMutation, DeletePresetByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePresetByIdMutation, DeletePresetByIdMutationVariables>(DeletePresetByIdDocument, options);
      }
export type DeletePresetByIdMutationHookResult = ReturnType<typeof useDeletePresetByIdMutation>;
export type DeletePresetByIdMutationResult = Apollo.MutationResult<DeletePresetByIdMutation>;
export type DeletePresetByIdMutationOptions = Apollo.BaseMutationOptions<DeletePresetByIdMutation, DeletePresetByIdMutationVariables>;
export const UpdatePresetByIdDocument = gql`
    mutation UpdatePresetById($id: ID!, $data: update_directus_presets_input!) {
  update_presets_item(id: $id, data: $data) {
    id
    filter
    user {
      id
    }
    search
    collection
    layout_query
    layout_options
  }
}
    `;
export type UpdatePresetByIdMutationFn = Apollo.MutationFunction<UpdatePresetByIdMutation, UpdatePresetByIdMutationVariables>;

/**
 * __useUpdatePresetByIdMutation__
 *
 * To run a mutation, you first call `useUpdatePresetByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePresetByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePresetByIdMutation, { data, loading, error }] = useUpdatePresetByIdMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdatePresetByIdMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePresetByIdMutation, UpdatePresetByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePresetByIdMutation, UpdatePresetByIdMutationVariables>(UpdatePresetByIdDocument, options);
      }
export type UpdatePresetByIdMutationHookResult = ReturnType<typeof useUpdatePresetByIdMutation>;
export type UpdatePresetByIdMutationResult = Apollo.MutationResult<UpdatePresetByIdMutation>;
export type UpdatePresetByIdMutationOptions = Apollo.BaseMutationOptions<UpdatePresetByIdMutation, UpdatePresetByIdMutationVariables>;
export const GetPresetsByUsersIdDocument = gql`
    query getPresetsByUsersId($filter: directus_presets_filter!) {
  presets(filter: $filter) {
    id
    filter
    user {
      id
    }
    search
    collection
    layout_query
    layout_options
  }
}
    `;

/**
 * __useGetPresetsByUsersIdQuery__
 *
 * To run a query within a React component, call `useGetPresetsByUsersIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPresetsByUsersIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPresetsByUsersIdQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetPresetsByUsersIdQuery(baseOptions: Apollo.QueryHookOptions<GetPresetsByUsersIdQuery, GetPresetsByUsersIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPresetsByUsersIdQuery, GetPresetsByUsersIdQueryVariables>(GetPresetsByUsersIdDocument, options);
      }
export function useGetPresetsByUsersIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPresetsByUsersIdQuery, GetPresetsByUsersIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPresetsByUsersIdQuery, GetPresetsByUsersIdQueryVariables>(GetPresetsByUsersIdDocument, options);
        }
export type GetPresetsByUsersIdQueryHookResult = ReturnType<typeof useGetPresetsByUsersIdQuery>;
export type GetPresetsByUsersIdLazyQueryHookResult = ReturnType<typeof useGetPresetsByUsersIdLazyQuery>;
export type GetPresetsByUsersIdQueryResult = Apollo.QueryResult<GetPresetsByUsersIdQuery, GetPresetsByUsersIdQueryVariables>;
export const GetAllRelationsDocument = gql`
    query GetAllRelations {
  relations {
    collection
    field
    related_collection
    meta {
      one_field
      many_collection
    }
  }
}
    `;

/**
 * __useGetAllRelationsQuery__
 *
 * To run a query within a React component, call `useGetAllRelationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllRelationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllRelationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllRelationsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllRelationsQuery, GetAllRelationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllRelationsQuery, GetAllRelationsQueryVariables>(GetAllRelationsDocument, options);
      }
export function useGetAllRelationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllRelationsQuery, GetAllRelationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllRelationsQuery, GetAllRelationsQueryVariables>(GetAllRelationsDocument, options);
        }
export type GetAllRelationsQueryHookResult = ReturnType<typeof useGetAllRelationsQuery>;
export type GetAllRelationsLazyQueryHookResult = ReturnType<typeof useGetAllRelationsLazyQuery>;
export type GetAllRelationsQueryResult = Apollo.QueryResult<GetAllRelationsQuery, GetAllRelationsQueryVariables>;
export const GetRelationDocument = gql`
    query GetRelation($collection: String!, $field: String!) {
  relations_by_name(collection: $collection, field: $field) {
    collection
    field
    related_collection
  }
}
    `;

/**
 * __useGetRelationQuery__
 *
 * To run a query within a React component, call `useGetRelationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRelationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRelationQuery({
 *   variables: {
 *      collection: // value for 'collection'
 *      field: // value for 'field'
 *   },
 * });
 */
export function useGetRelationQuery(baseOptions: Apollo.QueryHookOptions<GetRelationQuery, GetRelationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRelationQuery, GetRelationQueryVariables>(GetRelationDocument, options);
      }
export function useGetRelationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRelationQuery, GetRelationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRelationQuery, GetRelationQueryVariables>(GetRelationDocument, options);
        }
export type GetRelationQueryHookResult = ReturnType<typeof useGetRelationQuery>;
export type GetRelationLazyQueryHookResult = ReturnType<typeof useGetRelationLazyQuery>;
export type GetRelationQueryResult = Apollo.QueryResult<GetRelationQuery, GetRelationQueryVariables>;
export const GetGqlSchemaDocument = gql`
    query GetGqlSchema($scope: graphql_sdl_scope) {
  server_specs_graphql(scope: $scope)
}
    `;

/**
 * __useGetGqlSchemaQuery__
 *
 * To run a query within a React component, call `useGetGqlSchemaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGqlSchemaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGqlSchemaQuery({
 *   variables: {
 *      scope: // value for 'scope'
 *   },
 * });
 */
export function useGetGqlSchemaQuery(baseOptions?: Apollo.QueryHookOptions<GetGqlSchemaQuery, GetGqlSchemaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGqlSchemaQuery, GetGqlSchemaQueryVariables>(GetGqlSchemaDocument, options);
      }
export function useGetGqlSchemaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGqlSchemaQuery, GetGqlSchemaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGqlSchemaQuery, GetGqlSchemaQueryVariables>(GetGqlSchemaDocument, options);
        }
export type GetGqlSchemaQueryHookResult = ReturnType<typeof useGetGqlSchemaQuery>;
export type GetGqlSchemaLazyQueryHookResult = ReturnType<typeof useGetGqlSchemaLazyQuery>;
export type GetGqlSchemaQueryResult = Apollo.QueryResult<GetGqlSchemaQuery, GetGqlSchemaQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($data: create_directus_users_input!) {
  create_users_item(data: $data) {
    id
    ...NameParts
    email
    status
    provider
    avatar {
      id
      ...ImageParts
    }
    location
    title
    status
    theme
    tfa_secret
    role {
      ...RoleParts
    }
  }
}
    ${NamePartsFragmentDoc}
${ImagePartsFragmentDoc}
${RolePartsFragmentDoc}`;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteUserItemDocument = gql`
    mutation DeleteUserItem($id: ID!) {
  delete_users_item(id: $id) {
    id
  }
}
    `;
export type DeleteUserItemMutationFn = Apollo.MutationFunction<DeleteUserItemMutation, DeleteUserItemMutationVariables>;

/**
 * __useDeleteUserItemMutation__
 *
 * To run a mutation, you first call `useDeleteUserItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserItemMutation, { data, loading, error }] = useDeleteUserItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserItemMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserItemMutation, DeleteUserItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserItemMutation, DeleteUserItemMutationVariables>(DeleteUserItemDocument, options);
      }
export type DeleteUserItemMutationHookResult = ReturnType<typeof useDeleteUserItemMutation>;
export type DeleteUserItemMutationResult = Apollo.MutationResult<DeleteUserItemMutation>;
export type DeleteUserItemMutationOptions = Apollo.BaseMutationOptions<DeleteUserItemMutation, DeleteUserItemMutationVariables>;
export const DisableOtpDocument = gql`
    mutation disableOTP($otp: String!) {
  users_me_tfa_disable(otp: $otp)
}
    `;
export type DisableOtpMutationFn = Apollo.MutationFunction<DisableOtpMutation, DisableOtpMutationVariables>;

/**
 * __useDisableOtpMutation__
 *
 * To run a mutation, you first call `useDisableOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisableOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disableOtpMutation, { data, loading, error }] = useDisableOtpMutation({
 *   variables: {
 *      otp: // value for 'otp'
 *   },
 * });
 */
export function useDisableOtpMutation(baseOptions?: Apollo.MutationHookOptions<DisableOtpMutation, DisableOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DisableOtpMutation, DisableOtpMutationVariables>(DisableOtpDocument, options);
      }
export type DisableOtpMutationHookResult = ReturnType<typeof useDisableOtpMutation>;
export type DisableOtpMutationResult = Apollo.MutationResult<DisableOtpMutation>;
export type DisableOtpMutationOptions = Apollo.BaseMutationOptions<DisableOtpMutation, DisableOtpMutationVariables>;
export const EnableOtpDocument = gql`
    mutation enableOTP($otp: String!, $secret: String!) {
  users_me_tfa_enable(otp: $otp, secret: $secret)
}
    `;
export type EnableOtpMutationFn = Apollo.MutationFunction<EnableOtpMutation, EnableOtpMutationVariables>;

/**
 * __useEnableOtpMutation__
 *
 * To run a mutation, you first call `useEnableOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnableOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enableOtpMutation, { data, loading, error }] = useEnableOtpMutation({
 *   variables: {
 *      otp: // value for 'otp'
 *      secret: // value for 'secret'
 *   },
 * });
 */
export function useEnableOtpMutation(baseOptions?: Apollo.MutationHookOptions<EnableOtpMutation, EnableOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EnableOtpMutation, EnableOtpMutationVariables>(EnableOtpDocument, options);
      }
export type EnableOtpMutationHookResult = ReturnType<typeof useEnableOtpMutation>;
export type EnableOtpMutationResult = Apollo.MutationResult<EnableOtpMutation>;
export type EnableOtpMutationOptions = Apollo.BaseMutationOptions<EnableOtpMutation, EnableOtpMutationVariables>;
export const GenerateOtpDocument = gql`
    mutation generateOTP($password: String!) {
  users_me_tfa_generate(password: $password) {
    secret
    otpauth_url
  }
}
    `;
export type GenerateOtpMutationFn = Apollo.MutationFunction<GenerateOtpMutation, GenerateOtpMutationVariables>;

/**
 * __useGenerateOtpMutation__
 *
 * To run a mutation, you first call `useGenerateOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateOtpMutation, { data, loading, error }] = useGenerateOtpMutation({
 *   variables: {
 *      password: // value for 'password'
 *   },
 * });
 */
export function useGenerateOtpMutation(baseOptions?: Apollo.MutationHookOptions<GenerateOtpMutation, GenerateOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateOtpMutation, GenerateOtpMutationVariables>(GenerateOtpDocument, options);
      }
export type GenerateOtpMutationHookResult = ReturnType<typeof useGenerateOtpMutation>;
export type GenerateOtpMutationResult = Apollo.MutationResult<GenerateOtpMutation>;
export type GenerateOtpMutationOptions = Apollo.BaseMutationOptions<GenerateOtpMutation, GenerateOtpMutationVariables>;
export const UpdateCurrentUserDocument = gql`
    mutation UpdateCurrentUser($id: ID!, $data: update_directus_users_input!) {
  update_users_item(id: $id, data: $data) {
    id
    ...NameParts
    email
    status
    provider
    avatar {
      id
      ...ImageParts
    }
    location
    title
    status
    theme
    tfa_secret
    role {
      ...RoleParts
    }
  }
}
    ${NamePartsFragmentDoc}
${ImagePartsFragmentDoc}
${RolePartsFragmentDoc}`;
export type UpdateCurrentUserMutationFn = Apollo.MutationFunction<UpdateCurrentUserMutation, UpdateCurrentUserMutationVariables>;

/**
 * __useUpdateCurrentUserMutation__
 *
 * To run a mutation, you first call `useUpdateCurrentUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCurrentUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCurrentUserMutation, { data, loading, error }] = useUpdateCurrentUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCurrentUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCurrentUserMutation, UpdateCurrentUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCurrentUserMutation, UpdateCurrentUserMutationVariables>(UpdateCurrentUserDocument, options);
      }
export type UpdateCurrentUserMutationHookResult = ReturnType<typeof useUpdateCurrentUserMutation>;
export type UpdateCurrentUserMutationResult = Apollo.MutationResult<UpdateCurrentUserMutation>;
export type UpdateCurrentUserMutationOptions = Apollo.BaseMutationOptions<UpdateCurrentUserMutation, UpdateCurrentUserMutationVariables>;
export const UpdateUserByIdDocument = gql`
    mutation UpdateUserById($id: ID!, $data: update_directus_users_input!) {
  update_users_item(id: $id, data: $data) {
    id
    ...NameParts
    email
    status
    provider
    avatar {
      id
      ...ImageParts
    }
    location
    title
    status
    theme
    tfa_secret
    role {
      ...RoleParts
    }
  }
}
    ${NamePartsFragmentDoc}
${ImagePartsFragmentDoc}
${RolePartsFragmentDoc}`;
export type UpdateUserByIdMutationFn = Apollo.MutationFunction<UpdateUserByIdMutation, UpdateUserByIdMutationVariables>;

/**
 * __useUpdateUserByIdMutation__
 *
 * To run a mutation, you first call `useUpdateUserByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserByIdMutation, { data, loading, error }] = useUpdateUserByIdMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserByIdMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserByIdMutation, UpdateUserByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserByIdMutation, UpdateUserByIdMutationVariables>(UpdateUserByIdDocument, options);
      }
export type UpdateUserByIdMutationHookResult = ReturnType<typeof useUpdateUserByIdMutation>;
export type UpdateUserByIdMutationResult = Apollo.MutationResult<UpdateUserByIdMutation>;
export type UpdateUserByIdMutationOptions = Apollo.BaseMutationOptions<UpdateUserByIdMutation, UpdateUserByIdMutationVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  users_me {
    id
    ...NameParts
    email
    status
    provider
    avatar {
      id
      ...ImageParts
    }
    location
    title
    status
    theme
    tfa_secret
    role {
      ...RoleParts
    }
    code
    likes {
      id
      comment {
        id
      }
    }
  }
}
    ${NamePartsFragmentDoc}
${ImagePartsFragmentDoc}
${RolePartsFragmentDoc}`;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($id: ID!) {
  users_by_id(id: $id) {
    id
    ...NameParts
    email
    status
    provider
    avatar {
      id
      ...ImageParts
    }
    location
    title
    status
    theme
    tfa_secret
    role {
      ...RoleParts
    }
  }
}
    ${NamePartsFragmentDoc}
${ImagePartsFragmentDoc}
${RolePartsFragmentDoc}`;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers($filter: directus_users_filter!) {
  users(filter: $filter) {
    id
    ...NameParts
    email
    status
    provider
    avatar {
      id
      ...ImageParts
    }
    location
    title
    status
    theme
    tfa_secret
    code
    role {
      ...RoleParts
    }
  }
}
    ${NamePartsFragmentDoc}
${ImagePartsFragmentDoc}
${RolePartsFragmentDoc}`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;