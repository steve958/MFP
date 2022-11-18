import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    projectsList: []
}

const projectsSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        addProject(state, action) {
            state.projectsList.push(action.payload)
        },
        deleteProject(state, action) {
            state.projectsList = state.projectsList.filter(project => project.id !== action.payload)
        },
        editProject(state, action) {
            state.projectsList = state.projectsList.filter(project => project.id !== action.payload.id)
            state.projectsList.push(action.payload)
        },
        clearStore(state) {
            state.projectsList = []
        }
    }

})

export const { addProject, deleteProject, clearStore, editProject } = projectsSlice.actions
export default projectsSlice.reducer