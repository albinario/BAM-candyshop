import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import { apiUrl, getCandys } from './api'
import { Candy } from './types'
import { shuffleArray } from './functions'

const candys = await getCandys()
const candysArr: Candy[] = candys.data
shuffleArray(candysArr)

const mainEl = document.querySelector('main')!

mainEl.innerHTML = candysArr.map(candy => `
	<div class="col-6 col-md-4 col-lg-3">
		<div class="card my-2">
			<img src="${apiUrl}/${candy.images.thumbnail}" class="card-img-top" alt="${candy.name}">
			<div class="card-body">
				<p class="card-title">${candy.name}</p>
				<p class="card-text">${candy.price} sek</p>
				<div class="d-flex justify-content-between">
					<button href="#" class="btn btn-warning" aria-label="view-candy"><i class="fa-regular fa-eye"></i><span class="d-none d-sm-inline"> View</span></button>
					<button href="#" class="btn btn-success" aria-label="buy-candy"><i class="fa-solid fa-plus"></i> Buy</button>
				</div>
			</div>
		</div>
	</div>
`)
.join('')