export interface IPlaceItemProps {
  id?: string;
  image?: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  title?: string;
  description?: string;
  creatorId?: string;
  onDelete: (id: string | undefined) => void;
  items?: [] | IPlace[];
}
export interface IUserList {
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
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
}

export interface IImageUploadProps {
  id: string;
  center: boolean;
  errorText?: string;
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

export interface IInputProps {
  initialValue?: string;
  initialValid?: boolean;
  onInput: (id: string, value: string, isValid: boolean) => void;
  validators: IValidator[];
  element: string;
  id: string;
  type?: string;
  placeholder?: string;
  rows?: number;
  label: string;
  errorText: string;
}

export interface IInputAction {
  type: 'CHANGE' | 'TOUCH';
  val: string;
  validators: IValidator[];
}

export interface IInput {
  initialValue?: string;
  initialValid?: boolean;
  id: string;
  onInput: (id: string, value: string, isValid: boolean) => void;
  element: string;
  type?: string;
  placeholder?: string;
  rows?: number;
  label: string;
  errorText: string;
  validators: [{ type: string }];
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
  children?: React.ReactNode;
  footerClass?: React.ReactNode;
  footer?: React.ReactNode;
}

export interface IModalProps extends IModalOverlayProps {
  show: boolean;
  onCancel: () => React.ReactNode | void;
}

export interface IErrorModalProps extends IModalOverlayProps {
  error: string | null;
  onClear: () => React.ReactNode | void;
}

export interface IGoogleMapProps {
  className?: string;
  style?: React.CSSProperties;
  center?: { lat: number; lng: number };
  zoom: number;
}

export interface ILoadingSpinnerProps {
  asOverlay?: boolean;
}

export interface IMainHeaderProps {
  children: React.ReactNode;
}

export interface ISideDrawerProps {
  onClick: () => void;
  children: React.ReactNode;
  show: boolean;
}

export interface IAuthContext {
  isLoggedIn: boolean;
  userId: null | string;
  token: null | string;
  login: (userId: string, token: string, expirationDate?: Date) => void;
  logout: () => void;
}

export interface IFormState {
  inputs: {
    email?: { value: string | null; isValid: boolean };
    password?: { value: string | null; isValid: boolean };
    address?: { value: string | null; isValid: boolean };
    name?: { value: string | null; isValid: boolean };
    image?: { value: string | null; isValid: boolean };
    title?: { value: string | null; isValid: boolean };
    description?: { value: string | null; isValid: boolean };
  };
  isValid: boolean;
}

export interface IResponseData {
  userId?: string;
  token?: string;
  message?: string;
  places?: IPlace[];
  users?: IUserList[];
  place?: IPlace;
}

export interface IPlace {
  items: IPlace[];
  key: string;
  id: string;
  image: string;
  title: string;
  description: string;
  address: string;
  creatorId: string;
  location: {
    lat: number;
    lng: number;
  };
  creator: string;
}
export interface IValidator {
  type: string;
  val?: number;
}
