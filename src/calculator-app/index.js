const appConnections = (function(
  { Calculator },
  { CalcString },
  { CalcState },
  { UI }
) {
  const app = function() {
    let calc = new Calculator();
    let calcStr = new CalcString();
    let calcState = new CalcState();
    let ui = new UI();

    let setScreen = ui.setScreen.bind(ui, calcStr.numToString);
    let setFn = calc.setFn.bind(calc);
    let pushNum = calc.push.bind(calc);
    let setActiveFn = ui.setActiveFn.bind(ui);

    calcState.createState({
      screen: '',
      storedNum: null,
      storedFn: '',
      activeFn: '',
      listener: '',
    });

    calcState.connect({
      screen: [setScreen],
      storedNum: [pushNum],
      storedFn: [setFn],
      activeFn: [setActiveFn],
    });

    calcState.setState({ screen: '0', activeFn: '' });

    return {
      calcState,
      calc,
      calcStr,
      ui,
    };
  };

  return app;
})(calculator, calculatorString, calculatorState, uiObject);
