import Sequelize, { Model, BuildOptions, DataTypes } from "sequelize";

import db from "../config/database";

interface IImageModel extends Model {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  original_name: string;
  key: string;
}

type IImageModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IImageModel;
};

const ImageModel = <IImageModelStatic>db.define("images", {
  original_name: {
    type: Sequelize.STRING,
  },
  key: {
    type: Sequelize.STRING,
  },
});

(async () => {
  try {
    await ImageModel.sync();
    console.log(`Image model successfully synced`);
  } catch (err) {
    console.log(`Image model not synced: ${err.message}`);
  }
})();
export default ImageModel;
