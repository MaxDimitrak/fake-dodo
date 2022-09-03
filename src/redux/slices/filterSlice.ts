import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TSortType = {
	name: 'популярные' | 'менее популярные' | 'дороже' | 'дешевле' | 'алфавиту'
	type: 'raiting' | 'price' | 'name' | '-raiting' | '-price' | '-name'
}

export interface IFilterSliceState {
	categoryId: number,
	currentPage: number,
	searchValue: string,
	sortType: TSortType,
}
const initialState: IFilterSliceState = {
	categoryId: 0,
	currentPage: 1,
	searchValue: '',
	sortType: { name: 'популярные', type: 'raiting' },
}

export const filterSlice = createSlice({
	name: 'filterer',
	initialState,
	reducers: {
		onChangeCategoryId: (state: IFilterSliceState, action: PayloadAction<number>) => {
			state.categoryId = action.payload
		},
		onChangeSortType: (state: IFilterSliceState, action: PayloadAction<TSortType>) => {
			state.sortType = action.payload
		},
		onChangeCurrentPage: (state: IFilterSliceState, action: PayloadAction<number>) => {
			state.currentPage = action.payload
		},
		onSearch: (state: IFilterSliceState, action: PayloadAction<string>) => {
			state.searchValue = action.payload
		},
		setFilters: (state: IFilterSliceState, action: PayloadAction<IFilterSliceState>) => {
			if (!action.payload.sortType) {
				state.sortType = { name: 'популярные', type: 'raiting' }
				return;
			}
			if (!action.payload.currentPage) {
				state.currentPage = 1
				return;
			}
			if (!action.payload.categoryId) {
				state.categoryId = 0
				return
			}
			state.categoryId = Number(action.payload.categoryId)
			state.currentPage = Number(action.payload.currentPage)
			state.sortType = (action.payload.sortType)
			state.searchValue = action.payload.searchValue
		}
	},
})

export const selectSortType = (state: RootState) => state.filterer.sortType
export const selectSearchValue = (state: RootState) => state.filterer.searchValue
export const selectFilterByCategoryId = (state: RootState) => state.filterer.categoryId
export const selectFilterer = (state: RootState) => state.filterer

export const {
	onChangeCategoryId,
	onChangeSortType,
	onChangeCurrentPage,
	onSearch,
	setFilters,
} = filterSlice.actions

export default filterSlice.reducer