import { ipcMain, BrowserWindow, dialog, app } from "electron";
import * as jetpack from "fs-jetpack";

import CHANNELS from "../shared/channels";

ipcMain.handle(CHANNELS.LOAD_FILE, async () => {
  const currWindow = BrowserWindow.getFocusedWindow();
  if (currWindow) {
    const filePath = dialog.showOpenDialogSync(currWindow, {
      title: "Load Amortization Data",
      defaultPath: app.getPath("home"),
      filters: [
        {
          name: "Amortization File",
          extensions: ["AMOR"],
        },
      ],
      properties: ["openFile"],
    });
    if (filePath) {
      try {
        let filePathToUse = filePath[0];
        const parsedData = await jetpack.readAsync(filePathToUse, "json");
        console.log(parsedData);
        return parsedData;
      } catch (e) {
        return "ERROR";
      }
    } else {
      return null;
    }
  }
});
