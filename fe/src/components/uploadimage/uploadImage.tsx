import { Button, Image, Upload } from 'antd';
import { Notify } from '../../helpers';
import React, { useEffect, useState } from 'react';
import avtD from '../../assets/images/defaultThumb.jpg';

// excute base64 for image
export const getBase64 = (img: any, callback: any) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result, img.type));
  reader.readAsDataURL(img);
};

const UploadImage = (props: any) => {
  const {
    title,
    imgDefault,
    onHandleDataImg,
    label,
    accept = '.png,.jpg,.jpeg',
    showUploadList = true,
    maxCount = 1,
    imageFallback,
  } = props;

  const [dataImg, setDataImg] = useState<any>();
  //check hình default
  useEffect(() => {
    if (imgDefault) {
      setDataImg(imgDefault);
    }
  }, [imgDefault]);

  //check type
  //check size
  const onRemove = (e: any) => {
    setDataImg('');
  };

  const onChangePictureFront = (e: any) => {
    if (
      e.fileList[0].type.includes('png') ||
      e.fileList[0].type.includes('jpg') ||
      e.fileList[0].type.includes('jpeg')
    ) {
      if (((e.fileList[0].size / 1000 / 1024) * 100) / 100 < 2) {
        if (e.fileList.length > 0 && e.fileList[0].originFileObj) {
          setDataImg(e.fileList[0].originFileObj);
          const reader = new FileReader();
          reader.addEventListener('load', () => {
            const base64Img = (reader.result as string).substring(
              (reader.result as string).indexOf(',') + 1
            );
            setDataImg(reader.result);
            onHandleDataImg({
              base64: base64Img,
              fileName: e.fileList[0].originFileObj.name,
            });
          });
          reader.readAsDataURL(e.fileList[0].originFileObj);
        } else {
          onHandleDataImg();
        }
      }
    } else {
      Notify.error('', 'Hình upload phải có định dạng: jpg, jpeg, png!');
    }
  };
  const dummyRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const beforeUpload = (file: any) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpeg';
    if (!isJpgOrPng) {
      Notify.error('', 'Bạn chỉ được tải lên loại file JPG/JPEG/PNG !');
      return false;
    }
    const isLt2M = ((file.size / 1000 / 1024) * 100) / 100;
    if (isLt2M > 2) {
      Notify.error('', 'Kích thước ảnh phải nhỏ hơn 2MB!');
      return false;
    }
    return isJpgOrPng;
  };

  return (
    <div className="title-style text-center">
      <Image
        width={'auto'}
        height={100}
        src={dataImg}
        preview={{
          src: dataImg,
        }}
        style={{
          background: 'gray',
        }}
        fallback={imageFallback ? imageFallback : avtD}
      />
      <h4
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {title}
      </h4>
      <div className="spacing__bottom"></div>
      <Upload
        customRequest={dummyRequest}
        onChange={onChangePictureFront}
        onRemove={onRemove}
        name="Chọn ảnh"
        // eslint-disable-next-line no-useless-concat
        accept={accept}
        maxCount={maxCount}
        showUploadList={showUploadList}
        beforeUpload={beforeUpload}
      >
        <Button>{label}</Button>
      </Upload>
      &emsp;
    </div>
  );
};
export default UploadImage;
