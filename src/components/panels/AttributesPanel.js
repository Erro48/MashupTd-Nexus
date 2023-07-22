import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../utils/Breadcrumbs'
import Attribute from '../utils/Attribute/Attribute'
import Banner from '../utils/Banner'
import './attributesPanel.css'
import Icon from '../utils/Icon'

const getInitialValue = (attribute) => {
	if (attribute.enum !== undefined) {
		return attribute.enum[0]
	}

	if (attribute.type === undefined) {
		return getInitialValue(attribute.input)
	}

	if (attribute.type === 'string') {
		return ''
	}

	if (attribute.type === 'array') {
		return getInitialValue(attribute.items)
	}

	if (attribute.minimum !== undefined) {
		return attribute.minimum
	}

	if (attribute.maximum !== undefined) {
		return attribute.maximum
	}

	return 0
}

const displayAttributesList = (attributes) => {
	if (attributes === undefined || attributes.length === 0) {
		return <Banner type='info'>No attributes</Banner>
	}

	return (
		<ul className='m-0 attributes-list overflow-auto'>
			{attributes.map((attribute) => (
				<li>
					<Attribute
						attribute={attribute}
						onChange={() => console.log('TODO: onChange')}
					/>
				</li>
			))}
		</ul>
	)
}

/**
 * attribute:
 *
 * Nella sezione 'actions':
 * - Senza 'input': non ha parametri (mostrare schermata "niente parametri" o simili).
 * - 'input' di tipo oggetto:
 * 		- Senza 'properties': non ha senso.
 * 		- 'properties': va gestita come 'actions', quindi chiamare ricorsivamente.
 * 		- ha un attributo 'summary', che sarà una mappa "nome attributo di properties" --> "valore"
 * - 'input' di un altro tipo: ha un attributo "value" che:
 * 		- inizialmente sarà impostato con un valore di default (per esempio il minimo).
 * 		- successivamente avrà il valore impostato dall'utente.
 * 		- per il tipo array il valore di "value" sarà uguale per ogni elemento dell'array
 */

const AttributesPanel = ({ activeAffordance }) => {
	const [affordance, setAffordance] = useState(activeAffordance)

	// Update affordance on attribute change
	useEffect(() => {
		if (activeAffordance === undefined) return

		if (activeAffordance.affordanceType === 'actions') {
			// If not has input
			if (activeAffordance.input === undefined) {
				setAffordance({
					...activeAffordance,
					address: `address/${activeAffordance.title}`,
					attributes: [],
				})
				return
			}

			// Remove input from activeAffordance fields
			const { input, ...affordanceFields } = activeAffordance
			const attributes = [{ ...input }]

			// If input is an object
			if (
				activeAffordance.input.type === 'object' ||
				activeAffordance.input.properties !== undefined
			) {
				// Bisogna aggiungere il campo 'summary'
				setAffordance({
					...activeAffordance,
					address: `address/${activeAffordance.title}`,
					warning: 'CAMPO TEMPORANEO',
					attributes: attributes,
				})
				return
			}

			// For other types of input
			setAffordance({
				...affordanceFields,
				address: `address/${activeAffordance.title}`,
				value: getInitialValue(activeAffordance),
				attributes: attributes,
			})

			return
		}

		setAffordance({
			...activeAffordance,
			address: `address/${activeAffordance.title}`,
			attributes: [],
		})
	}, [activeAffordance])

	if (affordance === undefined) return <></>
	console.log(affordance)

	return (
		<section className='col col-sm-12 px-0' data-panel='attributes-panel'>
			<header>
				<h2>{affordance.title}</h2>
				<p className='subtitle mb-0'>{affordance.address}</p>
			</header>
			<Breadcrumbs path={[]} />
			<section className='row px-2'>
				<div className='col-12 col-sm-7 mb-3 mb-sm-0'>
					{displayAttributesList(affordance.attributes)}
				</div>
			</section>
			<footer className='row w-100 m-auto'>
				{/* {currentAffordance.parents.length > 0 ? (
					<button
						className='col-1 btn light-btn'
						onClick={() => console.log('expand')}
					>
						<Icon
							src={'./icons/left-arrow-dark.svg'}
							alt={'Go to previous attribute'}
						/>
					</button>
				) : (
					<div className='col-1'></div>
				)} */}

				<div className='col-9'></div>

				<button
					type='button'
					className='button primary-btn col-2'
					onClick={() => console.log('Submit')}
				>
					Submit
				</button>
			</footer>
		</section>
	)
}

export default AttributesPanel
