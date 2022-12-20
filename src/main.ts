import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import { apiUrl, getItems } from './api'

const items = await getItems()

const mainEl = document.querySelector('main')!

mainEl.innerHTML = items.data.map(item => `
		<div class="card col-5 p-0 m-2">
			<img src="${apiUrl}${item.images.large}" class="card-img-top" alt="${item.name}">
			<div class="card-body">
				<h5 class="card-title">${item.name}</h5>
				<p class="card-text">${item.price}</p>
				<a href="#" class="btn btn-primary">Buy</a>
			</div>
		</div>
	`)
	.join('')