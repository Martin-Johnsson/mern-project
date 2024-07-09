export interface IImageUploadProps {
  id: string;
  center: boolean;
  errorText: string;
  onInput: (
    id: string,
    pickedFile: File | undefined,
    fileIsValid: boolean
  ) => void;
}
