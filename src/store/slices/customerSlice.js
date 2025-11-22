import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState={
    products : [],
    orders : [],
    carts : [],
    isLoading : false,
    errorMessages : [],
}

export const fetchCustomerData = createAsyncThunk(
    'customer/fetchCustomerData',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                // don't send request without token; return a clear error for UI
                return thunkAPI.rejectWithValue('No auth token');
            }
            const response = await fetch('http://localhost:3001/api/customer/data', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const text = await response.text().catch(() => response.statusText);
                return thunkAPI.rejectWithValue(text || `Status ${response.status}`);
            }

            return await response.json();
        } catch (err) {
          
            return thunkAPI.rejectWithValue(err.message || 'Network error');
        }
    }
);



export const placeOrder = createAsyncThunk(
    'customer/placeorder',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return thunkAPI.rejectWithValue('No auth token');
            }
            const response = await fetch('http://localhost:3001/api/customer/order', {
                method : 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const text = await response.text().catch(() => response.statusText);
                return thunkAPI.rejectWithValue(text || `Status ${response.status}`);
            }

            return await response.json();
        } catch (err) {
          
            return thunkAPI.rejectWithValue(err.message || 'Network error');
        }
    }
);



export const addToCart=createAsyncThunk('customer/addToCart',async (productId)=>{
    const token=localStorage.getItem('token');
    const response=await fetch(`http://localhost:3001/api/customer/carts/${productId}`,{
        method :'POST',
        headers : {
            Authorization : `Bearer ${token}`,
        },

    });
    if(response.status===200)
        return await response.json();
    else
        throw new Error(response.statusText);


}
);

export const removeFromCart=createAsyncThunk('customer/removeFromCart',async (productId)=>{
    const token=localStorage.getItem('token');
    const response=await fetch(`http://localhost:3001/api/customer/carts/${productId}`,{
    method :'DELETE',
        headers : {
            Authorization : `Bearer ${token}`,
        },

    });
    if(response.status===200)
        return await response.json();
    else
        throw new Error(response.statusText);


}
);

const customerSlice=createSlice({
    name : 'customer',
    initialState,
    reducers : {
    },
    extraReducers : (builder)=>{
    builder.addCase(fetchCustomerData.pending,(state)=>{
        state.isLoading=true;
    });
    builder.addCase(fetchCustomerData.fulfilled,(state,action)=>{
        state.isLoading=false;
        const {products,orders,carts}=action.payload;
        state.products=products;
        state.orders=orders;
        state.carts=carts;
    });
        builder.addCase(fetchCustomerData.rejected, (state, action) => {
            state.isLoading = false;
            const msg = action.payload || action.error?.message || 'Failed to fetch data';
            state.errorMessages = [msg];
        });
        builder.addCase(addToCart.fulfilled, (state, action) => {
            const payload = action.payload;
            const newCarts = payload && payload.cart ? payload.cart : (Array.isArray(payload) ? payload : undefined);
            if (Array.isArray(newCarts)) {
                state.carts = newCarts.map((c) => (c && c._id ? String(c._id) : String(c)));
            }
        });

        builder.addCase(removeFromCart.fulfilled, (state, action) => {
            const payload = action.payload;
            const newCarts = payload && payload.cart ? payload.cart : (Array.isArray(payload) ? payload : undefined);
            if (Array.isArray(newCarts)) {
                state.carts = newCarts.map((c) => (c && c._id ? String(c._id) : String(c)));
            }
        });
               builder.addCase(placeOrder.fulfilled, (state, action) => {
             state.orders.push(action.payload);
             state.carts = [];

        });
    },
})
export const customerReducer=customerSlice.reducer;