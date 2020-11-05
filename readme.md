# Running the app

You will need minimum node js v 10.15.0 installed

1. Run npm install
2. Run npm start
3. Prompt will appear to enter company id

# Initial thoughts

Clear we are looking at a flat list of items that we want to create into a tree structure (unflatten)

## Points I need to be consious of:

Files could be quite large, so algorithm needs to take this into account . A recursive method would 
go in O(n^2) and we should aim to get this in O(n) if possible. My first thoughts are using a dictionary, 
utilising javascripts useful variable reference

My steps would be in the following order, will plan to take a TDD approach to this:

* My focus would be on the algorithm itself to convert a flat list into a tree
* Putting in the functionality to see children for root up to certain levels 
* My next step would be to add some functionality to read files
* Finally, wrap the whole thing into a packaged solution

* Gone a bit crazy with dictionaries here, it is my favourite data structure!


## Resources
 
was getting stuck post 3-4 hours with my O(n) dictionary approach and this provided great inspiration
* https://github.com/philipstanislaus/performant-array-to-tree
* https://attacomsian.com/blog/reading-a-file-line-by-line-in-nodejs

Some help with writing cli: 
* https://stackabuse.com/reading-a-file-line-by-line-in-node-js/
* https://nodejs.org/en/knowledge/command-line/how-to-prompt-for-command-line-input/

## Solution (see unFlatten.ts and main.ts) 

Assumptions:

There are no orphaned companies

Pseudo code: 

1. First build our data, so iterate through every item in the company relation file and create an array of company objects
2. Also go through the land parcels file and use yet another dictionary to map company to no of parcels
3. Create a dictionary lookup to reference the array position of company ids, for quick lookups
4. Our company class has a children of companies property to help generate our tree of nested arrays
5. As we go through our list update the children arrays as we go along, since we are referencing objects (use our lookup).
At the same time keep an eye on the total land parcels and update the root node
6. Our final root will have children referencing all the lookup items with their respective child arrays, add this root 
to a root array 
7. For a given node we need to know which is the root parent, for each route recursively go through and map each item
 to it's root node (another lookup). I believe there is a O(n) solution to this but over an hour on it I settled for this approach.
8. We can use our route lookup to find which root tree to print out.

## Scaling considerations

* some level of pre-processing that could be done overnight (e.g. land parcels). This would work well if the data is not changing that frequently. 
* or we could create cached outputs (e.g. store in redis) of trees. 
* You could 'listen' to updates to company data, parcels, sub company created etc. 
and have a CQRS setup that updates the data structure specific for ui in an async manner (giving the feel of real time updates). 
We would 'eventually' update the source data.


