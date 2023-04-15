import { useLocalObservable } from 'mobx-react';

function useLocal(initValue) {
  const state = useLocalObservable(() => ({
    value: initValue,
    setValue(value) {
      this.value = value;
    }
  }))
  return [state.value, state.setValue];
}

export { useLocal }
