import React from "react";
import logo from "../../assets/images/logo.svg";

const Loading = () => {
	return (
		<div
			style={{ height: "100vh" }}
			className="d-flex align-items-center justify-content-center"
		>
			<img src={logo} alt="logo" width={100} />
		</div>
	);
};

export default Loading;
