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
			Player_3,
			Player_4,
			Player_5,
			Player_6,
			Player_1_InGame,
			Player_2_InGame,
			Player_3_InGame,
			Player_4_InGame,
			Player_5_InGame,
			Player_6_InGame,
			Email_P1,
			Email_P2,
			Email_P3,
			Email_P4,
			Email_P5,
			Email_P6,
			Discord_P1,
			Discord_P2,
			Discord_P3,
			Discord_P4,
			Discord_P5,
			Discord_P6,
			Game_Rank_P1,
			Game_Rank_P2,
			Game_Rank_P3,
			Game_Rank_P4,
			Game_Rank_P5,
			Game_Rank_P6,
			DOB_P1,
			DOB_P2,
			DOB_P3,
			DOB_P4,
			DOB_P5,
			DOB_P6,
			Phone_P1,
			Phone_P2,
			Phone_P3,
			Phone_P4,
			Phone_P5,
			Phone_P6;

		try {
			const playerNames = JSON.parse(row["full-name"]);
			Player_1 = playerNames[0];
			Player_2 = playerNames[1];
			Player_3 = playerNames[2];
			Player_4 = playerNames[3];
			Player_5 = playerNames[4];
			Player_6 = playerNames[5];
		} catch (error) {
			Player_1 = "N/A";
			Player_2 = "N/A";
			Player_3 = "N/A";
			Player_4 = "N/A";
			Player_5 = "N/A";
			Player_6 = "N/A";
			// console.error("Error parsing full-name:", error);
		}

		try {
			const P_inGame = JSON.parse(row["In-game Name"]);
			Player_1_InGame = P_inGame[0];
			Player_2_InGame = P_inGame[1];
			Player_3_InGame = P_inGame[2];
			Player_4_InGame = P_inGame[3];
			Player_5_InGame = P_inGame[4];
			Player_6_InGame = P_inGame[5];
		} catch (error) {
			Player_1_InGame = "N/A";
			Player_2_InGame = "N/A";
			Player_3_InGame = "N/A";
			Player_4_InGame = "N/A";
			Player_5_InGame = "N/A";
			Player_6_InGame = "N/A";
			// console.error("Error parsing In-game Name:", error);
		}
		try {
			const Mail = JSON.parse(row["email"]);
			Email_P1 = Mail[0];
			Email_P2 = Mail[1];
			Email_P3 = Mail[2];
			Email_P4 = Mail[3];
			Email_P5 = Mail[4];
			Email_P6 = Mail[5];
		} catch (error) {
			Email_P1 = "N/A";
			Email_P2 = "N/A";
			Email_P3 = "N/A";
			Email_P4 = "N/A";
			Email_P5 = "N/A";
			Email_P6 = "N/A";
			// console.error("Error parsing email:", error);
		}
		try {
			const DisID = JSON.parse(row["Discord"]);
			Discord_P1 = DisID[0];
			Discord_P2 = DisID[1];
			Discord_P3 = DisID[2];
			Discord_P4 = DisID[3];
			Discord_P5 = DisID[4];
			Discord_P6 = DisID[5];
		} catch (error) {
			Discord_P1 = "N/A";
			Discord_P2 = "N/A";
			Discord_P3 = "N/A";
			Discord_P4 = "N/A";
			Discord_P5 = "N/A";
			Discord_P6 = "N/A";
			// console.error("Error parsing email:", error);
		}
		try {
			const Rank = JSON.parse(row["In-game-rank"]);
			Game_Rank_P1 = Rank[0];
			Game_Rank_P2 = Rank[1];
			Game_Rank_P3 = Rank[2];
			Game_Rank_P4 = Rank[3];
			Game_Rank_P5 = Rank[4];
			Game_Rank_P6 = Rank[5];
		} catch (error) {
			Game_Rank_P1 = "N/A";
			Game_Rank_P2 = "N/A";
			// console.error("Error parsing email:", error);
		}
		try {
			const Dob = JSON.parse(row["dob"]);
			DOB_P1 = Dob[0];
			DOB_P2 = Dob[1];
			DOB_P3 = Dob[2];
			DOB_P4 = Dob[3];
			DOB_P5 = Dob[4];
			DOB_P6 = Dob[5];
		} catch (error) {
			DOB_P1 = "N/A";
			DOB_P2 = "N/A";
			DOB_P3 = "N/A";
			DOB_P4 = "N/A";
			DOB_P5 = "N/A";
			DOB_P6 = "N/A";
			// console.error("Error parsing email:", error);
		}
		try {
			const pho = JSON.parse(row["phone"]);
			Phone_P1 = pho[0];
			Phone_P2 = pho[1];
			Phone_P3 = pho[2];
			Phone_P4 = pho[3];
			Phone_P5 = pho[4];
			Phone_P6 = pho[5];
		} catch (error) {
			Phone_P1 = "N/A";
			Phone_P2 = "N/A";
			Phone_P3 = "N/A";
			Phone_P4 = "N/A";
			Phone_P5 = "N/A";
			Phone_P6 = "N/A";
			// console.error("Error parsing email:", error);
		}

		// const rowData = {
		// 	teamName,
		// 	Player_1,
		// 	Player_2,
		// 	Player_3,
		// 	Player_4,
		// 	Player_5,
		// 	Player_6,
		// 	Player_1_InGame,
		// 	Player_2_InGame,
		// 	Email_P1,
		// 	Email_P2,
		// 	Discord_P1,
		// 	Discord_P2,
		// 	Game_Rank_P1,
		// 	Game_Rank_P2,
		// 	DOB_P1,
		// 	DOB_P2,
		// 	Phone_P1,
		// 	Phone_P2,
		// };

		// return rowData;

		const rowData = {
			teamName,

			Player_1,
			Phone_P1,
			Email_P1,
			Player_1_InGame,
			Discord_P1,
			Game_Rank_P1,
			DOB_P1,

			Player_2,
			Phone_P2,
			Email_P2,
			Player_2_InGame,
			Discord_P2,
			Game_Rank_P2,
			DOB_P2,

			Player_3,
			Phone_P3,
			Email_P3,
			Player_3_InGame,
			Discord_P3,
			Game_Rank_P3,
			DOB_P3,

			Player_4,
			Phone_P4,
			Email_P4,
			Player_4_InGame,
			Discord_P4,
			Game_Rank_P4,
			DOB_P4,

			Player_5,
			Phone_P5,
			Player_5_InGame,
			Email_P5,
			Discord_P5,
			Game_Rank_P5,
			DOB_P5,

			Player_6,
			Phone_P6,
			Email_P6,
			Player_6_InGame,
			Discord_P6,
			Game_Rank_P6,
			DOB_P6,
		};

		const filteredData = {};

		// Iterate over each variable in rowData
		for (const [key, value] of Object.entries(rowData)) {
			// Check if the value is not empty
			if (value && value.trim() !== "") {
				// Add the variable and its value to filteredData
				filteredData[key] = value;
			}
		}

		// Return the filteredData
		return filteredData;
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
