import get from "lodash/get";
import { States } from "../types";

export const createStateMachine = <TEnum extends States, TMachine>(
  stateMachine: TMachine,
  stateGetter: () => TEnum,
  stateSetter: (state: TEnum) => void
) => async (nextState: TEnum, ...args: unknown[]): Promise<void> => {
  const next = get(stateMachine, [stateGetter(), nextState], null);
  if (next === null) {
    console.warn(
      `Illegal state transition. ${stateGetter()} does not support transition ${stateGetter()} -> ${nextState}`
    );
    return;
  }
  stateSetter(nextState);
  await next(...args);
};

export default createStateMachine;
