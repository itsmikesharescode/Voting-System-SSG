export type ResultModel<T> = {
    status: number
    type: string
    data: T
}

export type Dashboard = {
    totalVoters: number
    totalVoted: number
    totalCandidates: number
    totalPositions: number
}

export type AdminState = {
    activeItem: string
    dashboard: Dashboard | null
    votes: unknown
    allvoters: unknown
    positions: unknown
    candidates: unknown
}