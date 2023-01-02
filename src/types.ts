export type Candy = {
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

export type CandyInCart = {
	candy: Candy
	in_cart: number
	in_stock: number
	show: boolean
}

export type OrderItem = {
	"product_id": number
	"qty": number
	"item_price": number
	"item_total": number
}

export type OrderedItem = {
	"id": number
	"item_price": number
	"item_total": number
	"order_id": number
	"product_id": number
	"qty": number
}