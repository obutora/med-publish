export default interface MedicineModel {
  id?: number;
  category: string;
  name: string;
  general_name: string;
  unit: string;
  isGeneric: boolean;
  unit_price: number;
  amount: number;
}
