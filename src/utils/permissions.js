export const universePermissions = {
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

export const ownDocumentPermissions = {
  editDocument: 'editOwnDocument',
  deleteDocument: 'deleteOwnDocument',
};
