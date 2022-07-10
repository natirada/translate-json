import React, { useEffect, useCallback, useState } from "react";
import querystring from "querystring";
import fileDownload from "js-file-download";

import { instance } from "./middleware";
import { useDropzone } from "react-dropzone";
import "./App.css";
import Chart from "./Chart/Chart";


function App() {
	const [obj, setObj] = useState(false);
	const [isLoading, setisLoading] = useState(false);

	useEffect(() => {
		if (obj) {
			const blob = new Blob([JSON.stringify(obj, null, 2)], {
				type: "application/json",
			});
			fileDownload(blob, "ar.json");
			setisLoading(false);
		}
	}, [obj]);

	const onDrop = useCallback(async (acceptedFiles) => {
		try {
			setisLoading(true);

			let translateObj = {};
			const file = acceptedFiles[0];
			if (file.type === "application/json") {
				const res = await file.text();
				const jsonTarget = JSON.parse(res);

				for (let key in jsonTarget) {
					const data = querystring.stringify({
						text: jsonTarget[key],
						options: 4,
					});
					const translateRes = await instance.post("", data);
					translateObj[key] = translateRes.data.text[0];
				}
				setObj(translateObj);
			}
		} catch (error) {
			console.log({ error });
			setisLoading(false);
		}
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<div className="App">
			<Chart />
			{/* <div {...getRootProps()} className="DragDropContainer">
				<input {...getInputProps()} />
				{isLoading ? (
					<h5>Loading...</h5>
				) : isDragActive ? (
					<p>Drop the files here ...</p>
				) : (
					<p>Drag 'n' drop some files here, or click to select files</p>
				)}
			</div> */}
		</div>
	);
}

export default App;
