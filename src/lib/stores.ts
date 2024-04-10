import { getContext, setContext } from "svelte";
import { writable, type Writable } from "svelte/store"
import type { AdminState } from "./types";
import type { User } from "@supabase/supabase-js";

export const setAdminState = (state: AdminState) => {
    const stateGenerator = writable(state);
    setContext("adminState", stateGenerator);
}

export const getAdminState = () => getContext<Writable<AdminState>>("adminState");

export const setUserState = (state: User) => {
    const stateGenerator = writable(state);
    setContext("userState", stateGenerator);
}

export const getUserState = getContext<Writable<User>>("userState");