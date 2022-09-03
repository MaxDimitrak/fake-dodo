import React from 'react'
import { useDispatch } from 'react-redux'
import { onChangeCurrentPage } from '../../redux/slices/filterSlice'

import cl from './Pagination.module.scss'

type PaginationProps = {
	currentPage: number,
}

const Pagination: React.FC<PaginationProps> = ({ currentPage }) => {

	const dispatch = useDispatch()
	const countPages = [1, 2, 3]

	const setPage = (page: number) => {
		dispatch(onChangeCurrentPage(page))
	}
	return (
		<div className={cl.root}>
			<ul>
				{countPages.map(page =>
					<li
						key={page}
						className={(page === currentPage) ? cl.active : ''}
						onClick={() => setPage(page)}
					>
						{page}
					</li>)
				}
			</ul>
		</div>
	)
}

export default Pagination