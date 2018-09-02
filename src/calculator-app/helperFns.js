const helpers = (function() {
  const auxiliaryFn = fn => {
    return (state, string, calculator) => {
      let prevListener = state.getState('listener');
      let num =
        prevListener === 'number'
          ? fn(string.getNumber())
          : fn(calculator.value());

      if (prevListener === 'number' || prevListener === 'execute') {
        string.setCalcString(num);
        state.setState({ screen: string.getCalcString() });
        if (prevListener !== 'number') {
          state.setState({
            activeFn: '',
            storedFn: '',
            storedNum: null,
            listener: 'number',
          });
          calculator.clear();
        }
      }
    };
  };

  const plusMinusHelper = auxiliaryFn(n => n * -1);
  const percentHelper = auxiliaryFn(n => n / 100);

  const numberHelper = (state, string, calculator, e) => {
    let prevListener = state.getState('listener');
    if (prevListener !== 'number') string.reset();
    if (prevListener === 'execute') calculator.clear();

    string.add(e.target.value);
    let screen = string.getCalcString();

    state.setState({ screen, listener: 'number', activeFn: '' });
  };

  const operatorHelper = (state, string, calculator, e) => {
    let prevListener = state.getState('listener');
    let screen = state.getState('screen');
    let listener = 'operator';
    let storedFn = e.target.value;
    let activeFn = e.target.value;

    if (prevListener === '') return;
    else if (prevListener === 'number') {
      state.setState({ storedNum: string.getNumber() });
      string.setCalcString(calculator.value());
      screen = string.getCalcString();
    }

    state.setState({ listener, activeFn, storedFn, screen });
  };

  const executeHelper = (state, string, calculator) => {
    let prevListener = state.getState('listener');
    let storedNum = state.getState('storedNum');
    let storedFn = state.getState('storedFn');

    if (prevListener === 'number' && storedNum && storedFn) {
      state.setState({ storedNum: string.getNumber() });
      string.setCalcString(calculator.value());
      state.setState({
        listener: 'execute',
        screen: string.getCalcString(),
      });
    }
  };

  return {
    plusMinusHelper,
    percentHelper,
    numberHelper,
    operatorHelper,
    executeHelper,
  };
})();
