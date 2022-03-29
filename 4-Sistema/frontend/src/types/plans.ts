export interface IPlan {
  _id?: string;
  name: string;
  active: boolean;
  modality: string;
  numberLessonsWeek: number;
  monthPrice: string;
  monthDuration: number;
}
