let size;
let w;
let h;
let nodes;

let visPath = false;
let aStar;

function setup() {
    createCanvas(1000,1000);
    background(0);

    

    size = 50
    w = width / size;
    h = height / size;

    createNewGrid();

    let startButton = createButton("Start");
    startButton.mousePressed(() => {
        aStar = new AStar(nodes, nodes[0][0], nodes[size-1][size-1]);
        aStar.start();
    });

    let startVButton = createButton("Start Visual");
    startVButton.mousePressed(() => {
        aStar = new AStar(nodes, nodes[0][0], nodes[size-1][size-1]);
        visPath = true;
    });

    let newGridButton = createButton("New Grid");
    newGridButton.mousePressed(() => {
        createNewGrid();
    });

    let resetButton= createButton("Reset Grid");
    resetButton.mousePressed(() => {
        resetGrid();
    });
}

function createNewGrid() {
    nodes = new Array(size);
    for (let i = 0; i < size; i++) {
        nodes[i] = new Array(size);
    }

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            nodes[i][j] = new Node(w, h, i, j);
        }
    }

    nodes[0][0].colour = 5;
    nodes[size-1][size-1].colour = 6;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            nodes[i][j].calcNeighbours(nodes);
        }
    }
}

function resetGrid() {

    resetNodes = new Array(size);
    for (let i = 0; i < size; i++) {
        resetNodes[i] = new Array(size);
    }

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            resetNodes[i][j] = new Node(w, h, i, j, nodes[i][j]);
        }
    }

    resetNodes[0][0].colour = 5;
    resetNodes[size-1][size-1].colour = 6;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            resetNodes[i][j].calcNeighbours(resetNodes);
        }
    }

    nodes = resetNodes;

}

function draw() {

    if (visPath) {
        visPath = aStar.startInter();
    } else {
        if (aStar) {
            aStar.setPath();
        }
    }

    for (let i = 0; i < nodes.length; i++) {
            for (let j = 0; j < nodes[0].length; j++) {
            nodes[i][j].draw();
        }
    }
}