
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import CookiesServer from '../Servces/CookiesServer';


export const userLogin = createAsyncThunk('login/userLogin', async ({ email, password }, thunkApi) => {
    try {
        const res = await axios.post('http://localhost:3000/Users', { email, password });
        return res.data;
    }
    catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
})


export const loginSlice = createSlice({
    name: "login",
    initialState: {
        user: {
            isLoading: false,
            data: null,
            error: null,
            email: '',
            password: '',
            isAuth: false
        }
    },
    reducers: {
        logout(state) {
            state.user = {
                isLoading: false, data: null, error: null, email: '',
                password: '',
                isAuth: false,

            }

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.user.isLoading = true;
                state.user.error = null;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                console.log('Login fulfilled:', action.payload);
                state.user.isLoading = false;
                state.user.data = action.payload;
                state.user.error = null;
                state.user.isAuth = true;
                // Expire Data
                const date = new Date();
                const expireTime = 24 * 60 * 60 * 1000;
                date.setTime(date.getTime() + expireTime);

                const options = {
                    path: '/',
                    expires: date,
                };
                CookiesServer.set('jwt', action.payload.jwt, options);
            })
            .addCase(userLogin.rejected, (state, action) => {
                console.error('Login rejected:', action.payload);
                state.user.isLoading = false;
                state.user.error = action.payload;
            });
    }
});

export default loginSlice.reducer;

export const { logout } = loginSlice.actions;