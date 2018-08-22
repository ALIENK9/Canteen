import Immutable from 'seamless-immutable';

// test per capire il funzionamento base di Seamless immutable
describe('Seamless immutable test', () => {
  it('should trow exception if immutable object is modified', () => {
    const obj = Immutable({ field: 'ok' });
    expect(() => { obj.field = 'modified'; return obj; }).toThrowError(TypeError);
  });

  it('shouldn\'t trow if object is modified (because it isn\'t immutable)', () => {
    const obj = { field: 'ok' };
    obj.field = 'modified';
    expect(obj).toEqual({ field: 'modified' });
  });
});
