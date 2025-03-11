import type { User } from "@supabase/supabase-js";
import type { ClientType } from "./ClientType";
import type { UserConfig } from "./UserType";

export interface AuthContextType {
  user: User | null;
  siginWithGoogle: () => void;
  signOut: () => void;
  createUser: (dataUser: UserConfig) => Promise<unknown>;
  selectUser: () => Promise<unknown>;
  userConfig: () => Promise<ClientType | null>;
  updateClient: (dataClient: ClientType) => Promise<unknown>;
  loading: boolean;
  servicesClient: () => Promise<unknown>;
}