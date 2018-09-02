const appConnections = (function(
  { Calculator },
  { CalcString },
  { CalcState },
  { UI },
  helpers
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

    const {
      numberHelper,
      operatorHelper,
      executeHelper,
      percentHelper,
      plusMinusHelper,
    } = helpers;

    let onClickNumber = numberHelper.bind(this, calcState, calcStr, calc);
    let onClickOperator = operatorHelper.bind(this, calcState, calcStr, calc);
    let onClickExecute = executeHelper.bind(this, calcState, calcStr, calc);
    let onClickPlusMinus = plusMinusHelper.bind(this, calcState, calcStr, calc);
    let onClickPercent = percentHelper.bind(this, calcState, calcStr, calc);

    return {
      onClickNumber,
      onClickOperator,
      onClickExecute,
      onClickPlusMinus,
      onClickPercent,
      ui,
    };
  };

  return app;
})(calculator, calculatorString, calculatorState, uiObject, helpers);
