import { useSelector } from "react-redux"
import { selectFilterer, selectSearchValue } from "../redux/slices/filterSlice"
import { fetchPizzas } from "../redux/slices/pizzaSlice"
import { useAppDispatch } from "../redux/store"

export const useGetPizzas = () => {

	const searchValue = useSelector(selectSearchValue)
	const { categoryId, sortType, currentPage } = useSelector(selectFilterer)
	const dispatch = useAppDispatch()

	const order = sortType.type.includes('-') ? 'asc' : 'desc'
	const sortBy = sortType.type.replace('-', '')
	const category = categoryId > 0 ? `category=${categoryId}` : ''
	const searchBy = searchValue ? `search=${searchValue}` : ''


	dispatch(
		fetchPizzas({
			order,
			sortBy,
			category,
			searchBy,
			currentPage,
		}
		))
}