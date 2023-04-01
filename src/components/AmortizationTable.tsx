import { pmt } from "financial";
import React, { useMemo } from "react";
import { CalculationData, PaymentPeriod } from "../store/calculationStore";

interface AmortizationTableProps {
  tableData: CalculationData;
}

const calcPayment = (
  presentVal: number,
  apr: number,
  totalPeriods: number,
  isYears: boolean
): number => {
  const aprValToPct = apr / 100;
  const rate = isYears ? aprValToPct : aprValToPct / 12;
  const nper = isYears ? totalPeriods * 12 : totalPeriods;

  // idk why I need to invert this but I do
  return -pmt(rate, nper, presentVal);
};

const calculatePrincipalInterest = (
  month: number,
  loanAmount: number,
  interestRate: number,
  loanTerm: number,
  monthlyPayment: number,
  isYears: boolean
) => {
  const monthlyInterestRate = interestRate / 12;
  const totalMonths = isYears ? loanTerm * 12 : loanTerm;
  const remainingBalance =
    (loanAmount *
      (Math.pow(1 + monthlyInterestRate, totalMonths) -
        Math.pow(1 + monthlyInterestRate, month - 1))) /
    (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
  const interestPayment = remainingBalance * monthlyInterestRate;
  const principalPayment = monthlyPayment - interestPayment;
  const interestPaid = remainingBalance * monthlyInterestRate;
  const principalPaid = principalPayment;
  return { principalPaid, interestPaid };
};

const roundTo2Digits = (inputFloat: number): string =>
  (Math.round(inputFloat * 100) / 100).toFixed(2);

interface AmorTableRow {
  periodIdx: number;
  beginningBalance: number;
  paymentAmt: number;
  interest: number;
  principal: number;
  remainingBalance: number;
}

const createAmorTableRows = ({
  loanAmount,
  apr,
  paymentPeriodValue,
  paymentPeriodType,
}: CalculationData): AmorTableRow[] => {
  const runningAmorTableRows: AmorTableRow[] = [];

  const isYears = paymentPeriodType === PaymentPeriod.YEAR;

  const iterableArr = new Array(paymentPeriodValue).fill(0);

  const monthlyPayment = calcPayment(
    loanAmount,
    apr,
    paymentPeriodValue,
    isYears
  );

  iterableArr.forEach((num, idx) => {
    if (idx === 0) {
      const { principalPaid, interestPaid } = calculatePrincipalInterest(
        idx + 1,
        loanAmount,
        apr / 100,
        paymentPeriodValue,
        monthlyPayment,
        isYears
      );
      const computedAmorTableRow: AmorTableRow = {
        periodIdx: idx + 1,
        beginningBalance: loanAmount,
        paymentAmt: monthlyPayment,
        interest: interestPaid,
        principal: principalPaid,
        remainingBalance: loanAmount - principalPaid,
      };
      runningAmorTableRows.push(computedAmorTableRow);
    } else {
      const { principalPaid, interestPaid } = calculatePrincipalInterest(
        idx + 1,
        loanAmount,
        apr / 100,
        paymentPeriodValue,
        monthlyPayment,
        isYears
      );
      const lastBal = runningAmorTableRows[idx - 1].remainingBalance;
      const computedAmorTableRow: AmorTableRow = {
        periodIdx: idx + 1,
        beginningBalance: lastBal,
        paymentAmt: monthlyPayment,
        interest: interestPaid,
        principal: principalPaid,
        remainingBalance: lastBal - principalPaid,
      };
      runningAmorTableRows.push(computedAmorTableRow);
    }
  });

  return runningAmorTableRows;
};

const AmortizationTable: React.FC<AmortizationTableProps> = ({ tableData }) => {
  const tableRows = useMemo(() => createAmorTableRows(tableData), [tableData]);

  return (
    <div className="overflow-x-auto">
      <table className="table-zebra table-compact table w-full">
        <thead>
          <tr>
            <th>Month</th>
            <th>Beginning Balance</th>
            <th>Payment</th>
            <th>Interest</th>
            <th>Principal</th>
            <th>Resulting Balance</th>
          </tr>
        </thead>
        <tbody>
          {tableRows.map(
            ({
              periodIdx,
              beginningBalance,
              paymentAmt,
              interest,
              principal,
              remainingBalance,
            }) => (
              <tr>
                <td>{periodIdx}</td>
                <td>${roundTo2Digits(beginningBalance)}</td>
                <td>${roundTo2Digits(paymentAmt)}</td>
                <td>${roundTo2Digits(interest)}</td>
                <td>${roundTo2Digits(principal)}</td>
                <td>${roundTo2Digits(remainingBalance)}</td>
              </tr>
            )
          )}
        </tbody>
        <tfoot>
          <tr>
            <th>Month</th>
            <th>Beginning Balance</th>
            <th>Payment</th>
            <th>Interest</th>
            <th>Principal</th>
            <th>Resulting Balance</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default AmortizationTable;
