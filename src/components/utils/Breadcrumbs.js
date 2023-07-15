import React from 'react'
import './breadcrumbs.css'

const Breadcrumbs = ({ path }) => {
	const isLastPage = (page) => {
		// If page is the last element
		console.log(path[path.length - 1] === page)
		return path[path.length - 1] === page
	}

	return (
		<nav aria-label='breadcrumb'>
			<ol className='breadcrumb m-0'>
				{path.map((element) => (
					<li
						key={element}
						className='breadcrumb-item'
						aria-current={isLastPage(element) ? 'page' : ''}
					>
						{element}
					</li>
				))}
				{/* <li className='breadcrumb-item'>angle</li>
				<li className='breadcrumb-item active' aria-current='page'>
					object1
				</li> */}
			</ol>
		</nav>
	)
}

export default Breadcrumbs
