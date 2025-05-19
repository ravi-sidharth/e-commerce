import { filterOptions } from "@/config";

function ProductFilter() {
  return (
    <div className="bg-backgound rounded-lg shadow-sm ">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <>
            <div className="text-base font-bold ">
              I<h3>{keyItem}</h3>
            </div>
            <div className="grid gap-2 mt-2 ">
                {
                filterOptions
                }
                </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
