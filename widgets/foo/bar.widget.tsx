import {useState} from "preact/hooks";

const FooWidget = () => {
	const [count, setCount] = useState(0);

	return (
		<div>
			<div>Hello from FooWidget!</div>

			<div>Count: {count}</div>
			<button onClick={() => setCount(count+1)}>Click Me!</button>
		</div>
	)
}

export default FooWidget