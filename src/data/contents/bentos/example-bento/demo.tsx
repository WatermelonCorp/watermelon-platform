export default function ExampleBento() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl mx-auto">
      <div className="col-span-1 md:col-span-2 row-span-2 bg-blue-500 rounded-3xl p-8 text-white min-h-[300px]">
        <h2 className="text-3xl font-bold">Main Bento Block</h2>
        <p className="mt-4 opacity-80">This occupies 2 columns and 2 rows on desktop.</p>
      </div>
      <div className="col-span-1 row-span-1 bg-green-500 rounded-3xl p-8 text-white min-h-[150px]">
        <h3 className="text-xl font-bold">Small Block</h3>
      </div>
      <div className="col-span-1 row-span-1 bg-purple-500 rounded-3xl p-8 text-white min-h-[150px]">
        <h3 className="text-xl font-bold">Small Block 2</h3>
      </div>
      <div className="col-span-1 md:col-span-3 row-span-1 bg-orange-500 rounded-3xl p-8 text-white min-h-[150px]">
        <h2 className="text-2xl font-bold">Bottom Full Width Block</h2>
      </div>
    </div>
  );
}
