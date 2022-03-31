enum WeekDays {
  monday = 'MONDAY',
  tuesday = 'TUESDAY',
  wednesday = 'WEDNESDAY',
  thursday = 'THURSDAY',
  friday = 'FRIDAY',
}

export interface IClassGroup {
  weekDays: string[];
  schedule: string;
  customers: string[];
  maxCapacity: string;
  minAge?: string;
  maxAge?: string;
  _id?: string;
  modalityId: string;
  active: boolean;
}
