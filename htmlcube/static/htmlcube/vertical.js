

function leftLeftColumn(){
  //get arrays of all elements that will 'move'

  direction = this.dataset.dir;
  facedirection = this.dataset.facedir;
  //the back left surface that will rotate.  The center square does not move.
  const face = [
    document.querySelector('#l1'),
    document.querySelector('#l2'),
    document.querySelector('#l3'),
    document.querySelector('#l4'),
    document.querySelector('#l6'),
    document.querySelector('#l7'),
    document.querySelector('#l8'),
    document.querySelector('#l9')
  ]

  //the horizontal row of squares that will shift left or right
  const column = [
    document.querySelector('#L1'),
    document.querySelector('#L4'),
    document.querySelector('#L7'),
    document.querySelector('#b7'),
    document.querySelector('#b4'),
    document.querySelector('#b1'),
    document.querySelector('#r9'),
    document.querySelector('#r6'),
    document.querySelector('#r3'),
    document.querySelector('#T1'),
    document.querySelector('#T4'),
    document.querySelector('#T7'),
  ]

  moveFace(face, facedirection);
  moveRow(column, direction);

}

function leftMiddleColumn(){
  //get arrays of all elements that will 'move'

  direction = this.dataset.dir;


  //the horizontal row of squares that will shift left or right
  const column = [
    document.querySelector('#L2'),
    document.querySelector('#L5'),
    document.querySelector('#L8'),
    document.querySelector('#b8'),
    document.querySelector('#b5'),
    document.querySelector('#b2'),
    document.querySelector('#r8'),
    document.querySelector('#r5'),
    document.querySelector('#r2'),
    document.querySelector('#T2'),
    document.querySelector('#T5'),
    document.querySelector('#T8'),
  ]

  moveRow(column, direction);
}

function leftRightColumn(){
  //get arrays of all elements that will 'move'

  direction = this.dataset.dir;
  facedirection = this.dataset.facedir;
  //the back left surface that will rotate.  The center square does not move.
  const face = [
    document.querySelector('#R1'),
    document.querySelector('#R2'),
    document.querySelector('#R3'),
    document.querySelector('#R4'),
    document.querySelector('#R6'),
    document.querySelector('#R7'),
    document.querySelector('#R8'),
    document.querySelector('#R9')
  ]

  //the horizontal row of squares that will shift left or right
  const column = [
    document.querySelector('#L3'),
    document.querySelector('#L6'),
    document.querySelector('#L9'),
    document.querySelector('#b9'),
    document.querySelector('#b6'),
    document.querySelector('#b3'),
    document.querySelector('#r7'),
    document.querySelector('#r4'),
    document.querySelector('#r1'),
    document.querySelector('#T3'),
    document.querySelector('#T6'),
    document.querySelector('#T9'),
  ]

  moveFace(face, facedirection);
  moveRow(column, direction);

}

function rightRightColumn(){
  //get arrays of all elements that will 'move'

  direction = this.dataset.dir;
  facedirection = this.dataset.facedir;
  //the back left surface that will rotate.  The center square does not move.
  const face = [
    document.querySelector('#r1'),
    document.querySelector('#r2'),
    document.querySelector('#r3'),
    document.querySelector('#r4'),
    document.querySelector('#r6'),
    document.querySelector('#r7'),
    document.querySelector('#r8'),
    document.querySelector('#r9')
  ]

  //the horizontal row of squares that will shift left or right
  const column = [
    document.querySelector('#R3'),
    document.querySelector('#R6'),
    document.querySelector('#R9'),
    document.querySelector('#b3'),
    document.querySelector('#b2'),
    document.querySelector('#b1'),
    document.querySelector('#l7'),
    document.querySelector('#l4'),
    document.querySelector('#l1'),
    document.querySelector('#T1'),
    document.querySelector('#T2'),
    document.querySelector('#T3'),
  ]

  moveFace(face, facedirection);
  moveRow(column, direction);

}

function rightLeftColumn(){
  //get arrays of all elements that will 'move'

  direction = this.dataset.dir;
  facedirection = this.dataset.facedir;
  //the back left surface that will rotate.  The center square does not move.
  const face = [
    document.querySelector('#L1'),
    document.querySelector('#L2'),
    document.querySelector('#L3'),
    document.querySelector('#L4'),
    document.querySelector('#L6'),
    document.querySelector('#L7'),
    document.querySelector('#L8'),
    document.querySelector('#L9')
  ]

  //the horizontal row of squares that will shift left or right
  const column = [
    document.querySelector('#R1'),
    document.querySelector('#R4'),
    document.querySelector('#R7'),
    document.querySelector('#b9'),
    document.querySelector('#b8'),
    document.querySelector('#b7'),
    document.querySelector('#l9'),
    document.querySelector('#l6'),
    document.querySelector('#l3'),
    document.querySelector('#T7'),
    document.querySelector('#T8'),
    document.querySelector('#T9'),
  ]

  moveFace(face, facedirection);
  moveRow(column, direction);

}

function rightMiddleColumn(){
  //get arrays of all elements that will 'move'

  direction = this.dataset.dir;


  //the horizontal row of squares that will shift left or right
  const column = [
    document.querySelector('#R2'),
    document.querySelector('#R5'),
    document.querySelector('#R8'),
    document.querySelector('#b6'),
    document.querySelector('#b5'),
    document.querySelector('#b4'),
    document.querySelector('#l8'),
    document.querySelector('#l5'),
    document.querySelector('#l2'),
    document.querySelector('#T4'),
    document.querySelector('#T5'),
    document.querySelector('#T6'),
  ]

  moveRow(column, direction);
}
