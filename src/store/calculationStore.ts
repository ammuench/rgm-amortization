import { create } from "zustand";

export enum PaymentPeriod {
  MONTH = "MONTH",
  YEAR = "YEAR",
}

export type CalculationData = {
  loanAmount: number;
  apr: number;
  paymentPeriodValue: number;
  paymentPeriodType: PaymentPeriod;
  annualTaxes: number;
  annualInsurance: number;
  annualHoa: number;
};

const DEFAULT_CALCULATION_STATE: CalculationData = {
  loanAmount: 0,
  apr: 0,
  paymentPeriodType: PaymentPeriod.MONTH,
  paymentPeriodValue: 0,
  annualTaxes: 0,
  annualInsurance: 0,
  annualHoa: 0,
};

export interface CalculationState extends CalculationData {
  setCalcStateProp: <K extends keyof CalculationData>(
    value: CalculationData[K],
    key: K
  ) => void;
  loadCalcData: (loadData: CalculationData) => void;
  resetState: () => void;
  getCalcDataSnapshot: () => CalculationData;
}

export const useCalculationStore = create<CalculationState>((set, get) => ({
  ...DEFAULT_CALCULATION_STATE,
  setCalcStateProp: (value, key) => set(() => ({ [key]: value })),
  loadCalcData: (value: CalculationData) =>
    set((state) => ({
      ...state,
      ...value,
    })),
  getCalcDataSnapshot: () => get(),
  resetState: () =>
    set((state) => ({
      ...state,
      ...DEFAULT_CALCULATION_STATE,
    })),
}));
