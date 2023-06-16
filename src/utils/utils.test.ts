

const { describe, expect, test } = require("@jest/globals");
const { calculateWallCft } = require("./utils");
const { dryMaterial } = require("./utils");
const {calculateBricks} = require("./utils");
const {calculateSandCft} = require("./utils");
const {calculateCementBags} = require("./utils");
const {wetQuantityOfPlaster} = require("./utils");
const {dryQuantityOfPlaster} = require("./utils");
const {calculateTermite} = require("./utils");
const {calculateMembraneSheet} = require("./utils");


describe("Wall CFT", () => {
  test("Calculate Wall CFT", () => {
    expect(calculateWallCft(2, 3, 4)).toBe(24);
  });
});

describe ("Bricks", ()=>{
    test("Calculate Bricks", ()=>{
        expect(calculateBricks(calculateWallCft(2,3,4))).toBe(324);
    });
});


describe("Dry Material ", ()=>{
    test("Calculate Dry Material", ()=>{
        expect(dryMaterial(calculateWallCft(5,15,2))).toBe(195);
    });
});

describe("Sand CFT", ()=>{
    test("Calculate Sand CFT", ()=>{
        expect(calculateSandCft(4,5,dryMaterial(calculateWallCft(5,15,2)))).toBe(156);
    });
});

describe("Cement CFT", ()=>{
    test("Calculate Cement CFT", ()=>{
        expect(calculateCementBags(1,5,dryMaterial(calculateWallCft(5,15,2)))).toBe(48.75);
    });
});

describe("Wet Quantity Of Plaster", ()=>{
    test("Calculate Wet Quantity of Plaster", ()=>{
        expect(wetQuantityOfPlaster(4,4)).toBe(12);
    });
});

describe("Dry Quantity of Plaster",()=>{
    test("Calculate Dry Quantity of Plaster",()=>{
        expect(dryQuantityOfPlaster(wetQuantityOfPlaster(4,4))).toBe(15.24);
    })
})

describe("Termite ", ()=>{
    test("Calculate Termite ",()=>{
        expect(calculateTermite(50,45)).toBe(4.33);

    });
});

describe("Membrane Sheet ",()=>{
    test("Calculate Membrane Sheet ", ()=>{
        expect(calculateMembraneSheet(4, 5)).toBe(20)
    })
})
export {};
