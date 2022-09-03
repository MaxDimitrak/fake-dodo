import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TPopupItem = {
	id: number,
	size: number,
	name: string,
	price: number,
	imgUrl: string,
	type: number,
	count: number,
}

interface IPopupSliceState {
	value: boolean,
	item: TPopupItem
}

const initialState: IPopupSliceState = {
	value: false,
	item: {} as TPopupItem,
}

const popupSlice = createSlice({
	name: 'popup',
	initialState,
	reducers: {
		switchVisible(state: IPopupSliceState) {
			state.value = !state.value
		},
		setItem(state: IPopupSliceState, action: PayloadAction<TPopupItem>) {
			state.item = action.payload
		}
	}
})

export const selectorPopup = (state: RootState) => state.popup.value
export const selectorPopupItem = (state: RootState) => state.popup.item
export const selectorPopupVisible = (state: RootState) => state.popup.value

export const { switchVisible, setItem } = popupSlice.actions

export default popupSlice.reducer