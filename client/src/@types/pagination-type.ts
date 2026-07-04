import React from "react"

export type PaginationType = {
    setPage : React.Dispatch<React.SetStateAction<number>>, 
    currentPage : number | undefined, 
    totalPages: number | undefined, 
    hasPrevPage : boolean | undefined, 
    hasNextPage : boolean | undefined
}
