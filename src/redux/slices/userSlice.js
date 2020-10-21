import {createSlice} from '@reduxjs/toolkit'

const initialState= {}

const userSlice = createSlice({
    name='userSlice',
    initialState,
    reducers: {
        addUser(state) {
            console.log('added user')
        },
        retrieveUser(state) {
            console.log('retrieved user')
        }
    }
})

export const {addUser, retrieveUser} = userSlice.actions
export default userSlice.reducer