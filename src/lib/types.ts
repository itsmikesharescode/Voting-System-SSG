export type ResultModel<T> = {
    status: number
    type: string
    data: T
}

export type AdminState = {
    activeItem: string
    dashboard: unknown
    votes: unknown
    allvoters: unknown
    positions: unknown
    candidates: unknown
}