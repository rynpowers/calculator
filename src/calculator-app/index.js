const appConnections = (function(
  { Calculator },
  { CalcString },
  { CalcState },
  { UI }
) {
  const connectApp = function() {
    let calc = new Calculator();
    let calcStr = new CalcString();
    let calcState = new CalcState();
    let ui = new UI();

    let setScreen = ui.setScreen.bind(ui);
    let setFn = calc.setFn.bind(calc);
    let pushNum = calc.push.bind(calc);
    let setActiveFn = ui.setActiveFn.bind(ui);

    calcState.createState({
      screen: '',
      number: null,
      storedFn: '',
      activeFn: '',
      total: 0,
      listener: '',
    });

    calcState.connect({
      screen: [setScreen],
      storedFn: [setFn],
      activeFn: [setActiveFn],
      number: [pushNum],
      total: [setScreen],
    });

    calcState.setState({ screen: '0' });

    return [calc, calcStr, calcState, ui];
  };
  return connectApp;
})(calculator, calculatorString, calculatorState, uiObject);
