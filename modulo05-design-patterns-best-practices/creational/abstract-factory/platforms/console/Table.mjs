import TableComponent from "../../shared/base/TableComponent.mjs";
import chalkTable from "chalk-table";

export default class TableConsoleComponent extends TableComponent {
  render(data) {
    const colums = this.prepareData(data);

    const options = {
      lefPad: 2,
      colums,
    };

    const table = chalkTable(options, data);
    console.log(table);
  }

  prepareData(data) {
    const [firstItem] = data;

    return Object.keys(firstItem);
  }
}
