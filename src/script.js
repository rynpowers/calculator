const init = (function(app) {
  let {
    onClickNumber,
    onClickOperator,
    onClickExecute,
    onClickPlusMinus,
    onClickPercent,
    ui,
  } = app();

  const {
    numbers,
    operators,
    clear,
    execute,
    plusMinus,
    percent,
  } = ui.elements;

  clear.addEventListener('click', () => {
    ({
      onClickNumber,
      onClickOperator,
      onClickExecute,
      onClickPlusMinus,
      onClickPercent,
      ui,
    } = app());
  });

  numbers.forEach(number => number.addEventListener('click', onClickNumber));

  operators.forEach(operator =>
    operator.addEventListener('click', onClickOperator)
  );

  execute.addEventListener('click', onClickExecute);

  plusMinus.addEventListener('click', onClickPlusMinus);

  percent.addEventListener('click', onClickPercent);
})(appConnections);
