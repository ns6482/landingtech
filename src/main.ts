import Company from "./company"
import unFlatten from "./unflatten"

const landParcelLookup: { [id: string]: number } = {}

const LAND_OWNERSHIP_FILE = './files/land_ownership.csv'
const COMPANY_RELATIONS_FILE = './files/company_relations.csv'

const fs = require('fs');

console.log('processing....')

try {
    const data = fs.readFileSync(LAND_OWNERSHIP_FILE, 'UTF-8');

    // ignore column
    const [, ...lines] = data.split('\n');

    // build dictionary of land parcels
    lines.forEach(line => {
        const [, companyId] = line.split(',')
        if (!landParcelLookup[companyId]) {
            landParcelLookup[companyId] = 1
        } else {
            landParcelLookup[companyId] += 1
        }
    });
} catch (err) {
    console.error(err);
}

let companies = []
try {
    const data = fs.readFileSync(COMPANY_RELATIONS_FILE, 'UTF-8');

    // ignore header
    const [, ...lines] = data.split('\n');

    // build dictionary of land parcels
    lines.forEach(line => {
        const [id, name, parent = null] = line.split(',')
        const landParcels = landParcelLookup[id]

        const company = new Company(id, name, parent, landParcels)
        companies.push(company)
    });
} catch (err) {
    console.error(err);
}

const [rootLookup, tree] = unFlatten(companies)


function replacer(key, value) {
    if (key == "parent") return undefined;
    else if (key == "parcels") return undefined;
    else if (key == "children") return value;
    else return value;
}

const readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('Enter company id, e.g C377877665241\nType quit to exit.\n');
rl.prompt();

rl.on('line', function (line) {
    switch (line.trim()) {
        case 'quit':
            rl.close()
        default:
            const rootToUse = rootLookup[line];
            if (!tree[rootToUse]) {
                console.error(`I could not find ${line}, did you type that correctly?`)
            } else {
                const printTree = JSON.stringify(tree[rootToUse], replacer, " | ")
                console.log(printTree.replace(/[{}]/g, ''))
            }
            break;
    }
    rl.prompt();
}).on('close', function () {
    console.log('Have a great day!');
    process.exit(0);
});



