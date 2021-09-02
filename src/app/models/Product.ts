export default class Product {
    _id: string = ''
    name: string = ''
    categoryId?: string = ''
    price: number = 0
    image: string = ''
    quantity: number = 0
    isAdded?: boolean | undefined = false
}