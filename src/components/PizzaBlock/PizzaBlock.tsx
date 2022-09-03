import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, selectorCountItem } from '../../redux/slices/cartSlice'
import { switchVisible, setItem, selectorPopupVisible } from '../../redux/slices/popupSlice'

type PizzaBlockProps = {
	id: number,
	sizes: number[],
	name: string,
	price: number,
	imgUrl: string,
	types: number[]
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, sizes, name, price, imgUrl, types }) => {

	const [pizzaSize, setPizzaSize] = React.useState(sizes[0])
	const [pizzaType, setPizzaType] = React.useState(types[0])
	const typesName = ['традиционное', 'тонкое']
	const dispatch = useDispatch()
	const countItem = useSelector(selectorCountItem(id))
	const count = countItem?.count ? countItem.count : 0
	const onClickAdd = () => {
		const item = {
			id,
			name,
			imgUrl,
			price,
			type: pizzaType,
			size: pizzaSize,
			count
		}
		dispatch(addItem(item))
	}

	const onClickPopup = () => {
		const popupItem = {
			id,
			size: pizzaSize,
			name,
			price,
			imgUrl,
			type: pizzaType,
			count,
		}
		dispatch(switchVisible())
		dispatch(setItem(popupItem))
	}
	return (
		<div className="pizza-block">
			<img
				onClick={onClickPopup}
				className="pizza-block__image"
				src={imgUrl}
				alt="Pizza"
			/>
			<h4 className="pizza-block__title">{name}</h4>
			<div className="pizza-block__selector">
				<ul>
					{types.map(type =>
						<li
							key={type}
							className={type === pizzaType ? 'active' : ''}
							onClick={() => setPizzaType(type)}
						>
							{typesName[type]}
						</li>)}
				</ul>
				<ul>
					{sizes.map((size) =>
						<li
							key={size}
							onClick={() => setPizzaSize(size)}
							className={size === pizzaSize ? 'active' : ''}
						>
							{size} см
						</li>)}
				</ul>
			</div>
			<div className="pizza-block__bottom">
				<div className="pizza-block__price">от {price} ₽</div>
				<button
					className="button button--outline button--add"
					onClick={onClickAdd}
				>
					<svg

						width="12"
						height="12"
						viewBox="0 0 12 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
							fill="white"
						/>
					</svg>
					<span>Добавить</span>
					{count > 0 && <i>{count}</i>}
				</button>
			</div>
		</div >
	)
}

export default PizzaBlock