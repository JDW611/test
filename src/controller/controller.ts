import db from "../models/index";
import { Request, Response } from "express";

const Tutorial = db.tutorial;
const Op = db.sequelize;

// create
export const create = async (req: Request, res: Response) => {
  try {
    if (!req.body.title) {
      res.status(400).send({
        message: "Title is empty!!!",
      });
      return;
    }

    const tutorial = {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ?? false,
    };

    const data = await Tutorial.create(tutorial);
    res.send(data);
  } catch (error: any) {
    res.status(500).send({
      message: error.message || "Create tutorial failure.",
    });
  }
};

// Retrieve
export const findAll = async (req: Request, res: Response) => {
  const title = req.query.title as string;
  let condition = { where: {} };
  let keyword: string | undefined = title;

  if (keyword) {
    condition = {
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${keyword}$`,
            },
          },
          {
            description: {
              [Op.like]: `%${keyword}$`,
            },
          },
        ],
      },
    };
  }

  try {
    const data = await Tutorial.findAll(condition);
    res.send(data);
  } catch (err: any) {
    res.status(500).send({
      message: err.message || "Retrieve all tutorials failure.",
    });
  }
};

// Retrieve by id
export const findOne = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await Tutorial.findByPk(id);
    res.send(data);
  } catch (err: any) {
    res.status(500).send({
      message:
        err.message || `Retrieve tutorial failure. (id: ${req.params.id})`,
    });
  }
};

// update
export const update = async (req: Request, res: Response) => {
  const id = req.params.id;
  const condition = id ? { where: { id: id } } : null;

  try {
    const resultCount = await Tutorial.update(req.body, condition);
    if (resultCount == 1) {
      res.send({
        message: "Tutorial updated.",
      });
    } else {
      res.send({
        message: "Cannot update tutorial. (id: " + id + ")",
      });
    }
  } catch (err: any) {
    res.status(500).send({
      message: err.message || "Update tutorial failure.(id:" + id + ")",
    });
  }
};

// Delete
export const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const condition = id ? { where: { id } } : null;
    const resultCount = await Tutorial.destroy(condition);
    if (resultCount == 1) {
      res.send({ message: "Tutorial deleted." });
    } else {
      res.send({ message: `Cannot delete tutorial. (id: ${id})` });
    }
  } catch (err: any) {
    res.status(500).send({
      message: err.message || `Delete tutorial failure. (id: ${req.params.id})`,
    });
  }
};
