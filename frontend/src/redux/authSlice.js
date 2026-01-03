import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false
    },
    reducers: {
        // actions
        setAuthUser: (state, action) => {
            state.user = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const {
    setLoading,setAuthUser
} = authSlice.actions;

export default authSlice.reducer