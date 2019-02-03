function performanceBuilder(data) {
  let performance = {};
  data.forEach((value, key) => {
    if (key.includes('title')) {
      performance[key] = value;
    } else if (key.includes('performance')) {
      performance[key] = value;
    }
  });
  return performance;
}

export default performanceBuilder;
