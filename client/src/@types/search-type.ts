import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { CategoryType } from "./category-type"
import { SerializedError } from "@reduxjs/toolkit"

export type SearchType = {
    searchActive : boolean, 
    setSearchActive: (arg: boolean) => void, 
    data: CategoryType[] | undefined, 
    error: FetchBaseQueryError | SerializedError | undefined
}