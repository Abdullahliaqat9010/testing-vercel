import { Scrollbars } from "react-custom-scrollbars";

const renderThumb = ({ style, ...props }) => {
	const thumbStyle = {
		borderRadius: 4,
		width: 5,
		backgroundColor: "rgb(200, 200, 200)",
	};
	return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

export const CustomScrollbar = (props) => (
	<Scrollbars
		style={{ height: window.innerHeight }}
		renderThumbHorizontal={renderThumb}
		renderThumbVertical={renderThumb}
		autoHide={true}
		{...props}
		ref={(ref) => {
			if (props?.scrollToBottom) {
				ref?.scrollToBottom();
			}
		}}
	/>
);
