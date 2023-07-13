import { App } from "./App";
import { renderToString } from "react-dom/server";

export async function render() {
  return renderToString(<App />);
}
