import { useRef } from "preact/hooks";

interface ChildProps {
	me: string
}

export default function Child({me}: ChildProps) {
	const ref = useRef<HTMLDivElement>(null);

	const throwEvent = () => {
		const ce = new CustomEvent("foo", {
			detail: 'hi',
			bubbles: true,
			composed: true
		})

		ref.current?.dispatchEvent(ce);
	}

	return (
		<div ref={ref}>
			This is a child component: {me}
			<button onClick={throwEvent}>Throw Event</button>
		</div>
	)
}