import { pmt } from "financial";
import React, { useEffect, useMemo } from "react";
import { useCurrentTableStore } from "../store/currentTableStore";
import { CalculationData, PaymentPeriod } from "../store/calculationStore";
import { roundTo2Digits } from "../util/math.util";

interface AmortizationTableProps {
  tableData: CalculationData;
}

const calcPayment = (
  presentVal: number,
  apr: number,
  totalPeriods: number,
  addlAnnualFees: number[],
  isYears: boolean
): number => {
  const aprValToPct = apr / 100;
  const rate = aprValToPct / 12;
  const nper = isYears ? totalPeriods * 12 : totalPeriods;

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

export interface AmorTableRow {
  periodIdx: number;
  beginningBalance: number;
  paymentAmt: number;
  interest: number;
  principal: number;
  remainingBalance: number;
  monthlyTaxes: number;
  monthlyInsurance: number;
  monthlyHoa: number;
}

const createAmorTableRows = ({
  loanAmount,
  apr,
  paymentPeriodValue,
  paymentPeriodType,
  annualTaxes,
  annualInsurance,
  annualHoa,
}: CalculationData): AmorTableRow[] => {
  const runningAmorTableRows: AmorTableRow[] = [];

  const isYears = paymentPeriodType === PaymentPeriod.YEAR;

  const iterableArr = new Array(
    isYears ? paymentPeriodValue * 12 : paymentPeriodValue
  ).fill(0);

  const monthlyPayment = calcPayment(
    loanAmount,
    apr,
    paymentPeriodValue,
    [annualHoa, annualTaxes, annualInsurance],
    isYears
  );

  const monthlyAdditionalFees = {
    monthlyTaxes: annualTaxes / 12,
    monthlyInsurance: annualInsurance / 12,
    monthlyHoa: annualHoa / 12,
  };

  const additionalFeesPayment = [
    monthlyAdditionalFees.monthlyHoa,
    monthlyAdditionalFees.monthlyInsurance,
    monthlyAdditionalFees.monthlyTaxes,
  ].reduce((prev, curr) => prev + curr);

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
        paymentAmt: monthlyPayment + additionalFeesPayment,
        interest: interestPaid,
        principal: principalPaid,
        remainingBalance: loanAmount - principalPaid,
        ...monthlyAdditionalFees,
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
        paymentAmt: monthlyPayment + additionalFeesPayment,
        interest: interestPaid,
        principal: principalPaid,
        remainingBalance: lastBal - principalPaid,
        ...monthlyAdditionalFees,
      };
      runningAmorTableRows.push(computedAmorTableRow);
    }
  });

  return runningAmorTableRows;
};

const AmortizationTable: React.FC<AmortizationTableProps> = ({ tableData }) => {
  const { setTableData } = useCurrentTableStore();
  const tableRows = useMemo(() => createAmorTableRows(tableData), [tableData]);

  useEffect(() => {
    if (tableRows && tableRows.length > 0) {
      setTableData(tableRows);
    }
  }, [tableRows]);

  return (
    <div className="1 overflow-x-auto">
      <table className="table-zebra table-compact table w-full">
        <thead>
          <tr>
            <th>Month</th>
            <th>Beginning Balance</th>
            <th>Payment</th>
            <th>Interest</th>
            <th>Principal</th>
            {tableRows[0].monthlyHoa > 0 && <th>HOA Fees</th>}
            {tableRows[0].monthlyTaxes > 0 && <th>Taxes</th>}
            {tableRows[0].monthlyInsurance > 0 && <th>Home Insurance</th>}
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
              monthlyHoa,
              monthlyInsurance,
              monthlyTaxes,
            }) => (
              <tr key={`row__month__${periodIdx}`}>
                <td>{periodIdx}</td>
                <td>${roundTo2Digits(beginningBalance)}</td>
                <td>${roundTo2Digits(paymentAmt)}</td>
                <td>${roundTo2Digits(interest)}</td>
                <td>${roundTo2Digits(principal)}</td>
                {monthlyHoa > 0 && <td>${roundTo2Digits(monthlyHoa)}</td>}
                {monthlyTaxes > 0 && <td>${roundTo2Digits(monthlyTaxes)}</td>}
                {monthlyInsurance > 0 && (
                  <td>${roundTo2Digits(monthlyInsurance)}</td>
                )}
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
            {tableRows[0].monthlyHoa > 0 && <th>HOA Fees</th>}
            {tableRows[0].monthlyTaxes > 0 && <th>Taxes</th>}
            {tableRows[0].monthlyInsurance > 0 && <th>Home Insurance</th>}
            <th>Resulting Balance</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default AmortizationTable;
