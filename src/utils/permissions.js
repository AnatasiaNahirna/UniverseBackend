export const unniversePermissions = {
  admin: [
    'viewUniverse',
    'editUniverse',
    'createDocument',
    'editDocument',
    'deleteDocument',
  ],
  writer: [
    'viewUniverse',
    'createDocument',
    'editOwnDocument',
    'deleteOwnDocument',
  ],
  reader: ['viewUniverse'],
};
