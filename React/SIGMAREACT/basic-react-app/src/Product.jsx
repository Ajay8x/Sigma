import "./Product.css";
import Price from "./price";

function Product({ title, idx }) {
  const oldPrice = ["12,234", "11,443", "2,444", "4,435"];
  const newPrice = ["8,234", "7,443", "1,444", "2,435"];

  const descriptions = [
    ["Wireless Mouse", "8000 DPI"],
    ["For iPad", "Touch Surface"],
    ["Gaming Keyboard", "Touch Surface"],
    ["Mechanical Keyboard", "Wireless"]
  ];

  return (
    <div className="Product">
      <p><b>{title}</b></p>

      <p>{descriptions[idx][0]}</p>
      <p>{descriptions[idx][1]}</p>

      <Price oldPrice={oldPrice[idx]} newPrice={newPrice[idx]} />
    </div>
  );
}

export default Product;
