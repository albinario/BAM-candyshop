import { OrderItem } from './types'

export interface IOrder {
	"customer_first_name": string,
	"customer_last_name": string, 
	"customer_address": string, 
	"customer_postcode": string, 
	"customer_city": string, 
	"customer_email": string, 
	"order_total": number, 
	"order_items": OrderItem[]
}