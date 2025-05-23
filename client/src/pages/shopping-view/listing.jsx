import ProductFilter from "@/components/shopping-view/filter";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { fetchAllFilteredProducts } from "@/store/shop/product-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ShoppingListing() {

  const {products} = useSelector(state => state.userProducts)
  const dispatch = useDispatch()
  const [filters,setFilters ] = useState({})
  const [sort, setSort] = useState(null)

  function handleSort(value) {
    console.log(value,"sortValue")
    setSort(value)
  }

  function handleFilter(getSectionId, getCurrentOption) {
    console.log(getSectionId, getCurrentOption)

    let cpyFilters ={...filters}
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId)
    if (indexOfCurrentSection === -1) {
      cpyFilters= {
        ...cpyFilters, 
        [getSectionId] : [getCurrentOption]
      }
    } else {
      const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption)
      if(indexOfCurrentOption === -1) cpyFilters[getSectionId].push(getCurrentOption)
      else cpyFilters[getSectionId].splice(indexOfCurrentOption,1)
    }
    setFilters(cpyFilters)
    sessionStorage.setItem('filters',JSON.stringify(cpyFilters))

    console.log(filters,"filters")
  }

  useEffect(()=> {
    setSort('price-lowtohigh')
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
  },[])

  

  useEffect(()=> {
    dispatch(fetchAllFilteredProducts()).then(data=> {
      console.log(data.payload.data,"data")
      
    })
  },[dispatch])

  
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-5 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-zinc-100 w-full rounded-lg shadow-sm">
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="">{products?.length} Products </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="flex items-center gap-1"
                  variant="outline"
                  size="sm"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] border-none bg-white">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort} >
                  {
                    sortOptions.map(sortItem=> <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                    )
                  }
                    
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {
            products && products.length > 0 ?
            products.map(productItem=> <ShoppingProductTile product={productItem} />) :null
          }
        </div>
      </div>
    </div>
  );
}

export default ShoppingListing;
