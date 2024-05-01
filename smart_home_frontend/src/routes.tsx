import { createBrowserRouter } from "react-router-dom";
import Overview from "./routes/Overview";
import Controls from "./routes/Controls";
import Settings from "./routes/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Overview />,
  },
  {
    path: "/controls",
    element: <Controls />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);

export default router
