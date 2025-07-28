import provider from "./PathProvider";
import Template from "./Template";

class Package {
  template: Template;
  constructor(name: string) {
    this.template = new Template(name);
  }
}

export default Package;
