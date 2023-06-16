const calculateWallCft = (length: number, height: number, thickness: number) =>
  length * height * thickness;

  
const calculateBricks = (wallcft: number) => wallcft * 13.5;


const dryMaterial = (totalcft: number) => {
  const thirtyPercent = (30 / 100) * totalcft;
  return totalcft + thirtyPercent;
};


const calculateSandCft = (
  sandportion: number,
  totalportion: number,
  drymaterial: number
) => (sandportion / totalportion) * drymaterial;


const calculateCementBags = (
  cementportion: number,
  totalportion: number,
  drymaterial: number
) => {
  const cementCft = drymaterial * (cementportion / totalportion);
  return cementCft * 1.25;
};

const wetQuantityOfPlaster = (length: number, height: number) =>
  (3 / 4) * length * height;


const dryQuantityOfPlaster = (wetquantityofplaster: number) =>
  wetquantityofplaster * 1.27;


const calculateTermite = (length: number, width: number) =>
  parseFloat(((length * width) / 520).toFixed(2));

const calculateMembraneSheet = (length: number, width: number) =>
  length * width;

const calculateGhasu=()=>{}

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
};
