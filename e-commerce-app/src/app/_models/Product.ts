export class Product {
  private _id: string;
  private _name: string;
  private _desc: string;
  private _price: number;
  private _quantity: number;

  constructor(id: string, name: string, desc: string, price: number, quantity: number) {
    this._id = id;
    this._name = name;
    this._desc = desc;
    this._price = price;
    this._quantity = quantity;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get desc(): string {
    return this._desc;
  }

  set desc(value: string) {
    this._desc = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }
}
