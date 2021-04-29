import express from 'express';
import mongoose from 'mongoose';
import IntentionModel from '../models/intentionModel.js';

const router = express.Router();

export const getIntentions = async (req, res) => {
  try {
    const intentionsMessages = await IntentionModel.find();

    res.status(200).json(intentionsMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createIntention = async (req, res) => {
  const { title, message, tags } = req.body;
  const newIntentionMessage = new IntentionModel({ title, message, tags });
  try {
    await newIntentionMessage.save();

    res.status(201).json(newIntentionMessage);
  } catch (error) {
    res.status(409).json({
      message: error.message
    });
  }
}

export const getIntention = async (req, res) => {
  const { id } = req.params;
  try {
    const intention = await IntentionModel.findById(id);
    res.status(200).json(intention);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
}

export const updateIntention = async (req, res) => {
  const { id } = req.params;
  const { title, message, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No intention with id: ${id}`);

  const updatedIntention = { title, message, tags, _id: id };

  await IntentionModel.findByIdAndUpdate(id, updatedIntention, { new: true });

  res.json(updatedIntention);
}

export const deleteIntention = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No intention with id: ${id}`);

  await IntentionModel.findByIdAndRemove(id);

  res.json({ message: "Intention deleted successfully." });
}

export default router;