import { RootState } from './../store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'


export type TFetchFilter = {
	order: string,
	sortBy: string,
	category: string,
	searchBy: string,
	currentPage: number

}
type TPizzaItem = {
	id: number,
	name: string,
	imgUrl: string,
	price: number,
	type: number,
	size: number,
	count: number,
}
interface IPizzaSliceState {
	items: TPizzaItem[],
	status: string
}
enum Status {
	LOADING = 'loading',
	FULFILLED = 'fulfilled',
	REJECT = 'reject',
}
export const fetchPizzas = createAsyncThunk<TPizzaItem[], TFetchFilter>('pizza/fetchPizzasStatus', async (params) => {
	let { order, sortBy, category, searchBy, currentPage } = params
	const { data } = await axios.get<TPizzaItem[]>(`https://62ed2633818ab252b60b026e.mockapi.io/items?${searchBy}&p=${currentPage}&l=8&${category}&sortBy=${sortBy}&order=${order}`)
	return data
})

const initialState: IPizzaSliceState = {
	items: [],
	status: 'loading',
}

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state) => {
			state.status = Status.LOADING
			state.items = []
		})
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload
			state.status = Status.FULFILLED
		})
		builder.addCase(fetchPizzas.rejected, (state) => {
			state.status = Status.REJECT
			alert('error')
			state.items = []
		})
	}
})

export const selectPizzas = (state: RootState) => state.pizza

export default pizzaSlice.reducer