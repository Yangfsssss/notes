// 1，点击
// 2，收集当前组件树的所有点击事件
// 3，再把这些事件依次触发一遍

type Container = PackagedElement | Document;
type EventCb = (e: Event) => void;

const elementEventPropsKey = '__eventProps';
const validEventTypeList = ['click'];

interface PackagedElement extends Element {
  [elementEventPropsKey]: {
    [eventType: string]: EventCb;
  };
}

interface SyntheticEvent extends Event {
  __stopPropagation: boolean;
}

interface Paths {
  capture: EventCb[];
  bubble: EventCb[];
}

function createSyntheticEvent(e: Event): SyntheticEvent {
  // 直接修改了原生的事件对象
  // 1，添加__stopPropagation属性，默认值为false
  //2，修改了原生的stopPropagation方法，调用时把__stopPropagation属性设置为true
  const se = e as SyntheticEvent;
  se.__stopPropagation == false;

  const originStopPropagation = e.stopPropagation;

  se.stopPropagation = () => {
    se.__stopPropagation = true;
    if (originStopPropagation) {
      originStopPropagation.call(e);
    }
  };

  return se;
}

function getEventCbNameFromEventType(eventType: string): string[] | undefined {
  return {
    click: ['onClickCapture', 'onClick'],
  }[eventType];
}

function collectPaths(targetElement: PackagedElement, container: Container, eventType: string) {
  // 在React中，每个事件都有一个捕获的版本：onClick/onClickCapture、onKeyDown/onKeyDownCapture
  const paths: Paths = {
    capture: [],
    bubble: [],
  };

  while (targetElement && targetElement !== container) {
    // DOM
    const eventProps = targetElement[elementEventPropsKey];

    if (eventProps) {
      const cbNameList = getEventCbNameFromEventType(eventType);

      if (cbNameList) {
        cbNameList.forEach((cbName, i) => {
          const cb = eventProps[cbName];

          if (typeof cb === 'function') {
            if (i === 0) {
              // 捕获
              paths.capture.unshift(cb);
            } else {
              // 冒泡
              paths.bubble.push(cb);
            }
          }
        });
      }
    }

    targetElement = targetElement.parentNode as PackagedElement;
  }

  return paths;
}

function updateFiberProps(node: PackagedElement, props: any) {
  // 遍历props，找出需要的事件
  // 把事件保存在 node 中
  node[elementEventPropsKey] = node[elementEventPropsKey] || {};

  validEventTypeList.forEach((eventType) => {
    const cbNameList = getEventCbNameFromEventType(eventType);
    if (!cbNameList) return;

    // [onClick, onClickCapture]
    // DOM.__eventProps = {onClick:xxx, onClickCapture:xxx}
    cbNameList.forEach((cbName) => {
      if (Object.hasOwnProperty.call(props, cbName)) {
        node[elementEventPropsKey][cbName] = props[cbName];
      }
    });
  });

  return node;
}

function triggerEventFlow(paths: EventCb[], se: SyntheticEvent) {
  for (let i = 0; i < paths.length; i++) {
    const cb = paths[i];

    cb.call(null, se);

    if (se.__stopPropagation) {
      break;
    }
  }
}

function dispatchEvent(container: Container, eventType: string, e: Event) {
  const targetElement = e.target as PackagedElement;

  if (!targetElement) return;

  // 收集从触发事件的目标DOM到container之间的所有相关事件
  // 事件保存在数组里 [xx,xx]
  const { capture, bubble } = collectPaths(targetElement, container, eventType);

  // e -> 包装一下 SyntheticEvent se
  const se = createSyntheticEvent(e);

  // 正向遍历一次数组
  triggerEventFlow(capture, se);
  // 反向遍历一次数组
  triggerEventFlow(bubble, se);
}

export function initEvent(container: Container, eventType: string): void {
  container.addEventListener(eventType, (e) => {
    dispatchEvent(container, eventType, e);
  });
}
