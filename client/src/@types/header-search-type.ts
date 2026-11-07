import { CategoryType } from "./category-type";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export type HeaderSearchType = {
    searchActive: boolean;
    setSearchActive: (value: boolean) => void;
    data: CategoryType[] | undefined;
    isLoading: boolean;
    error: FetchBaseQueryError | SerializedError | undefined;
};