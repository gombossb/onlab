import { createBrowserRouter } from "react-router-dom";
import Overview from "./routes/Overview";
import Settings from "./routes/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Overview />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);

export default router
