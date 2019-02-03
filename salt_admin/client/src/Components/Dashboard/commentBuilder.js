function commentBuilder(data) {
  let comment = {};
  data.forEach((value, key) => {
    if (key.includes('person')){
      comment[key] = value;
    } else if (key.includes('comments')) {
      comment[key] = value;
    }
  });
  return comment;
}

export default commentBuilder;
