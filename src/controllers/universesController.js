import { Universe } from '../models/universe.js';
import createHttpError from 'http-errors';

export const getAllUniverses = async (req, res) => {
  const universes = await Universe.find({ owner: { _id: req.user._id } });
  res.status(200).json(universes);
};

export const getUniverseById = async (req, res) => {
  const { id } = req.params;
  const universe = await Universe.findById({
    _id: id,
    owner: { _id: req.user._id },
  });

  if (!universe) {
    throw new createHttpError(
      404,
      'Universe does not exist or you do not have permission to access it',
    );
  }

  res.status(200).json(universe);
};

export const createUniverse = async (req, res) => {
  const universe = await Universe.create({
    ...req.body,
    owner: { username: req.user.username, _id: req.user._id },
  });

  req.user.universes.push({
    universeName: universe.name,
    universeId: universe._id,
  });
  await req.user.save();

  res.status(201).json(universe);
};

export const updateUniverse = async (req, res) => {
  const { id } = req.params;
  const universe = await Universe.findByIdAndUpdate(
    { _id: id, owner: { _id: req.user._id } },
    req.body,
    { new: true },
  );

  if (!universe) {
    throw new createHttpError(404, 'Universe not found');
  }

  req.user.universes = req.user.universes.map((u) =>
    u.universeId.toString() === id ? { ...u, universeName: universe.name } : u,
  );
  await req.user.save();

  res.status(200).json(universe);
};

export const deleteUniverse = async (req, res) => {
  const { id } = req.params;
  const universe = await Universe.findByIdAndDelete({
    _id: id,
    owner: { _id: req.user._id },
  });

  if (!universe) {
    throw new createHttpError(404, 'Universe not found');
  }

  req.user.universes = req.user.universes.filter(
    (u) => u._id.toString() !== id,
  );
  await req.user.save();

  res.status(200).json(universe);
};
