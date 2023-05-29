import { writable } from "svelte/store"


export interface FlyoState {
    isActivated: boolean
}

const flyoDefaultState: FlyoState = {
    isActivated: false
}

export const flyoState = writable<FlyoState>(flyoDefaultState)
