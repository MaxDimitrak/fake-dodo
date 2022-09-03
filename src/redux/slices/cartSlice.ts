import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type CartItem = {
	id: number,
	name: string,
	imgUrl: string,
	price: number,
	type: number,
	size: number,
	count: number,
}

interface ICartSliseState {
	totalPrice: number;
	totalCount: number;
	items: CartItem[]
}
const initialState: ICartSliseState = {
	totalPrice: 0,
	totalCount: 0,
	items: [],
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state: ICartSliseState, action: PayloadAction<CartItem>) => {
			const findItem = state.items.find(obj => obj.id === action.payload.id)
			if (findItem) {
				findItem.count++
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				})
			}
			state.totalPrice = state.items.reduce((sum, curr) => {
				return (curr.price * curr.count) + sum
			}, 0)
			state.totalCount = state.items.reduce((sum, curItem) => sum + curItem.count, 0)
		},

		removeItem: (state: ICartSliseState, action: PayloadAction<number>) => {
			state.items = state.items.filter(object => object.id !== action.payload)
			state.totalPrice = state.items.reduce((sum, curr) => {
				return (curr.price * curr.count) + sum
			}, 0)
			state.totalCount = state.items.reduce((sum, curItem) => sum + curItem.count, 0)
		},

		minusItem: (state: ICartSliseState, action: PayloadAction<number>) => {
			const findItem = state.items.find(obj => obj.id === action.payload)
			if (findItem) {
				findItem.count--
				if (findItem.count === 0) {
					state.items = state.items.filter(item => item.id !== action.payload)
				}
			}
			state.totalPrice = state.items.reduce((sum, curr) => {
				return (curr.price * curr.count) + sum
			}, 0)
			state.totalCount = state.items.reduce((sum, curItem) => sum + curItem.count, 0)
		},

		clearItems: (state: ICartSliseState) => {
			state.items = []
			state.totalPrice = 0
		},

	},
})

export const selectorCart = (state: RootState) => state.cart
export const selectorCountItem = (id: number) => (state: RootState) => state.cart.items.find(obj => obj.id === id)

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer