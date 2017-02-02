/*
filename: main.js

purpose: controls the program.

created by: Vu Anh Tuan Nguyen

created on: 08/11/2016

last edited: 14/11/2016

*/

var OPERATORS = {
  DIVIDE: '/',
  MULTIPLY: '*',
  SUBTRACT: '-',
  PLUS: '+',
  SQRT: 'sqrt',
  POW: 'pow'
};

angular.module('app', [])
.controller('CalculatorController', ['$scope', function ($scope) {

  $scope.clear = function() {
    // First and second holding value
    $scope.num1 = null;
    $scope.num2 = null;

    // Bind to the output display
    $scope.output = '0';

    // Current holding operator
    $scope.operator = '';

    // Previous operator
    $scope.previousOperator = '';

    // Use for evaluate whether to start a new number in the output or concatenate
    $scope.isFirstDigit = true;
  };

  // Calculate the result
  // isCalculateOperation: use for evaluate whether user press '=' button or 'operator' button
  $scope.calculate = function(isCalculateOperation) {
    var operator = $scope.operator;
$scope.test='';$scope.test2='';
    if (isCalculateOperation) //when users clicked = button
	{
      if ($scope.operator)//dung khi khac '' 
	  {
        $scope.num2 = Number($scope.output); 
		//$scope.test='1';$scope.test2='1';$scope.test3='a';
      } else if ($scope.previousOperator) //done at least 1 success operation be4, by clicking = button, then does another operation
	  {
        $scope.num1 = Number($scope.output);
        $scope.operator = $scope.previousOperator; //for keeping press = button 
//		$scope.test='2';$scope.test2='2';
      } else //when click button but haven't inputed numbers.
	  {
        $scope.num1 = Number($scope.output);
      }
    } 
	else {$scope.test='4';   //when click one of operators( + - x /...)
      if ($scope.isFirstDigit) {//check have numbers yet?
        return; //return when have not numbers
      }
			//check number1 is exist yet?
      if (!$scope.operator) { //if not storge to number1
        $scope.num1 = Number($scope.output); 
        return;
      } else { //if yes storge to number2
        $scope.num2 = Number($scope.output);
      }
    }
	
//start calculate
    if ($scope.operator && $scope.num2 != null)  //check have 2 numbers and have an operator
	{
      switch ($scope.operator) {
        case OPERATORS.PLUS:
          $scope.num1 = $scope.num1 + $scope.num2;
          break;
        case OPERATORS.SUBTRACT:
          $scope.num1 = $scope.num1 - $scope.num2;
          break;
        case OPERATORS.MULTIPLY:
          $scope.num1 = $scope.num1 * $scope.num2;
          break;
        case OPERATORS.DIVIDE:
          $scope.num1 = $scope.num1 / $scope.num2;
          break;
        case OPERATORS.POW:
          $scope.num1 = (Math.pow($scope.num1, $scope.num2));
//		  $scope.num1=Number($scope.num1);
          break;
      }//finish calculate. prepare for new operation. AND Showing output		
      $scope.previousOperator = $scope.operator;
      $scope.operator = '';
	  $scope.num1=(Number($scope.num1)).toPrecision(11);
      $scope.output=Number( $scope.num1).toString();
    }	 
  };
//start clickNuumber function- getting number from button'c clicking.
  $scope.clickNumber = function(num) {
    $scope.isFirstDigit = ($scope.output === '0' || $scope.isFirstDigit);  
    if ($scope.isFirstDigit) {						//check firstDigit or Not. or O
    	$scope.output = num.toString();
    	$scope.isFirstDigit = false;					
    } else {										//second digit will be added 
    	if ($scope.output.length<11) {
  $scope.output += num.toString();}
    }
  };
//start clickDot- add dot to output
  $scope.clickDot = function(num) {
    $scope.checkIndex=$scope.output.indexOf('.') ;
	if ($scope.output.indexOf('.') === -1) //check '.' does EXISTt?
	{
     $scope.output =$scope.output+""+ '.';
     $scope.isFirstDigit = false;
    }
  };
  
  //start clickNegative fuction  
$scope.clickNegative = function(num) {
    if($scope.output!='0' && isFinite($scope.output))// avoid 0 and infinity
	{
      $scope.output=-Number($scope.output).toString();
      $scope.isFirstDigit = false;  
	}
  };
  //start clickDivide function
$scope.clickDivide = function() {
    $scope.calculate(false);
    $scope.operator = OPERATORS.DIVIDE;
    $scope.isFirstDigit = true;
  };
  //start clickMultiply function
  $scope.clickMultiply = function() {
    $scope.calculate(false);
    $scope.operator = OPERATORS.MULTIPLY;
    $scope.isFirstDigit = true;
  };
//start clickSubtract function
  $scope.clickSubtract = function() {
    $scope.calculate(false);
    $scope.operator = OPERATORS.SUBTRACT;
    $scope.isFirstDigit = true;
  };
//start clickPlus function
  $scope.clickPlus = function() {
    $scope.calculate(false);
    $scope.operator = OPERATORS.PLUS;
    $scope.isFirstDigit = true;
  };
//start clickSqrt function
  $scope.clickSqrt = function() {
    $scope.output = Number(Math.sqrt($scope.output).toPrecision(11));// formats a number to 11 length
    $scope.isFirstDigit = true;
  };
//start clickPow function
  $scope.clickPow = function() {
    $scope.calculate(false);
    $scope.operator = OPERATORS.POW;
    $scope.isFirstDigit = true;
  };
//start clickCalculate function
  $scope.clickCalculate = function() {
    $scope.calculate(true);
    $scope.isFirstDigit = true;
  };
  
  $scope.clear();


}])

.directive('outPut', function () {
	return {
		template: '{{output}}'
	};
});
;
