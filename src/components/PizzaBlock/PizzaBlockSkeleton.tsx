import React from "react"
import ContentLoader from "react-content-loader"

const PizzaBlockSkeleton: React.FC = (props) => (
	<ContentLoader
		className="pizza-block"
		speed={2}
		width={280}
		height={500}
		viewBox="0 0 280 500"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}
	>
		<circle cx="140" cy="140" r="125" />
		<rect x="0" y="300" rx="10" ry="10" width="280" height="18" />
		<rect x="0" y="336" rx="10" ry="10" width="280" height="88" />
		<rect x="0" y="452" rx="10" ry="10" width="91" height="30" />
		<rect x="121" y="446" rx="25" ry="25" width="154" height="45" />
	</ContentLoader>
)

export default PizzaBlockSkeleton

