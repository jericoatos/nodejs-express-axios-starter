import express from "express"; 
const noSort = 0;
const ascending = 1;
const descending = 2;
let currentSort = 0;
let currentDirection = 'asc'; // default direction
let columnName;
let currentColumn="";


export const sortTable = async(req: express.Request, res: express.Response): Promise<void> => {
    columnName = req.body.column;
     currentSort = (currentSort + 1) % 3;

    if(currentColumn != columnName){
        currentSort = 0;
    }
    currentColumn = columnName;

    switch(currentSort){
        case ascending:
            console.log("ascending");
            currentDirection = "asc";
            console.log(currentDirection);
            break;
        case descending:
            console.log("descending");
            currentDirection= "desc";
            console.log(currentDirection);
            break;
        case noSort:
            console.log("noSort");
            currentDirection= null;
            console.log(currentDirection);
            break;
        default:
            console.log("");
            break;
    }
    console.log(`Sorting by ${columnName}, direction: ${currentDirection}`);
    res.redirect("/job-roles?sort=" + columnName + "%3A" + currentDirection);
}