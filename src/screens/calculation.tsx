import React from "react";
import { useCalculationStore } from "../store/calculationStore";
import Navigation from "../components/Navigation";

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
  } = useCalculationStore((state) => state);

  return (
    <div className="flex h-screen w-screen flex-col bg-gray-300">
      <Navigation />
      <div className="grid h-full w-full grid-cols-1 grid-rows-2 overflow-y-auto  p-4">
        <div className="grid max-h-72 grid-cols-3 grid-rows-3 gap-4 border-b border-gray-400 pb-4">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-bold">Loan Amount</span>
            </label>
            <label className="input-group">
              <span>$</span>
              <input
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
                min={1}
                type="number"
                placeholder="96"
                className="input-bordered input w-full max-w-xs"
              />
              <select
                className="b select-bordered select border-none"
                style={{
                  backgroundColor:
                    "hsl(var(--b3, var(--b2)) / var(--tw-bg-opacity))",
                }}
              >
                <option>Months</option>
                <option>Years</option>
              </select>
            </label>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-bold">Annual Taxes Amount</span>
            </label>
            <label className="input-group">
              <span>$</span>
              <input
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
                min={0}
                type="number"
                step="1.00"
                placeholder="1500.00"
                className="input-bordered input w-full max-w-xs"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculationScreen;
