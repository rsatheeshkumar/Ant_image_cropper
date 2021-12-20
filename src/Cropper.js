import React from "react";
import { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const Cropper = () => {
  const [src, setSelectFile] = useState(null);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setSelectFile(URL.createObjectURL(e.target.files[0]));
  };
  function getCroppedImg() {
    const canvas = document.createElement("canvas");
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
    // canvas.toBlob((blob) => {
    //   setResult(blob);
    // });
    const base64Image = canvas.toDataURL("image/jpeg");
    setResult(base64Image);
  }
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <input type="file" accept="image/*" onChange={handleChange} />
          </div>
          {src && (
            <div className="col-6">
              <ReactCrop
                src={src}
                onImageLoaded={setImage}
                crop={crop}
                onChange={setCrop}
              />
              <button className="btn btn-danger" onClick={getCroppedImg}>
                CropImage
              </button>
            </div>
          )}
          {result && (
            <div className="col-6">
              <img src={result} alt="ci" className="img-fluid" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cropper;
