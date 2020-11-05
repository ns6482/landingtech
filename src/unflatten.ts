// unflatten array, with runtime O(n)
import Company from "./company";

/**
 *
 * in JS everything is a reference!
 *
 * why this works:
 *
 * the el variable in our forEach loop is referencing an object in memory (the corresponding object in memory that the
 * data array item is referencing), and parentItem is referencing an object in memory as well (again, one of the objects
 * that’s being referenced in the data array)
 */

export default (data: Company[]) => {

    let root;
    let roots = {}

    // useful function to work out position of company
    const idMapping = data.reduce((acc, item, i) => {
        acc[item.id] = i;
        return acc;
    }, {});

    data.forEach(item => {

        // Handle the root element
        if (item.parent === null || item.parent === "") {
            root = item;
            roots[root.id] = root
            return;
        }

        // Use our mapping to locate the parent element in our data array
        const parentItem = data[idMapping[item.parent]];
        // Add our current item to its parent's `children` array
        parentItem.children = [...(parentItem.children || []), item];

        parentItem.total = parentItem.parcels + parentItem.children.map(c => c.total).reduce((a, b) => a + b)

        // update the root node parcel total
        if (root && root.children) {

            const totals = root.children
                .map(c => c.total)

            let sum = 0
            if (totals && totals.length) {
                 sum = totals.reduce((a, b) => a + b)
            }

            root.total = root.parcels + sum

        }

    });

    // create a lookup to find the route node for given id, maybe a O(n) solution to this, for now recursion wins :(
    // its a one off process so should not be too bad of a performance hit

    let routeLookup = {}

    const updateParent = (children, root) => {

        if (!children || !children.length) {
            return
        }

        children.forEach(c => {
            routeLookup[c.id] = root
            updateParent(c.children, root)
        })
    }

    for (let key in roots) {
        updateParent(roots[key].children, key)
    }

    return [routeLookup, roots]
}

