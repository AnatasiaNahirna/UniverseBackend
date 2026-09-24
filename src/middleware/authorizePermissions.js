import { Universe } from '../models/universe.js';
import createHttpError from 'http-errors';
import { getUniverseRole } from '../helpers/getUniverseRole.js';
import {
  universePermissions,
  ownDocumentPermissions,
} from '../utils/permissions.js';
import { Document } from '../models/document.js';

export const authorizePermissions = (resource, permission) => {
  return async (req, res, next) => {
    const { universeId } = req.params;
    const universe = await Universe.findById(universeId);
    if (!universe) {
      throw createHttpError(404, 'Universe not found');
    }

    const userRole = await getUniverseRole(universe, req.user._id);
    if (userRole === 'owner') {
      return next();
    }
    const allowedPermissions = universePermissions[userRole] ?? [];

    if (resource === 'universe') {
      if (allowedPermissions.includes(permission)) {
        return next();
      } else {
        throw createHttpError(403, 'Forbidden');
      }
    }

    if (resource === 'document') {
      const { documentId } = req.params;
      const document = await Document.findById(documentId);
      if (!document || !document.universe.equals(universe._id)) {
        throw createHttpError(404, 'Document not found');
      }

      if (allowedPermissions.includes(permission)) {
        return next();
      }

      const ownPermission = ownDocumentPermissions[permission];

      if (
        ownPermission &&
        allowedPermissions.includes(ownPermission) &&
        document.author.equals(req.user._id)
      ) {
        return next();
      }

      throw createHttpError(403, 'Forbidden');
    }

    throw createHttpError(500, 'Unknown authorization resource');
  };
};
