import React, { useState } from "react";

export const DemoWidget = () => {
	const [count, setCount] = useState(0);

	return (
		<div>
			<div>Hello from React!</div>

			<div>Count: {count}</div>
			<button onClick={() => setCount(count+1)}>Click Me!</button>
		</div>
	)
}