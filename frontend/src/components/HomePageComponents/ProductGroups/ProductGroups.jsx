import "./ProductGroups.scss";
import { useContext } from "react";
import { fetchAllProduct } from "../../../api";
import { ProductContext } from "../../../context/ProductContext";
import ProductGroupItem from "../ProductGroupItem/ProductGroupItem";

const ProductGroups = () => {

  const productGroups = [
    {
      category: "Köpek Kıyafeti",
      image: "https://ae01.alicdn.com/kf/H018438c68fb84732aafc3f179aa823d7A/Sevimli-k-k-k-pek-k-yafeti-yumu-ak-pelu-k-pek-yavrusu-kedi-T-Shirt.jpg_Q90.jpg_.webp"
    },
    {
      category: "Kedi Kıyafeti",
      image: "https://fabrikamaliyet.today/S%C3%BCper-tatl%C4%B1-pet-kedi-giysileri-tav%C5%9Fan-kulaklar-yavru_pics-22356/1_wp-upload.jpeg"
    },
    {
      category: "Oyuncak",
      image: "https://i0.wp.com/www.petneym.com/wp-content/uploads/2021/11/kopek-aksesuarlari-6.png?resize=1280%2C720&ssl=1"
    },
    {
      category: "Tasma",
      image: "https://www.createrra.com.tr/image/cache/wkseller/296/40b394409266eb8a98b6bed7b44bec4dff01ba18-1000x1230.jpg"
    },
    {
      category: "Köpek Maması",
      image: "https://d.neoldu.com/news/78803.jpg"
    },
    {
      category: "Kedi Maması",
      image: "https://blog.zoo.com.tr/wp-content/uploads/yavrukedivemamasi.jpg"
    }
  ];

  return (
    <div className="product__groups">
      <div className="product__groups__title">
        <h1>Ürün Gruplarımız</h1>
      </div>
      <ul className="product__groups__list">
        <ProductGroupItem productGroups={productGroups} />
      </ul>
    </div>
  )
}

export default ProductGroups;