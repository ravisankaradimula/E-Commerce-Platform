import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { error } from "console";

const createCategory = asyncHandler(async (req, res) => {
  if (!req.body || !req.body.name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const { name } = req.body;

  const existing = await Category.findOne({ name });
  if (existing) return res.status(400).json({ error: "Already exists" });

  const category = await Category.create({ name });
  res.status(201).json(category);
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;
    const category = await Category.findOne({ _id: categoryId });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    category.name = name;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const removeCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (categoryId) {
      const removed = await Category.findOneAndDelete({ _id: categoryId });
      res.json(removed);
    } else {
      res.status(404).json("Category not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const listCategory = asyncHandler(async (req, res) => {
  try {
    const all = await Category.find({});
    res.json(all);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const getCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (categoryId) {
      const category = await Category.findOne({ _id: categoryId });
      res.json(category);
    } else {
      res.status(404).json("Category not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  getCategory,
};
