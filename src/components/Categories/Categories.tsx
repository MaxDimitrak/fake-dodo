import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onChangeCategoryId, selectFilterByCategoryId } from '../../redux/slices/filterSlice'


export const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Сырные']

const Categories: React.FC = React.memo(() => {

	const currentCategoryId = useSelector(selectFilterByCategoryId)
	const dispatch = useDispatch()
	const setCurrentId = React.useCallback((index: number) => dispatch(onChangeCategoryId(index)), [])

	return (
		<div className="categories">
			<ul>
				{categories.map((category, index) =>
					<li
						key={category}
						onClick={() => setCurrentId(index)}
						className={currentCategoryId === index ? 'active' : ''}>
						{category}
					</li>
				)}
			</ul>
		</div>
	)
})

export default Categories