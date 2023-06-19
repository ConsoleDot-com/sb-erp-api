export const sendResponse = (
  res: any,
  message: any = null,
  data: any,
  status: number
) => {
  return res.status(status).json({ status, message, data });
};
const calculateWallCft = (length: number, height: number, thickness: number) =>
  length * height * thickness;

const calculateBricks = (wallcft: number) => wallcft * 13.5;

const dryMaterial = (totalcft: number) => {
  const thirtyPercent = (30 / 100) * totalcft;
  return totalcft + thirtyPercent;
};

const calculateSandCft = (
  sandportion: number,
  cementportion: number,

  drymaterial: number
) => {
  const totalportion = sandportion + cementportion;
  return (sandportion / totalportion) * drymaterial;
};

const calculateCementBags = (
  sandportion: number,
  cementportion: number,
  drymaterial: number
) => {
  const totalportion = sandportion + cementportion;
  const cementCft = (sandportion / totalportion) * drymaterial;
  return cementCft * 1.25;
};

const wetQuantityOfPlaster = (length: number, height: number) =>
  (3 / 4) * length * height;

const dryQuantityOfPlaster = (wetquantityofplaster: number) =>
  wetquantityofplaster * 1.27;

const calculateTermite = (length: number, width: number) =>
  parseFloat(((length * width) / 540).toFixed(2));

const calculateMembraneSheet = (length: number, width: number) =>
  length * width;

// Bajar
const calculateBajarCft = (length: number, width: number, height: number) =>
  length * width * height;

const bajarDryMaterial = (bajarcft: number) => {
  const thirtyPercent = (30 / 100) * bajarcft;
  return bajarcft + thirtyPercent;
};

const calculateBajarSandCft = (
  sandportion: number,
  cementportion: number,
  bajarportion: number,
  dryMaterial: number
) => {
  const portionSum = sandportion + cementportion + bajarportion;
  return (sandportion / portionSum) * dryMaterial;
};

const calculateBajarCementCft = (
  sandportion: number,
  cementportion: number,
  bajarportion: number,
  dryMaterial: number
) => {
  const portionSum = sandportion + cementportion + bajarportion;
  const cementCft = (cementportion / portionSum) * dryMaterial;
  return cementCft * 1.25;
};

// Crush
const calculateCrushCft = (length: number, width: number, height: number) =>
  length * width * height;

const crushDryMaterial = (bajarucft: number) => {
  const thirtyPercent = (30 / 100) * bajarucft;
  return bajarucft + thirtyPercent;
};

const calculateCrushSandCft = (
  sandportion: number,
  cementportion: number,
  bajarportion: number,
  dryMaterial: number
) => {
  const portionSum = sandportion + cementportion + bajarportion;
  return (sandportion / portionSum) * dryMaterial;
};

const calculateCrushCementCft = (
  sandportion: number,
  cementportion: number,
  bajarportion: number,
  dryMaterial: number
) => {
  const portionSum = sandportion + cementportion + bajarportion;
  const cementCft = (cementportion / portionSum) * dryMaterial;
  return cementCft * 1.25;
};

export {
  dryQuantityOfPlaster,
  wetQuantityOfPlaster,
  calculateWallCft,
  calculateBricks,
  dryMaterial,
  calculateSandCft,
  calculateCementBags,
  calculateTermite,
  calculateMembraneSheet,
  calculateBajarSandCft,
  calculateBajarCft,
  bajarDryMaterial,
  calculateBajarCementCft,
  calculateCrushCft,
  crushDryMaterial,
  calculateCrushSandCft,
  calculateCrushCementCft,
};
