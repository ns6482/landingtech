export default class {

    id: string
    name: string
    parcels: number
    total: number
    parent: string
    children: this[]

    constructor(company_id: string, name: string, parent: string = null, parcels: number = 0) {
        this.id = company_id
        this.name = name
        this.parent = parent
        this.parcels = parcels
        this.total = parcels
        this.children = []
    }

    get description () {
        return `${this.name}, parcels owned: ${this.total}`
    }

    toJSON() {
        if (this.children.length) {
            return {
                [this.id]: this.description,
                ['sub-companies']: this.children
            }
        }
        return {
            [this.id]: this.description,
        }
    }
}
