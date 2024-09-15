import { ChangeEvent, useEffect, useRef, useState } from 'react';

import './ImageUpload.css';

import Button from '../Button/Button';
import { IImageUploadProps } from '../../../../types/interfaces';

const ImageUpload: React.FC<IImageUploadProps> = (props) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(true);
  const filePickerRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader: FileReader = new FileReader();

    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        setPreviewUrl(fileReader.result);
      }
    };

    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let pickedFile: undefined | File = undefined;
    const fileSizeLimit: number = 500000;

    if (
      event.target?.files &&
      event.target.files.length === 1 &&
      event.target.files[0].size < fileSizeLimit
    ) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
    } else {
      setIsValid(false);
      setPreviewUrl(null);
    }

    props.onInput(props.id, pickedFile, isValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current?.click();
  };

  return (
    <div className='form-control'>
      <input
        type='file'
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        accept='.jpg,.png,.jpeg'
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && 'center'} `}>
        <div className='image-upload__preview'>
          {previewUrl && <img src={previewUrl} alt='Preview' />}
          {!previewUrl && (
            <p className={isValid ? '' : 'image-upload__invalidImage'}>
              Please pick an image.
            </p>
          )}
        </div>
        <Button type={'button'} danger={!isValid} onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && (
        <div className={'image-upload__invalidImage'}>{props.errorText}</div>
      )}
    </div>
  );
};

export default ImageUpload;
