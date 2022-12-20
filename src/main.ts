import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import { apiUrl, getItems } from './api'
import { shuffleArray } from './functions'

export type Item = {
	id: number
	name: string
	description: string
	price: number
	on_sale: boolean
	images: {
		thumbnail: string
		large: string
	}
	stock_status: string
	stock_quantity: number
}

const items = await getItems()
const itemsArr: Item[] = items.data
shuffleArray(itemsArr)

const mainEl = document.querySelector('main')!

mainEl.innerHTML = itemsArr.map(item => `
	<div class="col-6 col-md-4 col-lg-3">
		<div class="card my-2">
			<img src="${apiUrl}${item.images.thumbnail}" class="card-img-top" alt="${item.name}">
			<div class="card-body">
				<h5 class="card-title">${item.name}</h5>
				<p class="card-text">${item.price} sek</p>
				<div class="d-flex justify-content-between">
					<button href="#" class="btn btn-warning"><i class="fa-regular fa-eye"></i> <span class="d-none d-sm-inline">View</span></button>
					<button href="#" class="btn btn-success"><i class="fa-solid fa-plus"></i> Buy</button>
				</div>
			</div>
		</div>
	</div>
`)
.join('')