<template>
	<div class="dashboard">
		<h1><u>Sustainability Analytics Dashboard</u></h1>
		<div class="section" v-for="(section, index) in chartsSections" :key="index">
			<h2>{{ section.name }}</h2>
			<div class="charts-row">
				<div class="chart-container" v-for="(chartData, chartIndex) in section.charts" :key="chartIndex">
					<canvas :id="`chart-${index}-${chartIndex}`"></canvas>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
	name: "DashboardPage",
	data() {
		return {
			chartsSections: [
				{
					name: "Environmental Impact",
					charts: [
						{
							type: "line",
							data: {
								labels: ["January", "February", "March", "April"],
								datasets: [
									{
										label: "Cumulative CO2 Emission Reduction (Metric Tons)",
										data: [44, 333, 441, 490],
										borderColor: "rgb(75, 192, 192)",
										tension: 0.1,
									},
								],
							},
							options: {},
						},
						// {
						// 	type: "doughnut",
						// 	data: {
						// 		labels: ["Renewable", "Non-Renewable"],
						// 		datasets: [
						// 			{
						// 				label: "Energy Consumption",
						// 				data: [60, 40],
						// 				backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
						// 			},
						// 		],
						// 	},
						// 	options: {},
						// },
						{
							type: "bar",
							data: {
								labels: ["January", "February", "March", "April"],
								datasets: [
									{
										label: "Waste Reduction (Tons)",
										data: [12, 19, 3, 5],
										backgroundColor: "rgb(255, 205, 86)",
									},
								],
							},
							options: {},
						},
						{
							type: "line",
							data: {
								labels: ["January", "February", "March", "April"],
								datasets: [
									{
										label: "Plastic Bags Reduction (Hundreds)",
										data: [30, 45, 28, 60],
										borderColor: "rgb(153, 102, 255)",
										tension: 0.1,
									},
								],
							},
							options: {},
						},
					],
				},
				{
					name: "Social and Governance",
					charts: [
						{
							type: "bar",
							data: {
								labels: ["Mandai Ecosystem Partnership", "SG Go Green", "Eco Non-profit Development"],
								datasets: [
									{
										label: "Beneficiaries Impacted",
										data: [300, 500, 200],
										backgroundColor: "rgb(255, 159, 64)",
									},
								],
							},
							options: {},
						},

						{
							type: "bar",
							data: {
								labels: ["Carbon Footprint", "Waste Reduced", "Community Benefits"],
								datasets: [
									{
										label: "Impact Score",
										data: [200, 150, 300], // Dummy data
										backgroundColor: ["rgba(75, 192, 192, 0.2)"],
										borderColor: ["rgba(75, 192, 192, 1)"],
										borderWidth: 1,
									},
								],
							},
							options: {
								scales: {
									y: {
										beginAtZero: true,
									},
								},
							},
						},
						// {
						// 	type: "radar",
						// 	data: {
						// 		labels: ["Gender Diversity", "Cultural Diversity", "Age Diversity", "Disability Inclusion", "Socioeconomic Inclusion"],
						// 		datasets: [
						// 			{
						// 				label: "Diversity and Inclusion",
						// 				data: [65, 59, 90, 81, 56],
						// 				fill: true,
						// 				backgroundColor: "rgba(255, 99, 132, 0.2)",
						// 				borderColor: "rgb(255, 99, 132)",
						// 				pointBackgroundColor: "rgb(255, 99, 132)",
						// 				pointBorderColor: "#fff",
						// 				pointHoverBackgroundColor: "#fff",
						// 				pointHoverBorderColor: "rgb(255, 99, 132)",
						// 			},
						// 		],
						// 	},
						// 	options: {
						// 		elements: {
						// 			line: {
						// 				borderWidth: 3,
						// 			},
						// 		},
						// 	},
						// },
					],
				},
				{
					name: "ESG Marketing Analytics",
					charts: [
						{
							type: "bar",
							data: {
								labels: ["Social Media", "Email", "SEO", "PPC", "Direct Mail"],
								datasets: [
									{
										label: "Reach",
										data: [400, 300, 500, 700, 200],
										backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)"],
										borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"],
										borderWidth: 1,
									},
								],
							},
						},
						{
							type: "line",
							data: {
								labels: ["January", "February", "March", "April", "May"],
								datasets: [
									{
										label: "Followers",
										data: [0, 188, 218, 240, 288],
										fill: false,
										borderColor: "rgb(75, 192, 192)",
										tension: 0.1,
									},
								],
							},

							options: {
								height: "200%",
								// maintainAspectRatio: ,
								height: 500, // Adjust this value to find a suitable display for your chart
							},
						},
						{
							type: "doughnut",
							data: {
								labels: ["Likes", "Comments", "Shares", "Views"],
								datasets: [
									{
										data: [300, 50, 100, 500],
										backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)"],
										hoverOffset: 4,
									},
								],
							},
						},
					],
				},
			],
		};
	},
	mounted() {
		this.chartsSections.forEach((section, sectionIndex) => {
			section.charts.forEach((chartData, chartIndex) => {
				const ctx = document.getElementById(`chart-${sectionIndex}-${chartIndex}`).getContext("2d");
				new Chart(ctx, {
					type: chartData.type,
					data: chartData.data,
					options: chartData.options,
				});
			});
		});
	},
};
</script>
<style scoped>
.dashboard {
	max-width: 1200px;
	margin: auto;
}

h1 {
	text-align: center;
	margin-bottom: 20px;
	font-size: 20;
	font-weight: bold;
}

h2 {
	text-align: center;
	margin-bottom: 20px;
	font-size: 16px;
	font-weight: bold;
}

.section {
	margin-bottom: 40px;
}

.charts-row {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}

.chart-container {
	flex: 1 1 300px; /* Adjust this to control how many charts per row */
	box-sizing: border-box;
	padding: 10px;
	max-width: calc(50% - 20px); /* For 2 charts per row. Use 33% for 3 charts per row */
	margin-bottom: 20px;
}

canvas {
	max-width: 100%;
	height: auto;
}
</style>
