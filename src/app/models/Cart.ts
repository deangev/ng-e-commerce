import Product from "./Product"

export default class Cart {
    _id: string = ''
    products: Product[] = []
    userId: string = ''
    city: string = ''
    address: string = ''
    dateToDeliver: string = ''
    digits: number = 0
    totalPrice: number = 0
    createdAt: string = ''
    updatedAt: string = ''
}