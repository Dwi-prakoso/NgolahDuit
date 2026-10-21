
const { app, BrowserWindow, utilityProcess, dialog } = require("electron");
const path = require("node:path");
const fs = require("node:fs");
const net = require("node:net");

const PORT = 8080;
const URL = `http://127.0.0.1:${PORT}`;

let nitroProcess = null;
let nitroExited = false;

// Pastikan port belum digunakan aplikasi lain.
function checkPort() {
  return new Promise((resolve, reject) => {
    const tester = net.createServer();

    tester.once("error", () => {
      reject(new Error(`Port ${PORT} sedang digunakan. Matikan server lama terlebih dahulu.`));
    });

    tester.listen(PORT, "127.0.0.1", () => {
      tester.close(resolve);
    });
  });
}

// Jalankan server Nitro secara otomatis.
function startNitro() {
  const outputDir = app.isPackaged
    ? path.join(process.resourcesPath, "nitro")
    : path.join(__dirname, "..", ".output");

  const serverFile = path.join(outputDir, "server", "index.mjs");

  if (!fs.existsSync(serverFile)) {
    throw new Error("Build Nitro tidak ditemukan. Jalankan build terlebih dahulu.");
  }

  nitroExited = false;

  nitroProcess = utilityProcess.fork(serverFile, [], {
    cwd: app.isPackaged
      ? process.resourcesPath
      : path.join(__dirname, ".."),
    env: {
      ...process.env,
      PORT: String(PORT),
      HOST: "127.0.0.1",
      NODE_ENV: "production",
    },
    stdio: "pipe",
  });

  nitroProcess.stdout?.on("data", (data) => {
    console.log("[Nitro]", data.toString());
  });

  nitroProcess.stderr?.on("data", (data) => {
    console.error("[Nitro Error]", data.toString());
  });

  nitroProcess.on("exit", (code) => {
    nitroExited = true;
    console.log("Nitro berhenti:", code);
  });
}

// Tunggu server siap sebelum membuka jendela.
async function waitForNitro() {
  for (let i = 0; i < 80; i++) {
    if (nitroExited) {
      throw new Error("Server Nitro berhenti sebelum siap.");
    }

    try {
      const response = await fetch(URL, {
        signal: AbortSignal.timeout(1000),
      });

      if (response.ok) return;
    } catch {
      // Server mungkin masih memulai.
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error("Server Nitro tidak merespons.");
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1000,
    minHeight: 650,
    title: "Personal Money Management",
    backgroundColor: "#0f172a",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  });

  win.loadURL(URL);
}

// Startup aplikasi.
app.whenReady().then(async () => {
  app.setAppUserModelId("com.personal.moneytracker");
  try {
    await checkPort();
    startNitro();
    await waitForNitro();

    createWindow();
  } catch (error) {
    dialog.showErrorBox("Money Tracker Error", error.message);
    app.quit();
  }

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0 && !nitroExited) {
      createWindow();
    }
  });
});

// Matikan server saat aplikasi ditutup.
app.on("before-quit", () => {
  if (nitroProcess) {
    nitroProcess.kill();
    nitroProcess = null;
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
