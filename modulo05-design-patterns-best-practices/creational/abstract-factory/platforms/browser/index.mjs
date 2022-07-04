import ViewFactory from "../../shared/base/ViewFactory.mjs";
import TableBrowserComponent from "./Table.mjs";

export default class BrowserFactory extends ViewFactory {
  createTable() {
    return new TableBrowserComponent();
  }
}
