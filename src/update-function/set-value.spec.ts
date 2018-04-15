import { setValue } from './set-value';
import { FormGroupValue, INITIAL_STATE } from './test-util';
import { updateGroup } from './update-group';

describe(setValue.name, () => {
  it('should call reducer for controls', () => {
    const resultState = setValue<string>('A')(INITIAL_STATE.controls.inner);
    expect(resultState).not.toBe(INITIAL_STATE.controls.inner);
  });

  it('should call reducer for groups', () => {
    const resultState = setValue<FormGroupValue>({ inner: 'A', inner5: INITIAL_STATE.value.inner5 })(INITIAL_STATE);
    expect(resultState).not.toBe(INITIAL_STATE);
  });

  it('should call reducer for arrays', () => {
    const resultState = setValue<string[]>(['A'])(INITIAL_STATE.controls.inner5);
    expect(resultState).not.toBe(INITIAL_STATE.controls.inner5);
  });

  it('should call reducer for controls uncurried', () => {
    const resultState = setValue('A', INITIAL_STATE.controls.inner);
    expect(resultState).not.toBe(INITIAL_STATE.controls.inner);
  });

  it('should call reducer for groups uncurried', () => {
    const resultState = setValue({ inner: 'A', inner5: INITIAL_STATE.value.inner5 }, INITIAL_STATE);
    expect(resultState).not.toBe(INITIAL_STATE);
  });

  it('should call reducer for arrays uncurried', () => {
    const resultState = setValue(['A'], INITIAL_STATE.controls.inner5);
    expect(resultState).not.toBe(INITIAL_STATE.controls.inner5);
  });

  it('should throw if curried and no state', () => {
    expect(() => setValue<string>('')(undefined as any)).toThrowError();
  });

  it('should work inside an updateGroup', () => {
    const resultState = updateGroup(INITIAL_STATE, {
      inner: setValue<string>('A'),
    });

    expect(resultState).not.toEqual(INITIAL_STATE);
  });

  it('should work inside an updateGroup uncurried', () => {
    const resultState = updateGroup<typeof INITIAL_STATE.value>(INITIAL_STATE, {
      inner: inner => setValue<string>('A', inner),
    });

    expect(resultState).not.toEqual(INITIAL_STATE);
  });
});
