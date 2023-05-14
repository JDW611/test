import sequelize, { DataTypes, Sequelize } from "sequelize";
import { DataType, Model } from "sequelize";

interface TutorialAttributes {
  title: string;
  description: string;
  published: boolean;
}

class Tutorial extends Model<TutorialAttributes> implements TutorialAttributes {
  public title!: string;
  public description!: string;
  public published!: boolean;
}

export default (sequelize: Sequelize) => {
  Tutorial.init(
    {
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      published: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Tutorial",
    }
  );
  return Tutorial;
};
