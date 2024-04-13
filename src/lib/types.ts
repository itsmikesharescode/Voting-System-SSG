import { string } from "zod"

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
        activeTab: "highschool" | "elementary"
        userList: UserListDB[] | null,
        votedFilter: boolean,
        unvotedFilter: boolean,
        notRegisteredFilter: boolean
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

export interface MigrationFile {
    "Full Name": string
    "Email": string
    "LRN": string
    "Date Created": string
}