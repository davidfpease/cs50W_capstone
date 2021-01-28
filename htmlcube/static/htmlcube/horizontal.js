
//rotates a row OR a column of squares dependent upon the direction 'dir'
//takes an array of button elements, direction of rotation as a 0 or 1, and the button ID
function moveRow(squares, dir){
  let colors = [];

  //gather initial colors and their postions
  for ( x of squares){
    colors.push(x.style.backgroundColor);
  }

  //re-arrange the array depending on direction of spin
  if (dir == 0){
    colors = colors.concat(colors.splice(0,3));
  }
  else if (dir == 1) {
    colors = colors.splice(colors.length-3,3).concat(colors);
  }

  //re-assign background colors
  for (i=0; i<squares.length; i++){
    squares[i].style.backgroundColor = colors[i];
  }


  //log the resulting arrangement of squares
  snapshot(true);



}

function moveFace(squares, dir){
  let colors = [];
  let shiftedColors = [];
  //gather initial colors and their positions
  for (x of squares){
    colors.push(x.style.backgroundColor);
  }

  //rearrange the array depending on direction of spin
  if (dir == 0){
    shiftedColors = [
      colors[5],
      colors[3],
      colors[0],
      colors[6],
      colors[1],
      colors[7],
      colors[4],
      colors[2],
    ]
  } else if (dir == 1){
    shiftedColors = [
      colors[2],
      colors[4],
      colors[7],
      colors[1],
      colors[6],
      colors[0],
      colors[3],
      colors[5],
    ];
  }

  //re-assign background colors
  for (i=0; i<squares.length; i++){
    squares[i].style.backgroundColor = shiftedColors[i];
  }

}

function topRow(){
  //get arrays of all elements that will 'move'

  direction = this.dataset.dir;
  facedirection = this.dataset.facedir;
  //the top surface that will rotate.  The center square does not move.
  const face = [
    document.querySelector('#T1'),
    document.querySelector('#T2'),
    document.querySelector('#T3'),
    document.querySelector('#T4'),
    document.querySelector('#T6'),
    document.querySelector('#T7'),
    document.querySelector('#T8'),
    document.querySelector('#T9')
  ]

  //the horizontal row of squares that will shift left or right
  const row = [
    document.querySelector('#L1'),
    document.querySelector('#L2'),
    document.querySelector('#L3'),
    document.querySelector('#R1'),
    document.querySelector('#R2'),
    document.querySelector('#R3'),
    document.querySelector('#r1'),
    document.querySelector('#r2'),
    document.querySelector('#r3'),
    document.querySelector('#l1'),
    document.querySelector('#l2'),
    document.querySelector('#l3'),
  ]

  moveFace(face, facedirection);
  moveRow(row, direction);

}

function middleRow(){
  direction = this.dataset.dir;
  //the horizontal row of squares that will shift left or right
  const row = [
    document.querySelector('#L4'),
    document.querySelector('#L5'),
    document.querySelector('#L6'),
    document.querySelector('#R4'),
    document.querySelector('#R5'),
    document.querySelector('#R6'),
    document.querySelector('#r4'),
    document.querySelector('#r5'),
    document.querySelector('#r6'),
    document.querySelector('#l4'),
    document.querySelector('#l5'),
    document.querySelector('#l6'),
  ];

  moveRow(row, direction);
}

function bottomRow(){
  //get arrays of all elements that will 'move'

  direction = this.dataset.dir;
  facedirection = this.dataset.facedir;
  //the top surface that will rotate.  The center square does not move.
  const face = [
    document.querySelector('#b1'),
    document.querySelector('#b2'),
    document.querySelector('#b3'),
    document.querySelector('#b4'),
    document.querySelector('#b6'),
    document.querySelector('#b7'),
    document.querySelector('#b8'),
    document.querySelector('#b9')
  ]

  //the horizontal row of squares that will shift left or right
  const row = [
    document.querySelector('#L7'),
    document.querySelector('#L8'),
    document.querySelector('#L9'),
    document.querySelector('#R7'),
    document.querySelector('#R8'),
    document.querySelector('#R9'),
    document.querySelector('#r7'),
    document.querySelector('#r8'),
    document.querySelector('#r9'),
    document.querySelector('#l7'),
    document.querySelector('#l8'),
    document.querySelector('#l9'),
  ]

  moveFace(face, facedirection);
  moveRow(row, direction);

}
