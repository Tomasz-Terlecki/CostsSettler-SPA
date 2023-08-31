/**
 * Base domain model.
 */
export abstract class BaseModel {
  /** Domain model id. */
  id: string;

  /** Creates base domain model instance. */
  constructor() {
    this.id = '';
  }
}