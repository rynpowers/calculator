const init = (function(createApp) {
  let [calc, calcStr, calcState, ui] = createApp();
  let { numbers, operators, clear, execute } = ui.elements;

  numbers.forEach(number => {
    number.addEventListener('click', e => {
      calcStr.add(e.target.value);
      calcState.setState('screen', calcStr.getCalcString());
      calcState.setState('string', calcStr.getCalcString());
      calcState.setState('activeFn', '');
      calcState.update('screen', 'storedFn', 'string', 'activeFn');
    });
  });
  operators.forEach(operator => {
    operator.addEventListener('click', e => {
      if (calcState.getState('string')) {
        calcState.setState('storedNum', calcStr.getNumber());
        calcState.update('storedNum');
      }
      calcState.setState('storedFn', e.target.value);
      calcState.setState('activeFn', e.target.value);
      calcState.update('screen', 'storedFn', 'activeFn');

      calcState.setState('string', calcStr.reset());
      calcState.setState('screen', calcStr.numToString(calc.value()));
      calcState.update('screen');
    });
  });
  clear.addEventListener('click', e => {
    [calc, calcStr, calcState, ui] = createApp();
    calcState.update('activeFn');
  });

  execute.addEventListener('click', () => {
    if (calcState.getState('string')) {
      calcState.setState('storedNum', calcStr.getNumber());
      calcState.update('storedNum', 'screen');
    } else {
      calcState.update('storedNum');
    }
    calcState.setState('string', calcStr.reset());
    calcState.setState('screen', calcStr.numToString(calc.value()));
    calcState.update('screen');
  });
})(appConnections);
