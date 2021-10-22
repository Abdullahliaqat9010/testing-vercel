import moment from "moment";

const Comment = ({ comment }) => {
    console.log("ad", comment)
	return (
		<div
			style={{
				backgroundColor: "white",
				width: "100%",
				display: "flex",
				flexDirection: "row",
				padding: 15,
				marginTop: 15,
				borderRadius: 5,
			}}
		>
			<img
				src={"https://picsum.photos/200"}
				style={{ width: 40, height: 40, borderRadius: 20 }}
			/>
			<div style={{ width: "100%" }}>
				<div
					style={{
						flexDirection: "row",
						display: "flex",
						justifyContent: "space-between",
						width: "100%",
						paddingLeft: 20,
					}}
				>
					<div style={{ color: "#6c768f", fontWeight: "bold" }}>
						{comment?.name}
					</div>
					<div style={{ color: "#8f99b4", fontSize: 14 }}>
						{moment(comment?.createdAt).fromNow()}
					</div>
				</div>
				<div style={{ padding: "10px 20px", width: "100%" }}>
					<p>{comment?.comment}</p>
				</div>
			</div>
		</div>
	);
};

export default Comment