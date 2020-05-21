import { RequestIdleCallbackDeadline } from '../global';
import { Fiber } from './types';
import { nextUnitOfWork } from './render';

export function workLoop({ timeRemaining, didTimeout }: RequestIdleCallbackDeadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = timeRemaining() < 1;
  }
  window.requestIdleCallback(workLoop);
}

function performUnitOfWork(nextUnitOfWork) {
  // TODO
  console.log(nextUnitOfWork);
  return null;
}

// 下面是fin
