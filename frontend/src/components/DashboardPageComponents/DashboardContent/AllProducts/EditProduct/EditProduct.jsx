import "./EditProduct.scss";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { ProductContext } from "../../../../../context/ProductContext";
import { fetchProductDetails, fetchUpdateProduct } from "../../../../../api";
import Loading from "../../../../Loading/Loading";

const EditProduct = () => {
  const { id } = useParams();
  const { productDetail, setProductDetail } = useContext(ProductContext);
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetchProductDetails(id);
      setProductDetail(res);
      setImages(res.images);
      setName(res.name);
      setDesc(res.description);
      setPrice(res.price);
      setCategory(res.category);
      setStock(res.stock);
      setIsLoading(false);
    })()
  }, []);

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

  const changeProductProperties = async (e) => {
    e.preventDefault();
    await fetchUpdateProduct(id, name, desc, price, images, category, stock)
  }

  const deleteProductOldImage = (index) => {
    const filteredImages = images.filter((_, i) => i !== index);
    setImages(filteredImages);
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="edit__page">
      <form className="edit__page__form" onSubmit={changeProductProperties}>
        <div className="edit__page__form__name">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="edit__page__form__desc">
          <textarea type="text" value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>

        <div className="edit__page__form__price">
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>

        <div className="edit__page__form__category">
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>

        <div className="edit__page__form__stock">
          <input type="text" value={stock} onChange={(e) => setStock(e.target.value)} />
        </div>

        <div className="edit__page__form__file">
          <label htmlFor="fileUpload">Dosya Yükle</label>
          <input id="fileUpload" type="file" accept="image/*" onChange={updateProductImagesChange} style={{ display: "none" }} />
        </div>

        <div className="edit__page__form__images">
          {
            images.map((image, index) =>
              <div key={image._id} className="edit__page__form__images__item">
                <button type="button" onClick={() => deleteProductOldImage(index)}>
                  <AiFillCloseCircle />
                </button>
                <img src={image.url} alt="old-images" />
              </div>
            )
          }
        </div>

        <button type="submit" className="edit__page__form__updateButton">Güncelle</button>
      </form>
    </div>
  )
}

export default EditProduct;