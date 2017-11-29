// enumerate the neighbors of a given *mortar* segment.

function neighbors(id) {
  const coords = id.substring(1);
  const col = parseInt(coords.split("-")[0]);
  const row = parseInt(coords.split("-")[1]);
  if (id.charAt(0) === 'H') {
    return horizontalNeighbors(col, row);
  } else {
    return verticalNeighbors(col, row);
  }
}

function horizontalNeighbors(col, row) {
  const result = [
    document.getElementById("H" + (col - 1) + "-" + row),
    document.getElementById("H" + (col + 1) + "-" + row)
  ];

  if (row % 2 === 0) {
    if (col % 2 === 0) {
      result.push(
          document.getElementById("V" + (col / 2 + 1) + "-" + (row - 1)),
          document.getElementById("V" + (col / 2) + "-" + row)
      );
    } else {
      result.push(
          document.getElementById("V" + ((col + 1) / 2) + "-" + (row - 1)),
          document.getElementById("V" + ((col + 1) / 2) + "-" + row)
      )
    }
  } else {
    if (col % 2 === 0) {
      result.push(
          document.getElementById("V" + (col / 2) + "-" + (row - 1)),
          document.getElementById("V" + ((col / 2) + 1) + "-" + row)
      )
    } else {
      result.push(
          document.getElementById("V" + ((col + 1) / 2) + "-" + (row - 1)),
          document.getElementById("V" + ((col + 1) / 2) + "-" + row)
      )
    }
  }

  return result;
}

function verticalNeighbors(col, row) {
  const neighborCols = row % 2 === 0
      ? [col * 2 - 1, col * 2]
      : [col * 2 - 2, col * 2 - 1];
  return neighborCols.map((c) => {
    return [
        document.getElementById("H" + c + "-" + row),
        document.getElementById("H" + c + "-" + (row + 1)),
    ]
  }).reduce((a, b) => a.concat(b));
}
