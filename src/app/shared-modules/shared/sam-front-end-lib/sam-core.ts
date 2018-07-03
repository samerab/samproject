
export function getObjFromArray(array: Array<object>, key: string,useDefault: boolean = false) {
  console.log('array ', array);  
  if(array.length == 0){
      return {};
    }
    let index = array.findIndex((item) => {
      console.log('item[key] ', item[0]);
      return item[key] == key;
    });
    if (index > -1) {
      return array[index];
    }
    else {
      if (useDefault) {
        return array[0];
      }
      else {
        return {};
      }
      
    }
  }