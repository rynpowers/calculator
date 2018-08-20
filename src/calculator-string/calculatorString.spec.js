const { CalculatorString } = calcString;
let str;
describe('Calculator string', () => {
  str = CalculatorString;
  it('should equal hi', () => {
    expect(str).toBe('hi');
  });
});
