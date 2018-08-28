const init = (function(app) {
  let { calc, calcState, calcStr, ui } = app();

  const { numbers, operators, clear, execute, toggleNegative } = ui.elements;

  const updateAndCalculate = num => {
    calcState.setState({ num });
    let total = calc.value();
    if (total) calcState.setState({ total });
    calcStr.reset();
  };

  numbers.forEach(number => {
    number.addEventListener('click', e => {
      calcStr.add(e.target.value);

      let [prevListener, screen, activeFn, listener] = [
        calcState.getState('listener'),
        calcStr.getCalcString(),
        '',
        'number',
      ];

      if (prevListener === 'execute') calc.clear();
      calcState.setState({ screen, activeFn, listener });
    });
  });

  operators.forEach(operator => {
    operator.addEventListener('click', e => {
      console.log(calcStr);
      let [prevListener, activeFn, storedFn, num, listener] = [
        calcState.getState('listener'),
        e.target.value,
        e.target.value,
        calcStr.getNumber(),
        'operator',
      ];

      if (prevListener === 'number') updateAndCalculate(num);
      calcState.setState({ activeFn, storedFn, listener });
    });
  });

  clear.addEventListener('click', () => {
    ({ calc, calcState, calcStr, ui } = app());
  });

  execute.addEventListener('click', () => {
    let [num, prevListener, listener] = [
      calcStr.getNumber(),
      calcState.getState('listener'),
      'execute',
    ];

    if (prevListener !== 'number') num = calcState.getState('num');
    updateAndCalculate(num);
    calcState.setState({ listener });
  });

  toggleNegative.addEventListener('click', () => {
    let prevListener = calcState.getState('listener');

    if (prevListener === 'number') {
      calcStr.toggleNegative();
      let screen = calcStr.getCalcString();
      calcState.setState({ screen });
    }
  });
})(appConnections);
