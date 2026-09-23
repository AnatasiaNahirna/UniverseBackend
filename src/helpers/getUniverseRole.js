import { UniverseMember } from '../models/universeMember.js';
import createHttpError from 'http-errors';

export const getUniverseRole = async (universe, userId) => {
  if (universe.owner.equals(userId)) {
    return 'owner';
  }

  const member = await UniverseMember.findOne({
    user: userId,
    universe: universe._id,
  });
  if (!member) {
    throw createHttpError('403', 'Forbidden');
  }

  return member.role;
};
