import { filterOptions } from "@/config";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ProductFilter({filters, handleFilter}) {
  return (
    <div className="rounded-lg shadow-sm">
      <div className="p-4">
        <h2 className="text-xl font-semibold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <>
            <div key={keyItem.label}>
              <h3 className="text-lg font-bold">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option) => (
                  <Label className="flex font-medium items-center gap-2">
                    <Checkbox
                    checked = { 
                      filters && 
                      Object.keys(filters).length > 0 && 
                      filters[keyItem] &&
                      filters[keyItem].indexOf(option.id) > -1
                    }
                    onCheckedChange ={() => handleFilter(keyItem, option.id)} />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator/>
          </>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
