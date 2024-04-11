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
    votes: {
        voted: UserListDB[] | null,
        unvoted: UserListDB[] | null,
        notRegistered: UserListDB[] | null
    }
    allvoters: unknown
    positions: unknown
    candidates: unknown
}

// db types
export type UserListDB = {
    id: number
    created_at: string
    user_id: string
    user_lrn: string
    user_password: string
    user_fullname: string
    is_voted: boolean
    classification: "elementary" | "highschool"
    is_registered: boolean
}