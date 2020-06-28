import { ObjectId } from 'mongodb';

const COLLECTION: String = 'travels';
class Controller {
  store: any;

  constructor(injectedStore: any) {
    this.store = injectedStore;
  }

  async list() {
    const travels = await this.store.list(COLLECTION);
    return travels;
  }

  async upsert() {
    const typeExam = await this.store.list('travels');
    return typeExam;
  }
}

export default Controller;
