function formBuilder(data) {
  let vitalInfo = {};
  let performance = [];
  let comments = [];
  const names = data.getAll('comment.person');
  const values =  data.getAll('comment.comments');
  names.forEach((name, i) => {
    const obj = {};
    obj.person = name;
    obj.comments = values[i];
    comments.push(obj);
  });
  const namesP = data.getAll('performance.title');
  const valuesP =  data.getAll('performance.performance');
  namesP.forEach((nameP, i) => {
    const obj = {};
    obj.title = nameP;
    obj.performance = valuesP[i];
    performance.push(obj);
  });
  data.forEach((value, key) => {
    if (key.includes('vitalInfo')) {
      vitalInfo[key.split('.').splice(1)] = value;
    }
    if(key.includes('image')){
      vitalInfo.image = value;
    }
  });

  const merged = Object.assign({}, {vitalInfo}, {comments}, {performance});
  return merged;
}

module.exports = formBuilder;
