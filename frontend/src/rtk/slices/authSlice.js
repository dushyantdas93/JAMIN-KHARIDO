import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.js";

import { redirect } from "react-router-dom";

export const customer_register = createAsyncThunk(
  "auth/customer_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/customer", info);
      localStorage.setItem("customerToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const customer_login = createAsyncThunk(
  "auth/customer_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await api.post("auth/customer/login", info);
      localStorage.setItem("customerToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const customer_logout = createAsyncThunk(
  "auth/customer_logout",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/auth/customer/logout");
      localStorage.removeItem("customerToken");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const authReducer = createSlice({
  name: "auth",
  initialState: {
    loader: false,
    userInfo: null,
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    user_reset: (state, _) => {
      state.userInfo = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(customer_register.pending, (state) => {
        state.loader = true;
      })
      .addCase(customer_register.rejected, (state, { payload }) => {
        state.errorMessage = payload.message;
        state.loader = false;
      })
      .addCase(customer_register.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.loader = false;
        state.userInfo = userInfo;
           redirect("/login");
      })
      .addCase(customer_login.pending, (state) => {
        state.loader = true;
      })
      .addCase(customer_login.rejected, (state, { payload }) => {
        state.errorMessage = payload.message;
        state.loader = false;
      })
      .addCase(customer_login.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.successMessage = payload.message;
        state.loader = false;
        state.userInfo = payload.isPresent;
           redirect("/");
      })
      .addCase(customer_logout.fulfilled, (state, { payload }) => {
        state.userInfo = null;
        state.successMessage = payload.message;
        redirect("/");
        state.loader = false;
      });
  },
});

export const { messageClear, user_reset } = authReducer.actions;
export default authReducer.reducer;
