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
      string: '',
      storedFn: '',
      activeFn: '',
      storedNum: 0,
    });

    calcState.connect({
      screen: [setScreen],
      storedFn: [setFn],
      activeFn: [setActiveFn],
      storedNum: [pushNum],
    });

    calcState.setState('screen', '0');
    calcState.update('screen');

    return [calc, calcStr, calcState, ui];
  };
  return connectApp;
})(calculator, calculatorString, calculatorState, uiObject);
