import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { agent } from "../shared/api/agent";
import { Task, User } from "../shared/model/task";
import { RootState } from "../shared/redux/store";

interface TaskState{
    tasks: Task[];
    users: User[];
    status: string;
}



const tasksAdapter = createEntityAdapter<Task>();

const initialState : TaskState = {
    tasks: [],
    users: [],
    status:'idle'
}

export const fetchTasksAsync = createAsyncThunk<Task[], void, {state:RootState}>(
    'task/fetchTasksAsync',
    async(_: any , thunkAPI: { rejectWithValue: (arg0: { error: any; }) => any; }) => {

        try{
            const response = await agent.Task.getTasks();

            return response.results as Task[];
        }catch(error : any){
            console.log(error);
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }

)

export const fetchUsersAsync = createAsyncThunk<User[], void, {state:RootState}>(
    'task/fetchUsersAsync',
    async(_: any , thunkAPI: { rejectWithValue: (arg0: { error: any; }) => any; }) => {

        try{
            const response = await agent.Task.getUsers();

            return response.results.data as User[];
        }catch(error : any){
            console.log(error);
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }

)



export const taskSlice= createSlice({
    name: 'task',
    initialState :tasksAdapter.getInitialState<TaskState>(
        initialState
    ),
    reducers:{
      
    },
    extraReducers: ((builder) => {
        builder.addCase(fetchTasksAsync.pending,(state, action) => {

            state.status = 'pending';
        });
        builder.addCase(fetchTasksAsync.fulfilled,(state, action) => {
            //console.log(action.payload);
            state.tasks = action.payload;
            if(action.payload.length > 0){
                tasksAdapter.setAll(state, action);
            }
            state.status = 'idle';
        });
        builder.addCase(fetchUsersAsync.fulfilled,(state, action) => {
            //console.log(action.payload);
            state.users = action.payload;
          
            state.status = 'idle';
        });
        builder.addCase(fetchTasksAsync.rejected,(state) => {
            state.status = 'idle';
        });
    })
});

