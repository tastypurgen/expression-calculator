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

module.exports = {
	expressionCalculator
}