import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const saleOrdersSlice = createSlice({
    name: 'saleOrders',
    initialState: {
        active: [],
        completed: []
    },
    reducers: {
        addOrder: (state, action) => {
            state.active.push({
                ...action.payload,
                id: uuidv4(),
                status: 'active',
                invoiceDate: action.payload.invoiceDate
            });
        },
        updateOrder: (state, action) => {
            const orderIndex = state.active.findIndex(order => order.id === action.payload.id);
            if (orderIndex !== -1) {
                state.active[orderIndex] = {
                    ...action.payload,
                    invoiceDate: action.payload.invoiceDate // Serialize date
                };
            }
        },
        completeOrder: (state, action) => {
            const orderIndex = state.active.findIndex(order => order.id === action.payload.id);
            if (orderIndex !== -1) {
                const [order] = state.active.splice(orderIndex, 1);
                order.status = 'completed';
                order.invoiceDate = `${new Date(order.invoiceDate)}`; 
                state.completed.push(order);
            }
        }
    }
});

export const { addOrder, updateOrder, completeOrder } = saleOrdersSlice.actions;
export default saleOrdersSlice.reducer;
