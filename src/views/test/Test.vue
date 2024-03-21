<template>
	<div id="dashboard">
		<div style="display: flex; height: calc(100vh - 60px)">
			<aside style="width: 200px; background-color: #efefef; padding: 20px">
				<!-- Sidebar content here -->
			</aside>
			<main style="flex-grow: 1; padding: 20px; overflow-y: auto">
				<span style="font-size: 24px; text-align: center"><strong>Impact Tracking</strong></span>

				<div class="chart-row">
					<div class="chart-container">
						<h2>Impact</h2>
						<canvas ref="impactChart"></canvas>
					</div>
					<div class="chart-container">
						<h2>Marketing Reach by Channel</h2>
						<canvas ref="marketingChart"></canvas>
					</div>
					<div class="chart-container">
						<h2>Performance Metrics</h2>
						<canvas ref="performanceChart"></canvas>
					</div>
				</div>
				<span style="font-size: 24px; text-align: center"><strong>Engagement on ESG Marketing</strong></span>

				<div class="chart-row">
					<div class="chart-container">
						<h2>Total Followers Count</h2>
						<canvas ref="followersChart"></canvas>
					</div>
					<div class="chart-container">
						<h2>Marketing Reach by Channel</h2>
						<canvas ref="marketingChart"></canvas>
					</div>
					<div class="chart-container">
						<h2>Performance Metrics</h2>
						<canvas ref="engagementChart"></canvas>
					</div>
				</div>
				<!-- <div class="chart-row">
					<div class="chart-container">
						<h2>User Engagement Types</h2>
						<canvas ref="engagementChart"></canvas>
					</div>
					<div class="chart-container">
						<h2>User Engagement Types</h2>
						<canvas ref="engagementChart"></canvas>
					</div>
					<div class="chart-container">
						<h2>User Engagement Types</h2>
						<canvas ref="engagementChart"></canvas>
					</div>
				</div> -->
			</main>
		</div>
	</div>
</template>

<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default {
	name: "AdminDashboard",
	mounted() {
		this.initCharts();
	},
	methods: {
		createChart(chartRef, chartConfig) {
			const ctx = this.$refs[chartRef].getContext("2d");
			return new Chart(ctx, chartConfig);
		},
		initCharts() {
			this.createChart("followersChart", {
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
			});

			this.createChart("marketingChart", {
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
			});
			this.createChart("impactChart", {
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
			});
			this.createChart("performanceChart", {
				type: "radar",
				data: {
					labels: ["Speed", "Reliability", "Comfort", "Safety", "Efficiency"],
					datasets: [
						{
							label: "Model A",
							data: [20, 10, 4, 2, 8],
							fill: true,
							backgroundColor: "rgba(255, 99, 132, 0.2)",
							borderColor: "rgb(255, 99, 132)",
							pointBackgroundColor: "rgb(255, 99, 132)",
							pointBorderColor: "#fff",
							pointHoverBackgroundColor: "#fff",
							pointHoverBorderColor: "rgb(255, 99, 132)",
						},
						{
							label: "Model B",
							data: [12, 19, 3, 5, 2],
							fill: true,
							backgroundColor: "rgba(54, 162, 235, 0.2)",
							borderColor: "rgba(54, 162, 235, 1)",
							pointBackgroundColor: "rgba(54, 162, 235, 1)",
							pointBorderColor: "#fff",
							pointHoverBackgroundColor: "#fff",
							pointHoverBorderColor: "rgba(54, 162, 235, 1)",
						},
					],
				},
				options: {
					elements: {
						line: {
							borderWidth: 3,
						},
					},
				},
			});

			this.createChart("engagementChart", {
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
			});
		},
	},
};
</script>

<style scoped>
.chart-row {
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
}

.chart-container {
	flex: 1; /* Allows the container to expand equally */
	margin: 0 10px; /* Adds some space between the charts */
	text-align: center;
}

canvas {
	width: 100%;
	height: 250px; /* Set a fixed height for all canvases */
	/* max-height: 300px; */
}

h2 {
	margin-bottom: 0.5rem;
}
</style>
