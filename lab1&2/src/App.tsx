import { useState, useCallback, useMemo } from "react";
import ProductItem from "./components/ProductItem";
import { products } from "./data/products";
import Face from "./components/face";

function App() {
  const [query, setQuery] = useState("");
  const [sortType, setSortType] = useState<"asc" | "desc">("asc");

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const handleSort = useCallback((type: "asc" | "desc") => {
    setSortType(type);
  }, []);

  const filtered = useMemo(() => {
    console.log("filtered 리스트 재계산됨");

    const result = products
      .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) =>
        sortType === "asc" ? a.price - b.price : b.price - a.price
      );

    return result;
  }, [query, sortType]); 
  // query 또는 sortType이 바뀔 때만 재연산

  return (
    <>
    <Face />
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">상품 리스트</h1>

      {/* 검색창 */}
      <input
        type="text"
        placeholder="검색..."
        value={query}
        onChange={handleSearch}
        className="border p-2 w-full mb-3"
      />

      {/* 정렬 버튼 */}
      <div className="flex gap-2 mb-4">
        <button
          className="border px-3 py-1"
          onClick={() => handleSort("asc")}
        >
          가격 up
        </button>
        <button
          className="border px-3 py-1"
          onClick={() => handleSort("desc")}
        >
          가격 down
        </button>
      </div>
      

      {/* 리스트 */}
      <div className="border">
        {filtered.map((p) => (
          <ProductItem key={p.id} name={p.name} price={p.price} />
        ))}
      </div>
    </div>
    </>
  );
}

export default App;
