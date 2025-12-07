import React from "react";

interface Props {
  name: string;
  price: number;
}

function ProductItem({ name, price }: Props) {
  console.log(`Rendered: ${name}`);
  return (
    <div className="p-3 border-b flex justify-between">
      <span>{name}</span>
      <span>{price.toLocaleString()}원</span>
    </div>
  );
}

export default React.memo(ProductItem);
