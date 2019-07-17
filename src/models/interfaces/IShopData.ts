import IItemData from "./IItemData";

export default interface ISHOP_DATA {
  id: number;
  title: string;
  routeName: string;
  items: IItemData[];
}
