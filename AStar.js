

class AStar {

    constructor(grid, start, end) {
        this.grid = grid;
        this.startNode = start;
        this.endNode = end;
        
        this.startNode.fscore = this.h(this.startNode);
        this.open = [this.startNode];
        this.closed = [];
    }

    start() {
        
        let current;
        while (this.open.length > 0) {
            current = this.removesmallest(this.open);

            if (current === this.endNode) {
                return;
            }

            this.closed.push(current);
            if (current !== this.endNode && current !== this.startNode) {
                current.colour = 3;
            }

            for (let i = 0; i < current.neighbours.length; i++) {

                let neighbour = current.neighbours[i];
                if (neighbour.colour === 3) {
                    continue;
                }

                let tempG = current.gscore + this.dist(current, neighbour);

                if (neighbour.colour !== 2) {
                    this.open.push(neighbour);
                    if (neighbour !== this.endNode && neighbour !== this.startNode) {
                        neighbour.colour = 2;
                    }
                } else if (tempG >= neighbour.gscore) {
                    continue;
                }

                neighbour.parent = current;
                neighbour.gscore = tempG;
                neighbour.fscore = neighbour.gscore + this.h(neighbour);
                
            }

        }

        this.setPath();
    }

    setPath() {

        let node = this.endNode;
        while (node !== this.startNode) {
            if (node !== this.endNode && node !== this.startNode) {
                node.colour = 4;
            }
            node = node.parent;
        }
    }

    startInter() {
        
        if (this.open.length > 0) {
            let current = this.removesmallest(this.open);

            if (current === this.endNode) {
                return false;
            }

            this.closed.push(current);
            if (current !== this.endNode && current !== this.startNode) {
                current.colour = 3;
            }

            for (let i = 0; i < current.neighbours.length; i++) {

                let neighbour = current.neighbours[i];
                if (neighbour.colour === 3) {
                    continue;
                }

                let tempG = current.gscore + this.dist(current, neighbour);

                if (neighbour.colour !== 2) {
                    this.open.push(neighbour);
                    if (neighbour !== this.endNode && neighbour !== this.startNode) {
                        neighbour.colour = 2;
                    }
                } else if (tempG >= neighbour.gscore) {
                    continue;
                }

                neighbour.parent = current;
                neighbour.gscore = tempG;
                neighbour.fscore = neighbour.gscore + this.h(neighbour);
                
            }

        } else {
            this.setPath();
        }

        return true;
    }

    removesmallest(nodes) {
        if (nodes.length === 0) {
            return -1;
        }

        let min = 0;

        for (let i = 1; i < nodes.length; i++) {
            if (nodes[min].fscore > nodes[i].fscore) {
                min = i;
            }
        }

        return nodes.splice(min,1)[0];
    }

    dist(node1, node2) {
        if (node1.i !== node2.i && node1.j !== node2.j) {
            return 1.4;
        } else {
            return 1;
        }
    }

    h(node) {
        return Math.sqrt(Math.pow(node.i-this.endNode.i,2) + Math.pow(node.j-this.endNode.j,2));
    }
}