import fs from 'node:fs';

// METODO PARA PROCESAR ARCHVIOS
export function ProcessFile(file) {
    const RouteSave = `public/imgProducts/${file.originalname}`;
    const NewPath = `imgProducts/${file.originalname}`;
    fs.renameSync(file.path, RouteSave);
    return NewPath;
}
