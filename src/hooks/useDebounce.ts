import { useEffect, useState } from "react"
import { Product } from "../type/Product"

const useDebounce = <T,>(func: (items: T[], filter: string) => T[], items: T[], delay: number = 1000) => {
    const [filteredData, setFilteredData] = useState(items)
    const [filter, setFilter] = useState("")
    useEffect(() => {
        const timer = setTimeout(() => {
            setFilteredData(func(items, filter))
        }, delay)
        return () => {
            clearTimeout(timer)
        }
    }, [filter, func, items, delay])
    const onChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value)
    }
    return { onChangeFilter, filter, filteredData }
}

const filterProducts = (products: Product[], filter: string) => {
    return products.filter((product) => product.title.toLowerCase().includes(filter.toLowerCase()))
}

export { useDebounce, filterProducts }