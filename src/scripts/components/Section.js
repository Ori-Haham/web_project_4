export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._data = data;
    this._container = containerSelector;
    this._renderer = renderer;
  }

  renderItems(data) {
    data.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
