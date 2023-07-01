import {useState} from "preact/hooks"
import type {FC} from "react";
import Child from './child'
import "./tw.css";

interface Foobar {
	test: string;
}

const DemoWidget: FC<Foobar> = ({test}: {test: string}) => {
	const [count, setCount] = useState(0);

	return (
		<div className="bg-red-400">
			<div>Hello from {test || "no prop"}!</div>

			<div>Count: {count}</div>
			<button onClick={() => setCount(count+1)}>Click Me!</button>
			<Child me="from parent" />
		</div>
	)
}

export default DemoWidget;