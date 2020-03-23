const triggerBtnPress = key => {
  const req = new XMLHttpRequest();
  req.open("GET", `/press/${key}`);
  req.send();
};

document
  .getElementsByClassName("apple-tv-case")[0]
  .addEventListener("click", ({ target }) => {
    const { key } = target.dataset;
    triggerBtnPress(key);
  });
