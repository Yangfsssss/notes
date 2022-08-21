// 可使用抽象类
export abstract class BaseMenu {
  title: string;
  icon: string;
  abstract exec():unknown; // 可使用抽象方法：父类给出定义但不实现，但子类必须实现

  constructor(props: { title: string; icon: string }) {
    this.title = props.title;
    this.icon = props.icon;
  }
  
  isDisabled() {
    return false;
  }
}

class ButtonMenu extends BaseMenu {
  constructor(props: { title: string; icon: string }) {
    super(props);
  }

  exec() {
    console.log('hello');
  }
}

class SelectMenu extends BaseMenu {
  constructor(props: { title: string; icon: string }) {
    super(props);
  }

  exec() {
    return ['item1', 'item2', 'item3'];
  }
}

class ModalMenu extends BaseMenu {
  constructor(props: { title: string; icon: string }) {
    super(props);
  }

  exec() {
    const div = document.createElement('div');
    div.innerText = 'modal';

    return div;
  }
}

const selectMenu = new SelectMenu({ title: 'select', icon: 'iSelect' });
console.log(selectMenu.exec());
