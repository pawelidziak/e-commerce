export interface IBook {
  key: string;
  title: string;
  desc: string;
  author: string;
  isbn: string;
  price: number;
  quantity: number;
}

export interface IAddBook {
  title: string;
}
