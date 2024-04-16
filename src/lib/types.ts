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
    votes: unknown,
    allvoters: {
        activeTab: "highschool" | "elementary"
        userList: UserListDB[] | null,
        filterSelection: "voted" | "unvoted" | "notRegistered"
    }
    positions: {
        activeTab: "highschool" | "elementary"
        createdPositions: PositionsDB[] | null
    }
    candidates: {
        activeTab: "highschool" | "elementary"
    }
}

// db types 
export type UserListDB = {
    id: number
    created_at: string
    user_id: string
    user_lrn: string
    user_password: string
    user_email: string
    user_fullname: string
    not_voted: boolean
    not_registered: boolean
    classification: "elementary" | "highschool"

}

export interface MigrationFile {
    fullName: string
    email: string
    lrn: string
    dateCreated: string
}

export type PositionsDB = {
    id: number
    created_at: string
    position_name: string
    classification: string
}
