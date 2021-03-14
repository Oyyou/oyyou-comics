export const useRemoveDupes = (values) => {
    let s = new Set(values);
    let it = s.values();
    let final = Array.from(it);
  
    return final;
}

export const useGroupBy = (items, keyCondition) => {

    // Example use
    /*
    const items = [{
        title: "Item 1",
        key: "A",
      },{
        title: "Item 2",
        key: "A",
      },{
        title: "Item 3",
        key: "B",
      },{
        title: "Item 4",
        key: "B",
      },{
        title: "Item 5",
        key: "A",
      },{
        title: "Item 6",
        key: "B",
    }];
    const itemsGroupedByKey = groupBy(items, (e) => e.key);
    */
  
    let dictionary = [] as any;
  
    items.forEach(item => {
      const key = keyCondition(item);
  
      if (!dictionary.some(kvp => kvp.key === key)) {
        dictionary = [...dictionary, { key, value: [] }];
      }
  
      dictionary.forEach(kvp => {
        if (kvp.key === key) {
          kvp.value = [...kvp.value, item];
        }
      });
    });
  
    return dictionary;
  }