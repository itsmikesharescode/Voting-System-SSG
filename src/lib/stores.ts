import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import { getContext, setContext } from "svelte";
import type { AdminState, UserListDB } from "./types";
import type { SupabaseClient } from "@supabase/supabase-js";

export const setAdminState = (state: AdminState) => {
    const stateGenerator = writable(state);
    setContext("adminState", stateGenerator);
};

export const getAdminState = () => getContext<Writable<AdminState>>("adminState");

export const setUserState = (state: UserListDB | null) => {
    const stateGenerator = writable(state);
    setContext("userState", stateGenerator);
};

export const getUserState = () => getContext<Writable<UserListDB | null>>("userState");

export const setSupaBaby = (state: SupabaseClient) => {
    const stateGenerator = writable(state);
    setContext("supababy", stateGenerator);
};

export const getSupaBaby = () => getContext<SupabaseClient>("supababy");

