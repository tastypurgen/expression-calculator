function eval() {
	// Do not use eval!!!
	return;
}

function expressionCalculator(expr) {
	const priority = {
		'+': 1,
		'-': 1,
		'*': 2,
		'/': 2
	}
	const doMath = {
		'(': (a, b) => (a, b),
		'+': (a, b) => a + b,
		'-': (a, b) => a - b,
		'*': (a, b) => a * b,
		'/': (a, b) => {
			if (b == 0) throw new Error('TypeError: Division by zero.');
			return a / b;
		}
	}
	let nums = []
	let stack = []

	expr = expr.replace(/\s+/g, '').match(/[^-+*/()]+|[^]/g)

	for (let i = 0; i <= expr.length; i++) {
		let current = expr[i]
		let prevStack = stack.slice(stack.length - 1)
		//check number
		if (!isNaN(current)) nums.push(+current)
		else {
			if (current == '(') stack.push(current)
			else if (prevStack == '(' && current != ')') stack.push(current)
			// check empty array and priority
			else if (stack.length == 0 || priority[stack.slice(stack.length - 1, stack.length)] < priority[current]) {
				stack.push(current)
			} else if (current == ')') {
				if (prevStack == '(') {
					stack.pop()
					continue
				}
				let prevNums = []
				prevNums.push(nums.pop(), nums.pop())
				prevNums = doMath[prevStack](prevNums[1], prevNums[0])
				nums.push(prevNums)
				stack.pop()
				i--
			} else {
				let prevNums = []
				let currentStack = stack.pop()
				prevNums.push(nums.pop(), nums.pop())
				if (currentStack == ')') throw new Error('ExpressionError: Brackets must be paired')
				prevNums = doMath[currentStack](prevNums[1], prevNums[0])
				nums.push(prevNums)
				i--
			}
		}
	}
	if (stack[0] != '(') return nums[0]
	else throw new Error('ExpressionError: Brackets must be paired')
}

// function expressionCalculator(expr) {

// 	expr = expr.replace(/\s+/g, '').match(/[^-]+|-/g)

// 	console.log(expr)

// 	const operators = {
// 		'*': function multiply(a, b) {
// 			return a * b
// 		},
// 		'/': function divide(a, b) {
// 			return a / b
// 		},
// 		'+': function plus(a, b) {
// 			return a + b
// 		},
// 		'-': function minus(a, b) {
// 			return a - b
// 		},
// 		'(': function open(a, b) {
// 			return a - b
// 		},
// 		')': function close(a, b) {
// 			return a - b
// 		},
// 	}

// 	const priority = {
// 		'+': 1,
// 		'-': 1,
// 		'*': 2,
// 		'/': 2
// 	}

// 	let nums = []
// 	let stack = []
// 	let solution = []
// 	for (let i = 0; i < expr.length; i++) {
// 		if (!isNaN(Number(expr[i]))) {
// 			nums.push(expr[i])
// 		} else {
// 			if (stack.length == 0) stack.push(expr[i])
// 			else {
// 				if (priority[stack[stack.length - 1]] > priority[expr[i]]) {
// 					nums.push(stack[stack.length - 1])
// 					stack.pop()
// 					stack.push(expr[i])
// 				} else {

// 				}
// 			}
// 		}
// 	}
// 	nums.push(...stack)
// 	for (let i = 0; i < nums.length; i++) {
// 		if (!isNaN(nums[i])) solution.push(nums[i])
// 		else {
// 			solution = [operators[nums[i]](Number(solution[0]), Number(solution[1]))]
// 		}
// 	}

// 	return solution[0]
// }

module.exports = {
	expressionCalculator
}