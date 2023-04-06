import { ISPViews } from "../../src/common/SPEntities";

export interface ISPViewPickerService {
  getViews(): Promise<ISPViews>;
}