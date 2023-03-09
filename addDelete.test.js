const DataCollection = require('./__mocks__/addDelete.js');

const data = new DataCollection();

describe('Test of add and remove functions from To-Do List', () => {
  test('Add one new item to the list', () => {
    document.body.innerHTML = '<div>'
        + '  <ul id="list"><li></li></ul>'
        + '</div>';
    data.setLocalData('New To Do Item');
    const list = document.querySelectorAll('#list li');
    expect(list).toHaveLength(1);
  });

  test('Remove an item from the list', () => {
    const setItem = jest.spyOn(Storage.prototype, 'setItem');
    data.deleteItem();
    expect(setItem).toHaveBeenCalled();
  });
});