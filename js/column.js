function showHideColumn(columnName) {
  const heading = document.getElementsByClassName(
    `heading__item ${columnName}`,
  );
  const column = document.getElementsByClassName(`td ${columnName}`);

  console.log(heading);

  heading[0].classList.toggle('hide');
  [...column].forEach((cell) => {
    cell.classList.toggle('hide');
  });
}
