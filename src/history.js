import { createBrowserHistory } from "history";
import {baseName} from "./config";

export default createBrowserHistory({ basename: baseName });