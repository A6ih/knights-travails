const graph = new Map();

function addNode(node) {
  graph.set(node, new Set());
}

function addEdge(node1, node2) {
  graph.get(node1).add(node2);
}

function knightMoves(start, end) {
  if (
    start[0] < 0 ||
    start[1] < 0 ||
    start[0] > 7 ||
    start[1] > 7 ||
    end[0] < 0 ||
    end[1] < 0 ||
    end[0] > 7 ||
    end[1] > 7
  ) {
    return;
  }

  const startNode = start;

  gameBoard(startNode, end);

  const path = search(graph, start.toString(), end.toString());

  console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
  path.forEach((path) => console.log(path.split(",").map(Number)));
}

function gameBoard(start, end) {
  if (graph.has(start.toString())) return;

  if (
    start[0] < 0 ||
    start[1] < 0 ||
    start[0] > 7 ||
    start[1] > 7 ||
    end[0] < 0 ||
    end[1] < 0 ||
    end[0] > 7 ||
    end[1] > 7
  ) {
    return;
  }

  if (!start) return;

  if (start[0] === end[0] && start[1] === end[1]) return;

  addNode(start.toString());

  const possibleDirection = [
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
  ];

  for (let i = 0; i < possibleDirection.length; i++) {
    if (
      start[0] + possibleDirection[i][0] > 7 ||
      start[0] + possibleDirection[i][0] < 0 ||
      start[1] + possibleDirection[i][1] < 0 ||
      start[1] + possibleDirection[i][1] > 7
    ) {
      // do nothing
    } else {
      addEdge(
        start.toString(),
        [
          start[0] + possibleDirection[i][0],
          start[1] + possibleDirection[i][1],
        ].toString()
      );
    }
  }

  graph.get(start.toString()).forEach((element) => {
    gameBoard(element.split(",").map(Number), end);
  });

  return;
}

function search(adjacencyList, start, end) {
  const cameFrom = new Map();
  cameFrom.set(start, null);
  const queue = [start];
  while (queue.length > 0) {
    const currentNode = queue.shift();
    if (currentNode === end) return retracePath(cameFrom, end);
    const childNodes = adjacencyList.get(currentNode);
    for (const child of childNodes) {
      if (!cameFrom.has(child)) {
        cameFrom.set(child, currentNode);
        queue.push(child);
      }
    }
  }
}

function retracePath(cameFrom, node) {
  const path = [];
  while (cameFrom.has(node)) {
    path.push(node);
    node = cameFrom.get(node);
  }
  return path.reverse();
}

knightMoves([0,0],[7,7]);
