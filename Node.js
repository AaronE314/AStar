
class Node {
    
    constructor(w, h, i, j, node) {
        
        this.i = node ? node.i : i;
        this.j = node ? node.j : j;
        this.w = node ? node.w : w;
        this.h = node ? node.h : h;

        this.parent = null;
        this.fscore = -1;
        this.gscore = -1;
        this.colour = 1;

        this.setWall(node);
        

    }

    setWall(node) {
        if (node && node.colour === -1) {
            this.colour = -1;
        } else if (!node && random(1) < 0.2) {
            this.colour = -1;
        }
    }

    calcNeighbours(grid) {
        this.neighbours = [];

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (this.i + i >= 0 && this.i + i < grid.length && this.j + j >= 0 && this.j + j < grid[0].length 
                    && grid[this.i + i][this.j + j].colour !== -1) {
                    this.neighbours.push(grid[this.i + i][this.j + j]);
                }
            }
        }
    }

    draw() {
        strokeWeight(2);
        stroke(0);

        switch (this.colour) {
            case 1:
                fill(255);
                break;
            case 2:
                fill('red');
                break;
            case 3:
                fill('green');
                break;
            case 4:
                fill('blue');
                break;
            case 5:
                fill('yellow');
                break;
            case 6:
                fill('orange');
                break;
            case -1:
                fill(0);
                break;
        
            default:
                break;
        }
        rect(this.w * this.i, this.h * this.j, this.w, this.h);
    }
}