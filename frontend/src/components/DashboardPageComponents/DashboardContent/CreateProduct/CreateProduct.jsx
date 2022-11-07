import "./CreateProduct.scss";
import { useState, useContext } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { fetchCreateNewProduct } from "../../../../api";
import { AdminContext } from "../../../../context/AdminContext";

const CreateProduct = () => {
  const { isAddProduct, setIsAddProduct } = useContext(AdminContext);

  const [name, setName] = useState("")
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach(file => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages([...images, { url: reader.result }]);
        }
      }

      reader.readAsDataURL(file);
    })
  }

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetchCreateNewProduct(name, desc, price, images, category, stock);

      if (res.success) {
        setIsAddProduct(true);
      }
    } catch (err) {
      console.log(err)
    }
  }

  const deleteProductImage = (index) => {
    const filteredImages = images.filter((_, i) => i !== index);
    setImages(filteredImages);
  }

  return (
    <div className="create__page">
      <form className="create__page__form" onSubmit={addProduct}>
        <div className="create__page__form__name">
          <input type="text" placeholder="Ürün İsmi" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="create__page__form__desc">
          <textarea type="text" placeholder="Ürün Açıklaması" value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>

        <div className="create__page__form__price">
          <input type="number" placeholder="Ürün Fiyatı" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>

        <div className="create__page__form__category">
          <input type="text" placeholder="Ürün Kategorisi" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>

        <div className="create__page__form__stock">
          <input type="number" placeholder="Stok" value={stock} onChange={(e) => setStock(e.target.value)} />
        </div>

        <div className="create__page__form__file">
          <label htmlFor="fileUpload">Dosya Yükle</label>
          <input id="fileUpload" type="file" accept="image/*" onChange={updateProductImagesChange} style={{ display: "none" }} />
        </div>

        <div className="create__page__form__images">
          {
            images.map((image, index) =>
              <div key={image._id} className="create__page__form__images__item">
                <button type="button" onClick={() => deleteProductImage(index)}>
                  <AiFillCloseCircle />
                </button>
                <img src={image.url} alt="old-images" />
              </div>
            )
          }
        </div>

        <button type="submit" className={isAddProduct ? "create__page__form__updateButton added" : "create__page__form__updateButton"}>
          {isAddProduct ? "Eklendi" : "Ekle"}
        </button>
      </form>
    </div>
  )
}

export default CreateProduct;