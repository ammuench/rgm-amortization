import { ipcMain, BrowserWindow, dialog, app } from "electron";
import * as jetpack from "fs-jetpack";
import { AsyncParser } from "@json2csv/node";

import { AmorTableRow } from "../components/AmortizationTable";
import CHANNELS from "../shared/channels";
import { roundTo2Digits } from "../util/math.util";

ipcMain.handle(
  CHANNELS.EXPORT_CSV,
  async (event, tableData: AmorTableRow[]) => {
    const currWindow = BrowserWindow.getFocusedWindow();
    if (currWindow) {
      const filePath = dialog.showSaveDialogSync(currWindow, {
        title: "Save Exported Sheet",
        defaultPath: app.getPath("home"),
        filters: [
          {
            name: "*.CSV",
            extensions: ["csv"],
          },
        ],
        properties: ["showOverwriteConfirmation"],
      });
      if (filePath) {
        try {
          const preppedTableData = tableData.map((tdRow) => {
            const formattedTableRow = {
              Month: tdRow.periodIdx,
              "Starting Balance": roundTo2Digits(tdRow.beginningBalance),
              "Monthly Payment": roundTo2Digits(tdRow.paymentAmt),
              Interest: roundTo2Digits(tdRow.interest),
              Principal: roundTo2Digits(tdRow.principal),
              "Monthly Insurance": tdRow.monthlyInsurance
                ? roundTo2Digits(tdRow.monthlyInsurance)
                : undefined,
              "Monthly Taxes": tdRow.monthlyTaxes
                ? roundTo2Digits(tdRow.monthlyTaxes)
                : undefined,
              "Monthly HOA": tdRow.monthlyHoa
                ? roundTo2Digits(tdRow.monthlyHoa)
                : undefined,
              "Remaining Balance": roundTo2Digits(tdRow.remainingBalance),
            };

            if (!formattedTableRow["Monthly HOA"]) {
              delete formattedTableRow["Monthly HOA"];
            }
            if (!formattedTableRow["Monthly Taxes"]) {
              delete formattedTableRow["Monthly Taxes"];
            }
            if (!formattedTableRow["Monthly Insurance"]) {
              delete formattedTableRow["Monthly Insurance"];
            }

            return formattedTableRow;
          });
          const csvParse = new AsyncParser({}, {}, {});
          const csv = await csvParse.parse(preppedTableData).promise();
          await jetpack.writeAsync(filePath, csv);
          return "FILE_WRITTEN";
        } catch (e) {
          return "ERROR";
        }
      } else {
        return null;
      }
    }
  }
);
