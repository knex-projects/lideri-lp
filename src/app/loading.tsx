import background from "@/public/assets/images/loading/background.png";
import foreground from "@/public/assets/images/loading/foreground.png";
import "@/public/assets/css/loading.css";

function LoaderGraphic({ size = "w-[100px]" }: { size?: string }) {
	return (
		<div className={`relative ${size} aspect-square`}>
			<img className="absolute inset-0 h-full w-full object-contain rotate" src={background.src} alt="logo background" />
			<img className="absolute inset-0 h-full w-full object-contain" src={foreground.src} alt="logo foreground" />
		</div>
	)
}

function Loading() {
	return <LoaderGraphic size="w-[35px]" />
}

function FullscreenLoading() {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgb(19,23,55)] transition-opacity duration-1000">
			<LoaderGraphic size="w-[100px]" />
		</div>
	)
}

export default FullscreenLoading