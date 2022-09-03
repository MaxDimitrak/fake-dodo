import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'

import filterReducer from './slices/filterSlice'
import cartReducer from './slices/cartSlice'
import pizzaReducer from './slices/pizzaSlice'
import popupReducer from './slices/popupSlice'

export const store = configureStore({
	reducer: {
		filterer: filterReducer,
		cart: cartReducer,
		pizza: pizzaReducer,
		popup: popupReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

