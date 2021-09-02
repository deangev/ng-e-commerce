import Product from "./Product"

export default class Order {
    address: string = ''
    city: string = ''
    createdAt: string = ''
    dateToDeliver: string = ''
    digits: number = 0
    products: Product[] = []
    totalPrice: number = 0
    updatedAt: string = ''
    userId: string = ''
    _id: string = ''
}