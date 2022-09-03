import React from 'react'
import { Link } from 'react-router-dom'
import { useGetPizzas } from '../../Hook/useGetPizzas'
import s from './NotFoundBlock.module.scss'


const NotFoundBlock: React.FC = () => {

	const getPizza = useGetPizzas
	return (
		<div className={s.root}>
			<h1>
				<span>😕</span><br />
				Ничего не найдено...
			</h1>
			<p className={s.desription}>К сожалению данная страница отсутствует на нашем сайте</p>
			<Link onClick={() => getPizza()} to="/" className="button button--black">
				<span>На главную</span>
			</Link>
		</div>
	)
}

export default NotFoundBlock