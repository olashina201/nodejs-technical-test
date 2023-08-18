import { App } from "./config/app.config";
import DroneRoute from "./routes/drone.route";
import IndexRoute from "./routes/index.route";

const { app } = new App([new IndexRoute(), new DroneRoute()]);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`======= ENV: ${process.env.NODE_ENV} =======`);
  console.log(`🚀 App listening on the port ${PORT}`);
  console.log(`==================================================`);
});

process.on("unhandledRejection", (err: Error) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
