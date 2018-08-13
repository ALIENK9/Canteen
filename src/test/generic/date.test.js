describe('Date test', () => {
  it('should say last day of October is 31 ', () => {
    const currentYear = 2010;
    const currentMonth = 10;
    const lastDayOfMonth = new Date(new Date(currentYear, currentMonth, 1) - 1).getDate();
    expect(lastDayOfMonth).toEqual(31);
  });
  it('should say last day of June is 30', () => {
    const currentYear = 2010;
    const currentMonth = 6;
    const date = new Date(currentYear, currentMonth, 1);
    // currentMonth è avanti di un mese per Date()
    date.setDate(date.getDate() - 1);
    const lastDayOfMonth = date.getDate();
    expect(lastDayOfMonth).toEqual(30);
  });
  it('should say last day of December is 31', () => {
    const currentYear = 2010;
    const currentMonth = 12;
    const lastDayOfMonth = new Date(new Date(currentYear, currentMonth, 1) - 1).getDate();
    expect(lastDayOfMonth).toEqual(31);
  });
});
