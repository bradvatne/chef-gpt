type ListProps = {
  options: string;
  items: string[];
};

export default function List({ options, items }: ListProps) {
  return (
    <fieldset>
      <legend className="sr-only">{options}</legend>
      <div className="space-y-5">
        {items.map((item, id) => (
          <div className="relative flex items-start" key={id}>
            <div className="flex h-6 items-center">
              <input
                id="comments"
                aria-describedby="comments-description"
                name="comments"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label htmlFor="comments" className="font-medium text-gray-900">
                {item}
              </label>
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
