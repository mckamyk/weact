import {useState} from "preact/hooks"
import React from "react";

interface Foobar {
	test: string;
}

const DemoWidget: React.FC<Foobar> = ({test}: {test: string}) => {
	const [count, setCount] = useState(0);

	return (
		<div>
			<div>Hello from {test || "no prop"}!</div>

			<div>Count: {count}</div>
			<button onClick={() => setCount(count+1)}>Click Me!</button>
		</div>
	)
}

export default DemoWidget