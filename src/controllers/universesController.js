import { Universe } from '../models/universe.js';

export const getAllUniverses = async (req, res) => {
  const universes = await Universe.find();
  res.status(200).json(universes);
};

export const getUniverseById = async (req, res) => {
  const { id } = req.params;
  const universe = await Universe.findById(id);

  if (!universe) {
    return res.status(404).json({ message: 'Universe not found' });
  }

  res.status(200).json(universe);
};

export const createUniverse = async (req, res) => {
  const universe = await Universe.create(req.body);
  res.status(201).json(universe);
};

export const updateUniverse = async (req, res) => {
  const { id } = req.params;
  const universe = await Universe.findByIdAndUpdate({ _id: id }, req.body, {
    returnDocument: 'after',
  });

  if (!universe) {
    return res.status(404).json({ message: 'Universe not found' });
  }

  res.status(200).json(universe);
};

export const deleteUniverse = async (req, res) => {
  const { id } = req.params;
  const universe = await Universe.findByIdAndDelete(id);

  if (!universe) {
    return res.status(404).json({ message: 'Universe not found' });
  }

  res.status(200).json(universe);
};
