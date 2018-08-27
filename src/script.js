const init = (function(createApp) {
  let [calc, calcStr, calcState, ui] = createApp();
  let { numbers, operators, clear, execute } = ui.elements;

  numbers.forEach(number => {
    number.addEventListener('click', e => {
      let prevListener = calcState.getState('listener');

      if (prevListener === 'execute') calc.clear();

      calcStr.add(e.target.value);

      calcState.setState({
        screen: calcStr.getCalcString(),
        activeFn: '',
      });

      calcState.setState({ listener: 'number' });
    });
  });
  operators.forEach(operator => {
    operator.addEventListener('click', e => {
      let prevListener = calcState.getState('listener');

      if (prevListener === 'operator' || prevListener === 'execute') {
        calcState.setState({
          activeFn: e.target.value,
          storedFn: e.target.value,
        });
      } else {
        calcState.setState({
          number: calcStr.getNumber(),
          storedFn: e.target.value,
          activeFn: e.target.value,
        });

        let total = calc.value();
        if (total) calcState.setState({ total });
        calcStr.reset();
      }
      calcState.setState({ listener: 'operator' });
    });
  });
  clear.addEventListener('click', e => {
    [calc, calcStr, calcState, ui] = createApp();
    calcState.setState({ activeFn: '' });
  });

  execute.addEventListener('click', () => {
    let number = calcStr.getNumber();
    let storedFn = calcState.getState('storedFn');

    calcState.setState({ number, storedFn });

    let total = calc.value();
    if (total) calcState.setState({ total });
    calcStr.reset();

    calcState.setState({ listener: 'execute' });
  });
})(appConnections);
