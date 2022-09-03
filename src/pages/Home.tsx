import React from 'react'
import { useSelector } from 'react-redux';
import qs from 'qs'
import { useNavigate } from 'react-router-dom';

import PizzaBlockSkeleton from '../components/PizzaBlock/PizzaBlockSkeleton';
import Categories, { categories } from '../components/Categories/Categories';
import Sort from '../components/Sort/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Pagination from '../components/Pagination/Pagination';
import { IFilterSliceState, selectFilterer, selectSearchValue, setFilters } from '../redux/slices/filterSlice';
import { listName } from '../components/Sort/Sort';
import { fetchPizzas, selectPizzas } from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';
import NotFoundBlock from '../components/NotFoundBlock/NotFoundBlock';


const Home: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const searchValue = useSelector(selectSearchValue)
	const { categoryId, sortType, currentPage } = useSelector(selectFilterer)
	const { items, status } = useSelector(selectPizzas)
	const isMount = React.useRef(false)
	const isSearch = React.useRef(false)

	const skeletons = [... new Array(8)].map((_, index) => <PizzaBlockSkeleton key={index} />)

	//getting pizza
	const getPizzas = async () => {
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

	//parse searchData from qs
	const parseSearch = () => {
		const queryString = qs.stringify({
			searchValue,
			currentPage,
			categoryId,
			sortType: sortType.type,
		})
		navigate(`?${queryString}`)
	}

	//parse filters to qs
	const setterFilters = (locSearch: any) => {
		const params = (qs.parse(locSearch.substring(1)) as unknown) as IFilterSliceState
		const sort = listName.find(obj => obj.type === String(params.sortType))
		if (sort) {
			params.sortType = sort
		}
		if (!params.currentPage) {
			params.currentPage = 1
		}
		if (!params.categoryId) {
			params.categoryId = 0;
		}
		dispatch(setFilters({
			searchValue: params.searchValue,
			currentPage: params.currentPage,
			categoryId: params.categoryId,
			sortType: params.sortType
		})
		)
		isSearch.current = true
	}

	//On first render componnent. if qs has data, pasre it to setterFilters
	React.useEffect(() => {
		if (window.location.search)
			setterFilters(window.location.search)
	}, [])

	//When change filter. ((TIP) On first render setterFilters change filter) if it's first render, get pizzas without search/qs params
	React.useEffect(() => {
		if (!isSearch.current) {
			getPizzas()
		}
		window.scrollTo(0, 0)
		isSearch.current = false
	}, [categoryId, sortType, currentPage, searchValue])

	//When change filter. parse search data
	React.useEffect(() => {
		if (isMount.current) {
			parseSearch()
		}
		isMount.current = true;
	}, [categoryId, sortType, currentPage, searchValue,])

	if (!listName.find(item => item.type === sortType.type)
		|| sortType === null
		|| (categoryId < 0 || categoryId > 5)) {
		return <NotFoundBlock />
	}

	return (
		<div className='container'>
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h1 className="content__title">{categories[categoryId]}</h1>
			{status === 'reject'
				? <div className='content__error-info'>
					<h2>Произошла ошибка при загрузке пицц 😕</h2>
					<p>Попробуйте попытку позже</p>
				</div>
				: <div className="content__items">
					{status === 'loading' ? skeletons : items.map((item: any) => <PizzaBlock key={item.id} {...item} />)}
				</div>
			}
			<Pagination currentPage={currentPage} />
		</div>
	)
}

export default Home