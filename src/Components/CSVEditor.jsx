import React, { useState, useEffect } from "react";
import * as xlsx from "xlsx";
import csvtojson from "csvtojson";

function CsvEditor() {
	const [data, setData] = useState([]);
	const [confirmSave, setConfirmSave] = useState(false);

	useEffect(() => {
		if (confirmSave) {
			saveToExcel();
		}
	}, [data, confirmSave]);

	const handleFileChange = async (e) => {
		const file = e.target.files[0];

		const csvString = await file.text();
		const parsedData = await csvtojson().fromString(csvString);

		const processedData = parsedData.map((row) => processData(row));
		setData(processedData);
		setConfirmSave(true);

		console.log("Processed Data:");
		console.log(processedData);
	};

	const processData = (row) => {
		const teamName = row["Team Name"];

		let Player_1,
			Player_2,
			Player_1_InGame,
			Player_2_InGame,
			Email_P1,
			Email_P2,
			Discord_P1,
			Discord_P2,
			Game_Rank_P1,
			Game_Rank_P2,
			DOB_P1,
			DOB_P2;

		try {
			const playerNames = JSON.parse(row["full-name"]);
			Player_1 = playerNames[0];
			Player_2 = playerNames[1];
		} catch (error) {
			Player_1 = "N/A";
			Player_2 = "N/A";
			console.error("Error parsing full-name:", error);
		}

		try {
			const P_inGame = JSON.parse(row["In-game Name"]);
			Player_1_InGame = P_inGame[0];
			Player_2_InGame = P_inGame[1];
		} catch (error) {
			Player_1_InGame = "N/A";
			Player_2_InGame = "N/A";
			console.error("Error parsing In-game Name:", error);
		}
		try {
			const Mail = JSON.parse(row["email"]);
			Email_P1 = Mail[0];
			Email_P2 = Mail[1];
		} catch (error) {
			Email_P1 = "N/A";
			Email_P2 = "N/A";
			console.error("Error parsing email:", error);
		}
		try {
			const DisID = JSON.parse(row["Discord"]);
			Discord_P1 = DisID[0];
			Discord_P2 = DisID[1];
		} catch (error) {
			Discord_P1 = "N/A";
			Discord_P2 = "N/A";
			console.error("Error parsing email:", error);
		}
		try {
			const Rank = JSON.parse(row["In-game-rank"]);
			Game_Rank_P1 = Rank[0];
			Game_Rank_P2 = Rank[1];
		} catch (error) {
			Game_Rank_P1 = "N/A";
			Game_Rank_P2 = "N/A";
			console.error("Error parsing email:", error);
		}
		try {
			const Dob = JSON.parse(row["dob"]);
			DOB_P1 = Dob[0];
			DOB_P2 = Dob[1];
		} catch (error) {
			DOB_P1 = "N/A";
			DOB_P2 = "N/A";
			console.error("Error parsing email:", error);
		}

		const rowData = {
			teamName,
			Player_1,
			Player_2,
			Player_1_InGame,
			Player_2_InGame,
			Email_P1,
			Email_P2,
			Discord_P1,
			Discord_P2,
			Game_Rank_P1,
			Game_Rank_P2,
		};

		return rowData;
	};

	const saveToExcel = () => {
		const worksheet = xlsx.utils.json_to_sheet(data);
		const workbook = xlsx.utils.book_new();
		xlsx.utils.book_append_sheet(workbook, worksheet, "Data");
		const excelData = xlsx.write(workbook, { bookType: "xlsx", type: "array" });
		saveAsExcelFile(excelData, "output.xlsx");
		setConfirmSave(false);
	};

	const saveAsExcelFile = (data, filename) => {
		const blob = new Blob([data], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		});
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		a.click();
		window.URL.revokeObjectURL(url);
	};

	return (
		<div>
			<input type="file" onChange={handleFileChange} />
			{/* Render table or other UI components to display data */}
		</div>
	);
}

export default CsvEditor;
