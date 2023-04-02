import { create } from "zustand";

interface CurrentTableState {
  tableData: any[];
  setTableData: (newData: any[]) => void;
}

export const useCurrentTableStore = create<CurrentTableState>((set) => ({
  tableData: [],
  setTableData: (tableData) => set(() => ({ tableData })),
}));
