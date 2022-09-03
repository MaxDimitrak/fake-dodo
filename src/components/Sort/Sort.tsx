import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { onChangeSortType, selectSortType } from '../../redux/slices/filterSlice'

type SortTypeItem = {
	name: 'популярные' | 'менее популярные' | 'дороже' | 'дешевле' | 'алфавиту'
	type: 'raiting' | 'price' | 'name' | '-raiting' | '-price' | '-name'
}

export const listName: SortTypeItem[] = [
	{ name: 'популярные', type: 'raiting' },
	{ name: 'менее популярные', type: '-raiting' },
	{ name: 'дороже', type: 'price' },
	{ name: 'дешевле', type: '-price' },
	{ name: 'алфавиту', type: '-name' }
]

const Sort: React.FC = React.memo(() => {
	const sortType = useSelector(selectSortType)
	const dispatch = useDispatch()
	const [isVisiblePopup, setisVisiblePopup] = React.useState(false)
	const sortRef = React.useRef<HTMLDivElement>(null)

	const setType = (index: number) => {
		setisVisiblePopup(!isVisiblePopup)
		dispatch(onChangeSortType((listName[index])))
	}

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (sortRef.current && !event.composedPath().includes(sortRef.current))
				setisVisiblePopup(false)
		}
		document.body.addEventListener('click', handleClickOutside)
		return () => document.body.removeEventListener('click', handleClickOutside)
	}, [])
	return (
		<div ref={sortRef} className="sort">
			<div className="sort__label">
				<svg className={isVisiblePopup ? 'rotate' : ''}
					width="10"
					height="6"
					viewBox="0 0 10 6"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
						fill="#2C2C2C"
					/>
				</svg>
				<b>Сначала:</b>
				<span onClick={() => setisVisiblePopup(!isVisiblePopup)}>{sortType.name}</span>

			</div>
			{isVisiblePopup &&
				<div className="sort__popup">
					<ul>
						{listName.map((obj, i) =>
							<li
								className={sortType.name === obj.name ? 'active' : ''}
								key={obj.name}
								onClick={() => setType(i)}
							>
								{obj.name}
							</li>)}
					</ul>
				</div>
			}
		</div>
	)
})

export default Sort