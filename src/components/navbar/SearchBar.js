import Icon from '../Icon'
import './searchBar.css'

function SearchBar(props) {
	return (
		<div
			id='search-bar'
			className='d-flex w-75 pt-2 pt-sm-0 mx-auto rounded-pill overflow-hidden'
		>
			<form>
				<input
					className='form-control px-3 py-2 me-2 border-0'
					type='search'
					placeholder='Search for a repository'
					aria-label='Search for a repository'
				/>
			</form>
			<ul className='d-flex flex-row m-0'>
				<li>
					<button>
						<Icon src='../icons/tick-outline.svg' alt='Repository loaded' />
					</button>
				</li>
				<li>
					<button>
						<Icon
							src='../icons/baseline-folder-open.svg'
							alt='Choose repository'
						/>
					</button>
				</li>
			</ul>
		</div>
	)
}

export default SearchBar
