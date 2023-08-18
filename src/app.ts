import cron from 'node-cron';
import { App } from "./config/app.config";
import IndexRoute from "./routes/index.route";
import { checkBatteryAndLog } from './cron/battery-level.cron';

const { app } = new App([new IndexRoute()]);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`======= ENV: ${process.env.NODE_ENV} =======`);
  console.log(`🚀 App listening on the port ${PORT}`);
  console.log(`==================================================`);

  // Schedule the battery check and log task to run every hour
  cron.schedule('* * * * *', () => {
    checkBatteryAndLog();
  });
});

process.on("unhandledRejection", (err: Error) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
