/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({n:n});
  result = [];
  var helperFunction = function(rowIterator, columnIterator){
  if(rowIterator < board.rows().length && columnIterator < board.rows().length){
    board.togglePiece(rowIterator, columnIterator);
    if(board.hasAnyColConflicts()){
      board.togglePiece(rowIterator, columnIterator);
      var tempColIterator = columnIterator+1;
      var tempRowIterator = rowIterator;
      helperFunction(tempRowIterator,tempColIterator);
    }else{
      var tempColIterator = columnIterator;
      var tempRowIterator = rowIterator+1;
      helperFunction(tempRowIterator,tempColIterator);
    }
  }else{
    return;
  }
  }
  helperFunction(0,0);
  return board.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  let board = new Board({n:n});
  let helper = function(row){
    if(row===n){//check if we have traversed all rows
      solutionCount = solutionCount+1;// increase solution count;
      return;
    }
      if(row < n){
        for(var i=0; i<board.rows().length; i++){
          board.togglePiece(row, i);
          if(!board.hasAnyColConflicts()){
            var rowTemp = row + 1;
            helper(rowTemp);
          }
          board.togglePiece(row, i);
        }
      }
  }
  helper(0);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme
  let board = new Board({ n: n });
  let toggleBoard = function (counter) {
  if (counter === n) {
    return board;
  }
    if (counter < board.rows().length) {
        for (let i = 0; i < board.rows().length; i++) {
          board.togglePiece(counter, i);
          counter++;
          if (!(board.hasAnyQueensConflicts())) {
            var saved = toggleBoard(counter);
            if (saved !== null) {
              return saved;
            }
          }
          counter--;
          board.togglePiece(counter, i);
        }
      }
      return null;
    }
    toggleBoard(0);
    return board.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  let board = new Board({n:n});
  let helper = function(row){
    if(row===n){//check if we have traversed all rows
      solutionCount = solutionCount+1;// increase solution count;
      return;
    }
    if(row < n){
      for(var i=0; i<board.rows().length; i++){
        board.togglePiece(row, i);
        if(!board.hasAnyQueensConflicts()){
          var rowTemp = row + 1;
          helper(rowTemp);
        }
        board.togglePiece(row, i);
      }
    }
  }
  helper(0);
  return solutionCount;
};
