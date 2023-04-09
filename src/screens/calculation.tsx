import React, { useState } from "react";
import {
  CalculationData,
  PaymentPeriod,
  useCalculationStore,
} from "../store/calculationStore";
import Navigation from "../components/Navigation";
import AmortizationTable from "../components/AmortizationTable";
import { generateToast } from "../components/Toast";

const CalculationScreen: React.FC = () => {
  const {
    loanAmount,
    apr,
    paymentPeriodValue,
    paymentPeriodType,
    annualTaxes,
    annualInsurance,
    annualHoa,
    setCalcStateProp,
    getCalcDataSnapshot,
  } = useCalculationStore((state) => state);

  const inputChangeHandler = (
    targetValue: string,
    key: keyof CalculationData
  ) => {
    const val = targetValue ? parseFloat(targetValue) : 0;
    setCalcStateProp(val, key);
  };

  const [tableData, setTableData] = useState<CalculationData | null>(null);

  const updateTableData = () => {
    const dataSnapshot = getCalcDataSnapshot();
    if (dataSnapshot.loanAmount === 0) {
      generateToast("Loan Amount Cannot be Zero", "error");
      return;
    }
    if (dataSnapshot.apr === 0) {
      generateToast("APR Cannot be Zero", "error");
      return;
    }
    if (dataSnapshot.paymentPeriodValue === 0) {
      generateToast("Payment Period Cannot be Zero", "error");
      return;
    }

    setTableData(dataSnapshot);
    generateToast("Amortization Table Updated", "success");
  };

  return (
    <div className="flex h-screen w-screen flex-col bg-gray-300">
      <Navigation />
      <div className="grid h-full w-full grid-cols-1 grid-rows-[auto_1fr] overflow-y-hidden  p-4">
        <div className="border-b border-gray-400 pb-4">
          <div className="grid max-h-72 grid-cols-3 grid-rows-3 gap-4 ">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-bold">Loan Amount</span>
              </label>
              <label className="input-group">
                <span>$</span>
                <input
                  onChange={(e) => {
                    inputChangeHandler(e.target.value, "loanAmount");
                  }}
                  value={loanAmount}
                  min={0}
                  type="number"
                  step="1.00"
                  placeholder="100000.00"
                  className="input-bordered input w-full max-w-xs"
                />
              </label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-bold">
                  Annual Percent Rate (APR)
                </span>
              </label>
              <label className="input-group">
                <input
                  onChange={(e) => {
                    inputChangeHandler(e.target.value, "apr");
                  }}
                  value={apr}
                  min={0}
                  type="number"
                  step="0.01"
                  placeholder="0.01"
                  className="input-bordered input w-full max-w-xs"
                />
                <span>%</span>
              </label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-bold">Payment Period</span>
              </label>

              <label className="input-group">
                <input
                  onChange={(e) => {
                    //replace non-digits with blank
                    const value = e.target.value.replace(/[^\d]/, "");

                    if (parseInt(value) !== 0) {
                      inputChangeHandler(value, "paymentPeriodValue");
                    }
                  }}
                  value={paymentPeriodValue}
                  min={1}
                  step={1}
                  type="number"
                  placeholder="96"
                  className="input-bordered input w-full max-w-xs"
                />
                <select
                  onChange={(e) => {
                    setCalcStateProp(
                      e.target.value as PaymentPeriod,
                      "paymentPeriodType"
                    );
                  }}
                  value={paymentPeriodType}
                  className="b select-bordered select border-none"
                  style={{
                    backgroundColor:
                      "hsl(var(--b3, var(--b2)) / var(--tw-bg-opacity))",
                  }}
                >
                  <option value={PaymentPeriod.MONTH}>Months</option>
                  <option value={PaymentPeriod.YEAR}>Years</option>
                </select>
              </label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-bold">
                  Annual Taxes Amount
                </span>
              </label>
              <label className="input-group">
                <span>$</span>
                <input
                  onChange={(e) => {
                    inputChangeHandler(e.target.value, "annualTaxes");
                  }}
                  value={annualTaxes}
                  min={0}
                  type="number"
                  step="1.00"
                  placeholder="5000.00"
                  className="input-bordered input w-full max-w-xs"
                />
              </label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-bold">
                  Annual Insurance Amount
                </span>
              </label>
              <label className="input-group">
                <span>$</span>
                <input
                  onChange={(e) => {
                    inputChangeHandler(e.target.value, "annualInsurance");
                  }}
                  value={annualInsurance}
                  min={0}
                  type="number"
                  step="1.00"
                  placeholder="800"
                  className="input-bordered input w-full max-w-xs"
                />
              </label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-bold">Annual HOA Fees</span>
              </label>
              <label className="input-group">
                <span>$</span>
                <input
                  onChange={(e) => {
                    inputChangeHandler(e.target.value, "annualHoa");
                  }}
                  value={annualHoa}
                  min={0}
                  type="number"
                  step="1.00"
                  placeholder="1500.00"
                  className="input-bordered input w-full max-w-xs"
                />
              </label>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="btn-primary btn-active btn"
              onClick={updateTableData}
            >
              Update Amortization Table
            </button>
          </div>
        </div>
        <div className="overflow-y-auto pt-4">
          {tableData ? (
            <AmortizationTable tableData={tableData} />
          ) : (
            <div className="flex h-full flex-col items-center justify-center">
              <h2 className="text-2xl font-bold">No Data Generated Yet</h2>
              <p>
                Add data and press 'Update Amortization Table' to generate an
                amortization schedule
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculationScreen;
