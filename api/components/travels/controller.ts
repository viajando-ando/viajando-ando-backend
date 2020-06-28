import { ObjectId } from 'mongodb';

const TABLE = 'typesexams';

class Controller {
  store: any;

  constructor(injectedStore: any) {
    this.store = injectedStore;
  }

  async upsert() {
    const typeExam = await this.store.list('travels');
    return typeExam;
  }
}

export default Controller;
