interface IUserList {
  id: string;
  image: string;
  name: string;
  places: [];
}

export interface IUserListProps {
  items: IUserList[];
}

export interface IUserItemProps {
  id: string;
  name: string;
  image: string;
  placeCount: number;
  count?: number;
}

export interface IButtonProps {
  href?: string;
  to?: string;
  exact?: boolean;
  size?: string;
  inverse?: boolean;
  danger?: boolean;
  children?: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
}

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

export interface IInputState {
  value: string;
  isValid: boolean;
  isTouched: boolean;
}

export interface IInput {
  initialValue: string;
  initialValid: boolean;
  id: string;
  onInput: (id: string, value: string, isValid: boolean) => void;
  validators: [];
  element: string;
  type: string;
  placeholder: string;
  rows: number;
  label: string;
  errorText: string;
}

export interface IAvatarProps {
  className?: string;
  style?: React.CSSProperties;
  image: string;
  alt: string;
  width?: string;
}

export interface IBackdropProps {
  onClick?: () => React.ReactNode | void;
}

export interface ICardProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export interface IModalOverlayProps {
  className?: string;
  style?: React.CSSProperties;
  headerClass?: string;
  header?: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  contentClass?: string;
  children: React.ReactNode;
  footerClass?: React.ReactNode;
  footer: React.ReactNode;
}

export interface IModalProps extends IModalOverlayProps {
  show: boolean;
  onCancel: () => React.ReactNode;
}

export interface IErrorModalProps extends IModalOverlayProps {
  error: string;
  onClear: () => React.ReactNode;
}

export interface IGoogleMapProps {
  className?: string;
  style?: React.CSSProperties;
  center: { lat: number; lng: number };
  zoom: number;
}

export interface ILoadingSpinnerProps {
  asOverlay?: boolean;
}
