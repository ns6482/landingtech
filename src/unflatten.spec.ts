import Company from "./company";
import unFlatten from "./unflatten";


/**
 * assumption no orphans
 */
describe('unflatten', () => {

    const data = [
        new Company('JKL', 'JKL', 'GHI', 10),
        new Company('GHI', 'GHI', 'ABC', 2),
        new Company('DEF', 'DEF', 'ABC', 3),
        new Company('ABC', 'ABC', null, 1),
        new Company('HUY', 'HUY', 'DEF', 3),

        new Company('MNO', 'MNO', 'PQR', 10),
        new Company('PQR', 'PQR', 'VWX', 2),
        new Company('STU', 'STU', 'VWX', 3),
        new Company('VWX', 'VWX', null, 1),
        new Company('YZA', 'YZA', 'STU', 4),
    ]

    test("should convert flat array of items to tree, and calculate total land parcels", () => {

        const [, tree] = unFlatten(data)

        expect(tree).toEqual({
            "ABC": {
                "id": "ABC",
                "name": "ABC",
                "parent": null,
                "parcels": 1,
                "total": 19,
                "children": [{
                    "id": "GHI",
                    "name": "GHI",
                    "parent": "ABC",
                    "parcels": 2,
                    "total": 12,
                    "children": [{
                        "id": "JKL",
                        "name": "JKL",
                        "parent": "GHI",
                        "parcels": 10,
                        "total": 10,
                        "children": []
                    }]
                }, {
                    "id": "DEF",
                    "name": "DEF",
                    "parent": "ABC",
                    "parcels": 3,
                    "total": 6,
                    "children": [{
                        "id": "HUY",
                        "name": "HUY",
                        "parent": "DEF",
                        "parcels": 3,
                        "total": 3,
                        "children": []
                    }]
                }]
            },
            "VWX": {
                "id": "VWX",
                "name": "VWX",
                "parent": null,
                "parcels": 1,
                "total": 20,
                "children": [{
                    "id": "PQR",
                    "name": "PQR",
                    "parent": "VWX",
                    "parcels": 2,
                    "total": 12,
                    "children": [{
                        "id": "MNO",
                        "name": "MNO",
                        "parent": "PQR",
                        "parcels": 10,
                        "total": 10,
                        "children": []
                    }]
                }, {
                    "id": "STU",
                    "name": "STU",
                    "parent": "VWX",
                    "parcels": 3,
                    "total": 7,
                    "children": [{
                        "id": "YZA",
                        "name": "YZA",
                        "parent": "STU",
                        "parcels": 4,
                        "total": 4,
                        "children": []
                    }]
                }]
            }
        })

    })

    test("generates route lookup", () => {

        const [rootToUse,] = unFlatten(data)

        expect(rootToUse).toEqual({
            "DEF": "ABC",
            "GHI": "ABC",
            "HUY": "ABC",
            "JKL": "ABC",
            "MNO": "VWX",
            "PQR": "VWX",
            "STU": "VWX",
            "YZA": "VWX"
        })
    })
});
