import Image from "next/image";

interface EmptyProps {
	label: string;
}

export const Empty = ({ label }: EmptyProps) => {
	return (
		<div className="h-full p-20 flex flex-col items-center justify-center">
			<p className="text-muted-foreground text-sm text-center mb-4">{label}</p>
			<div className="relative h-64 w-72">
				<Image alt="Empty" src="/empty.png" fill />
			</div>
		</div>
	);
};