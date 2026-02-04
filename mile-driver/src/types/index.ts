export interface Driver {
  id: string;
  name: string;
  vehicle: {
    model: string;
    plate: string;
  };
}
