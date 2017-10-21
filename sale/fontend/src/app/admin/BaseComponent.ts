import {MessageAlert} from "../share/message.model";
export class BaseComponent {
  message = new MessageAlert();

  updateMessge(messge, type) {
    this.message.content = messge;
    this.message.condition = true;
    this.message.type = type;
    setTimeout(() => {
      this.message.condition = false;
    }, this.message.timout);
  }
}
