import { create } from "zustand";

export type PaymentPeriod = "month" | "year";

type CalculationData = {
  loanAmount: number;
  apr: number;
  paymentPeriodValue: number;
  paymentPeriodType: PaymentPeriod;
  annualTaxes: number;
  annualInsurance: number;
  annualHoa: number;
};

export type CalcDataKeys = keyof CalculationData;

export interface CalculationState extends CalculationData {
  setCalcStateProp: (
    value: number,
    // TODO: Figure out this typing...
    key: Omit<CalculationData, keyof "paymentPeriodType">
  ) => void;
  setPaymentPeriod: (value: PaymentPeriod) => void;
}

export const useCalculationStore = create<CalculationState>((set) => ({
  loanAmount: 0,
  apr: 0,
  paymentPeriodType: "month",
  paymentPeriodValue: 0,
  annualTaxes: 0,
  annualInsurance: 0,
  annualHoa: 0,
  setCalcStateProp: (value, key) => set((state) => ({ [key]: value })),
  setPaymentPeriod: (value) => set((state) => ({ paymentPeriodType: value })),
}));
