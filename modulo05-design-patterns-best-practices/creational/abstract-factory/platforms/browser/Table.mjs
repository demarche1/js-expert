import TableComponent from "../../shared/base/TableComponent.mjs";

export default class TableBrowserComponent extends TableComponent {
  render(data) {
    document.body.insertAdjacentHTML("afterBegin", this.prepareData(data));
  }

  prepareData(data) {
    const [firstItem] = data;
    const tHeaders = Object.keys(firstItem).map(
      (item) => `<th scope="col">${item}</th>`
    );

    const joinList = (list) => list.join(" ");

    const tBody = data
      .map((item) => Object.values(item))
      .map((item) => item.map((value) => `<td>${value}</td>`))
      .map((tds) => `<tr>${joinList(tds)}</tr>`);

    const template = `
		<table class="table">
			<thead>
				<tr>
					${joinList(tHeaders)}
				</tr>
			</thead>
			<tbody>
				${joinList(tBody)}
			</tbody>
		</table>
		`;

    return template;
  }
}
