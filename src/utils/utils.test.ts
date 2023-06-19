const { describe, expect, test } = require("@jest/globals");
const { calculateWallCft } = require("./utils");
const { dryMaterial } = require("./utils");
const { calculateBricks } = require("./utils");
const { calculateSandCft } = require("./utils");
const { calculateCementBags } = require("./utils");
const { wetQuantityOfPlaster } = require("./utils");
const { dryQuantityOfPlaster } = require("./utils");
const { calculateTermite } = require("./utils");
const { calculateMembraneSheet } = require("./utils");
const { ghasuCft } = require("./utils");
const { calculateGhasuSandCft } = require("./utils");
const { calculateGhasuCementCft } = require("./utils");
const { calculateGhasuBajarCft } = require("./utils");
const {
  ghasuDryMaterial,
  calculateCrushCft,
  crushDryMaterial,
  calculateCrushSandCft,
  calculateCrushCementCft,
  calculateBajarSandCft,
  calculateBajarCft,
  bajarDryMaterial,
  calculateBajarCementCft,
} = require("./utils");

describe("Wall CFT", () => {
  test("Calculate Wall CFT", () => {
    expect(calculateWallCft(2, 3, 4)).toBe(24);
  });
});

describe("Bricks", () => {
  test("Calculate Bricks", () => {
    expect(calculateBricks(calculateWallCft(2, 3, 4))).toBe(324);
  });
});

describe("Dry Material ", () => {
  test("Calculate Dry Material", () => {
    expect(dryMaterial(calculateWallCft(5, 15, 2))).toBe(195);
  });
});

describe("Sand CFT", () => {
  test("Calculate Sand CFT", () => {
    expect(
      calculateSandCft(4, 1, dryMaterial(calculateWallCft(5, 15, 2)))
    ).toBe(156);
  });
});

describe("Cement CFT", () => {
  test("Calculate Cement CFT", () => {
    expect(
      calculateCementBags(4, 1, dryMaterial(calculateWallCft(5, 15, 2)))
    ).toBe(195);
  });
});

describe("Wet Quantity Of Plaster", () => {
  test("Calculate Wet Quantity of Plaster", () => {
    expect(wetQuantityOfPlaster(4, 4)).toBe(12);
  });
});

describe("Dry Quantity of Plaster", () => {
  test("Calculate Dry Quantity of Plaster", () => {
    expect(dryQuantityOfPlaster(wetQuantityOfPlaster(4, 4))).toBe(15.24);
  });
});

describe("Termite ", () => {
  test("Calculate Termite ", () => {
    expect(calculateTermite(50, 45)).toBe(4.33);
  });
});

describe("Membrane Sheet ", () => {
  test("Calculate Membrane Sheet ", () => {
    expect(calculateMembraneSheet(4, 5)).toBe(20);
  });
});

// BAJAR
describe("Bajar CFT", () => {
  test("Calculate Bajar CFT", () => {
    expect(calculateBajarCft(2, 3, 4)).toBe(24);
  });
});

describe("Bajar Dry Material ", () => {
  test("Calculate Bajar Dry Material", () => {
    expect(bajarDryMaterial(calculateBajarCft(5, 15, 2))).toBe(195);
  });
});

describe("Bajar Sand CFT", () => {
  test("Calculate Bajar Sand CFT", () => {
    expect(
      calculateBajarSandCft(
        1,
        4,
        5,
        bajarDryMaterial(calculateBajarCft(15, 5, 2))
      )
    ).toBe(19.5);
  });
});

describe("Bajar Cement CFT", () => {
  test("Calculate Bajar Cement CFT", () => {
    expect(
      calculateBajarCementCft(
        1,
        4,
        5,
        bajarDryMaterial(calculateBajarCft(15, 5, 2))
      )
    ).toBe(97.5);
  });
});

// CRUSH
describe("Crush CFT", () => {
  test("Calculate Crush CFT", () => {
    expect(calculateCrushCft(2, 3, 4)).toBe(24);
  });
});

describe("Crush Dry Material ", () => {
  test("Calculate Crush Dry Material", () => {
    expect(crushDryMaterial(calculateCrushCft(5, 15, 2))).toBe(195);
  });
});

describe("Crush Sand CFT", () => {
  test("Calculate Crush Sand CFT", () => {
    expect(
      calculateCrushSandCft(
        1,
        4,
        5,
        crushDryMaterial(calculateCrushCft(15, 5, 2))
      )
    ).toBe(19.5);
  });
});

describe("Crush Cement CFT", () => {
  test("Calculate Crush Cement CFT", () => {
    expect(
      calculateCrushCementCft(
        1,
        4,
        5,
        crushDryMaterial(calculateCrushCft(15, 5, 2))
      )
    ).toBe(97.5);
  });
});

export {};
