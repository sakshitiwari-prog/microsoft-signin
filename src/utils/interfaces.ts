import {FormikErrors} from 'formik';

export interface InputField {
  value: string;
  handleChange: Function;
  label: string;
  name: string;
  errors:
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | undefined;
  isNumField?: boolean;
}

export interface InputFieldInterface {
  width?: number;
  rightIcon?: string;
  value: string | number;
  handleChange: Function;
  label: string;
  name: string;
  errors:
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | undefined;
  isNumField?: boolean;
  height?: number;
  isNote?: boolean;
  // ref?: React.RefObject<InputFieldRef>;
}

export interface Item {
  id: number;
  expiry: string;
  name: string;
  notes: string;
  quantity: string;
  subCategoryId: number;
  subCategoryName: string;
}

export interface profileUpdateInterface {
  onCancel: Function;
  isShow: boolean;
}
