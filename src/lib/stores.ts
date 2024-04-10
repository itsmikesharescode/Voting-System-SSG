import { getContext, setContext } from "svelte";
import { writable, type Writable } from "svelte/store"
import type { AdminState } from "./types";



export const setAdminState = (state: AdminState) => {
    const stateGenerator = writable(state);
    setContext("adminState", stateGenerator);
}

export const getAdminState = () => getContext<Writable<AdminState>>("adminState");