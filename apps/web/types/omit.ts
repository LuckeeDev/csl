export type OmitDates<T> = Omit<T, 'updated_at' | 'created_at'>;
