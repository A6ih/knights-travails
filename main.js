const adjacencyList = new Map();

function addNode(node) {
  adjacencyList.set(node, new Set());
}

function addEdge(node1, node2) {
  adjacencyList.get(node1).add(node2);
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

  return adjacencyList;
}

function gameBoard(start, end) {
  if (adjacencyList.has(start.toString())) return;

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

  adjacencyList.get(start.toString()).forEach((element) => {
    gameBoard(element.split(",").map(Number), end);
  });

  return;
}

console.log(knightMoves([0, 0], [3, 3]));
