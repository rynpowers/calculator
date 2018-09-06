class CalcState {
  constructor() {
    this.state = {};
  }
  createState(obj) {
    Object.keys(obj).forEach(key => {
      this.state[key] = { value: obj[key], func: [] };
    });
  }

  connect(obj) {
    Object.keys(obj).forEach(key => {
      let { func } = this.state[key];
      func.push(...obj[key]);
    });
  }

  setState(obj) {
    Object.keys(obj).forEach(key => {
      this.state[key].value = obj[key];
      let { func, value } = this.state[key];
      func.forEach(f => f(value));
    });
  }

  getState(prop) {
    return this.state[prop].value;
  }
}

export default CalcState;
