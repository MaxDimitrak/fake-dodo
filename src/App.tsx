import Header from './components/Header/Header';
import React from 'react';
import Home from './pages/Home';
import './scss/app.scss';
import NotFound from './pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
import { useSelector } from 'react-redux'
import PizzaPopup from './components/PizzaPopup/PizzaPopup';
import { selectorPopup } from './redux/slices/popupSlice';


const App: React.FC = () => {

	const visible: boolean = useSelector(selectorPopup)

	return (
		<>
			<div className={`${visible ? 'popup-active' : ''}`}></div>
			<div className={"wrapper"}>
				<Header />
				<div className="content">
					{visible && <PizzaPopup />}
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</div>
			</div>
		</>

	);
}

export default App;
