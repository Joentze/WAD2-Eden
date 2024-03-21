<template>
	<div class="esg-resource">
		<h1 style="font-size: 46" class="title"><strong>ESG Learning Resources Hub</strong></h1>

		Stay ahead of the news and trends impacting GRC for leaders, organizations and the public sector. Find resources and insights covering everything from governance best practices to ESG to strategic risk, compliance and audit management.

		<br />
		<br />
		<!-- <div class="content">
			<div class="card" v-for="(item, index) in resources" :key="index" @click="toggleSection(index)">
				<div class="card-header">
					<h2>{{ item.title }}</h2>
					<span class="toggle-icon">{{ item.open ? "−" : "+" }}</span>
				</div>
				<div v-if="item.open" class="card-body">
					<p>{{ item.description }}</p>
					<ul>
						<li v-for="(link, lIndex) in item.links" :key="lIndex">
							<a :href="link.url" target="_blank">{{ link.text }}</a>
						</li>
					</ul>
				</div>
			</div>
		</div> -->
	</div>

	<div v-for="article in articles" :key="article.id" class="article">
		<div class="article-content">
			<div class="article-image">
				<!-- Image here -->
				<img :src="article.image" alt="Article Image" />
			</div>
			<div class="article-details">
				<div class="article-date">{{ article.date }}</div>
				<div class="article-read">{{ article.readTime }}</div>
				<div class="article-title">{{ article.title }}</div>
				<div class="article-summary">{{ article.summary }}</div>
				<button @click="goToExampleSite">Continue reading</button>
			</div>
		</div>
	</div>
	<!-- Talk to a Consultant Section -->
	<div class="consultant-section">
		<h1 style="font-size: 24"><strong>Talk to Our Consultant</strong></h1>
		<div class="consultant-cards">
			<div class="consultant-card" v-for="consultant in consultants" :key="consultant.id">
				<img :src="consultant.image" alt="Consultant" class="consultant-image" />
				<div class="consultant-details">
					<h3>
						<strong>{{ consultant.name }}</strong>
					</h3>
					<h4>{{ consultant.title }}</h4>
					<i>{{ consultant.description }}</i>
				</div>
			</div>
		</div>
	</div>

	<!-- Contact Us Section -->
	<div class="contact-section">
		<h2 class="contact-header">Contact Us</h2>
		<p class="contact-description">If you have any questions or need further information, please feel free to reach out to us.</p>
		<a class="contact-email" href="mailto:info@youresgplatform.com">info@eden.com.sg</a>
	</div>
</template>

<script>
// Importing the image
import pic1 from "./consultant-1.jpeg";
import pic2 from "./consultant-2.jpeg";
import pic3 from "./consultant-3.jpeg";

// Consulting pic
import esgPic from "./esg.jpg";
import greenFinancePic from "./green_finance.jpg";
import foodAcceleratorPic from "./food_accelerator.jpg";
import energyPic from "./energy.jpg";
import volunteerPic from "./volunteer.jpg";

export default {
	name: "EsgResourcePage",
	data() {
		return {
			esgPic: esgPic,
			resources: [
				{
					title: "ESG Best Practices",
					description:
						"Dive into ESG best practices to enhance your company’s ethical investment, sustainable resource management, and social responsibility initiatives. Understanding these practices can guide your strategies towards more sustainable and responsible business operations.",
					links: [
						{ text: "UN Principles for Responsible Investment", url: "https://www.unpri.org/" },
						{ text: "Sustainable Resource Management Guide", url: "https://www.example.com/resource-management" },
					],
					open: false,
				},
				{
					title: "Sustainability Reporting",
					description:
						"Sustainability reporting is critical for transparency and accountability in business operations. Learn about the standards such as GRI, and explore how to effectively report your company’s sustainability performance to stakeholders.",
					links: [
						{ text: "Global Reporting Initiative (GRI) Standards", url: "https://www.globalreporting.org/" },
						{ text: "Sustainability Reporting Guidelines", url: "https://www.example.com/reporting-guidelines" },
					],
					open: false,
				},
				{
					title: "Eco-project Partnership",
					description:
						"Partnerships on eco-projects can significantly impact sustainability goals. Discover how to form and benefit from eco-project partnerships, including understanding the types of partnerships and exploring case studies of successful collaborations.",
					links: [
						{ text: "Partnership for Sustainability", url: "https://www.example.com/partnerships" },
						{ text: "Eco-Project Success Stories", url: "https://www.example.com/success-stories" },
					],
					open: false,
				},
			],
			consultants: [
				{
					id: 1,
					name: "Alex Tan",
					title: "Sustainability Expert",
					description: "Specializing in sustainability reporting and ESG integration strategies.",
					// image: "consultant-1.jepg",
					image: pic1,
				},
				{
					id: 2,
					name: "Jamie Lee",
					title: "ESG Consultant",
					description: "Expert in ESG best practices, corporate governance, and ethical investment.",
					// image: "consultant-2.jpeg",
					image: pic2,
				},
				{
					id: 3,
					name: "Xiao Hui",
					title: "Environmental Strategist",
					description: "Focuses on eco-project partnerships and sustainable development goals.",
					// image: "consultant-3.jpg",
					image: pic3,
				},
			],
			articles: [
				{
					id: 1,
					image: esgPic,
					date: "March 21, 2024",
					readTime: "5 min read",
					title: "Navigating the Landscape of ESG Reporting: A Comprehensive Comparison",
					summary:
						"This article delves into the complex world of Environmental, Social, and Governance (ESG) reporting, presenting a thorough comparative analysis of the existing frameworks. It aims to guide businesses through the intricacies of various ESG standards, highlighting key differences and offering strategic advice to align with investor expectations and regulatory requirements.",
				},
				{
					id: 2,
					image: energyPic,
					date: "March 19, 2024",
					readTime: "6 min read",
					title: "Pioneering Sustainability: The Technological Vanguard",
					summary:
						"Explore the forefront of sustainability within the tech industry, where major corporations are redefining industry norms. This in-depth examination showcases how technology giants are leveraging innovation and resources to establish new sustainability benchmarks, influencing not only their sector but also setting a precedent for global corporate responsibility.",
				},
				{
					id: 3,
					image: foodAcceleratorPic,
					date: "March 18, 2024",
					readTime: "4 min read",
					title: "Revolutionizing Corporate Social Responsibility: Innovative Ventures",
					summary:
						"Uncover the groundbreaking Corporate Social Responsibility (CSR) initiatives that are reshaping the business landscape. This article highlights the inventive approaches companies are adopting to engage in CSR, demonstrating how creative projects and partnerships can lead to significant societal benefits and establish new standards for corporate engagement.",
				},
				{
					id: 4,
					image: greenFinancePic,
					date: "March 16, 2024",
					readTime: "3 min read",
					title: "The Evolution of Green Finance: Catalyzing Sustainable Development",
					summary:
						"Green finance is emerging as a critical driver for sustainability projects across various sectors. This article provides insights into how financial instruments and investments are being geared towards supporting environmental and sustainable growth, illustrating the pivotal role of finance in advancing global sustainability goals.",
				},
				{
					id: 5,
					image: volunteerPic,
					date: "March 14, 2024",
					readTime: "7 min read",
					title: "The Surge of ESG Investing: What You Need to Know",
					summary:
						"An analysis of the rise in ESG investing and what it means for the financial markets and sustainable development. The article explores the growing trend of investors prioritizing Environmental, Social, and Governance factors in their investment decisions, highlighting the impact on companies and how it's shaping the future of investing.",
				},
			],
		};
	},
	methods: {
		toggleSection(index) {
			this.resources[index].open = !this.resources[index].open;
		},
		goToExampleSite() {
			window.open("https://www.greenplan.gov.sg/funding/");
		},
	},
};
</script>

<style scoped>
.esg-resource {
	max-width: 800px;
	margin: auto;
	font-family: "Arial", sans-serif;
}

.title {
	font-size: 40px;
	text-align: center;
	margin-top: 20px;
	margin-bottom: 40px;
}

.card {
	background-color: #fff;
	border: 1px solid #ddd;
	border-radius: 8px;
	margin-bottom: 20px;
	transition: box-shadow 0.3s;
	cursor: pointer;
}

.card:hover {
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	border-bottom: 1px solid #ddd;
	border-radius: 8px 8px 0 0;
	/* background-color: #f7f7f7; */
	color: white;
	background-color: #00bda7;
}

.card-header h2 {
	margin: 0;
	font-size: 24px;
}

.toggle-icon {
	font-size: 24px;
	font-weight: bold;
}

.card-body {
	padding: 20px;
}

.card-body p {
	margin: 0 0 10 px;
	line-height: 1.6;
}

.card-body ul {
	list-style-type: none;
	padding: 0;
}

.card-body li {
	margin-bottom: 5px;
}

.card-body a {
	display: inline-block;
	background-color: #4caf50;
	color: white;
	padding: 10px 15px;
	border-radius: 5px;
	text-decoration: none;
	transition: background-color 0.3s;
}

.card-body a:hover {
	background-color: #45a049;
}

/* Articles */
.article {
	display: flex;
	border-bottom: 1px solid #ddd;
	padding: 20px;
}

button {
	padding: 10px 15px;
	background-color: #008c7a;
	color: white;
}
button:hover {
	background-color: green;
}
.article-content {
	margin-left: 40px; /* Increased from 20px for more space between image and text */
	display: flex;
	width: 100%;
}

.article-image img {
	width: 420px;
	height: 150px;
	object-fit: cover;
	padding-right: 20px;
	margin-right: 20px; /* This margin is fine, but you adjusted the margin-left of the content instead */
}

.article-details {
	display: flex;
	flex-direction: column;
}

.article-date,
.article-read {
	font-size: 0.85em;
	color: #666;
}

.article-title {
	font-size: 1.25em;
	font-weight: bold;
	margin: 5px 0;
}

.article-summary {
	font-size: 1em;
	margin: 10px 0;
}

/* Contact Section Styles */
.contact-section {
	background-color: #f1f1f1; /* Light grey background for contrast */
	padding: 40px; /* Ample padding for spacing */
	text-align: center; /* Center-align the content */
	margin-top: 40px; /* Space from preceding content */
	border-radius: 8px; /* Rounded corners */
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

.contact-header {
	font-weight: bold;
	color: #333; /* Dark text for readability */
	margin-bottom: 20px; /* Spacing between the header and description */
}

.contact-description {
	color: #666; /* Slightly lighter text for the description */
	margin-bottom: 30px; /* Spacing before the email link */
}

.contact-email {
	background-color: #00bda7; /* Brand color for the email link */
	color: white; /* White text for contrast */
	padding: 12px 24px; /* Padding for size */
	border-radius: 25px; /* Rounded edges */
	text-decoration: none; /* Remove underline from link */
	transition: background-color 0.3s; /* Smooth transition for hover effect */
}

.contact-email:hover {
	background-color: #008c7a; /* Darker shade on hover for interaction feedback */
}

.consultant-section {
	text-align: center;
	margin-top: 40px;
}

.consultant-cards {
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	gap: 20px;
	margin-top: 20px;
}

.consultant-card {
	flex-basis: calc(33.333% - 20px);
	border: 1px solid #ccc;
	border-radius: 8px;
	overflow: hidden;
	transition: transform 0.3s ease;
}

.consultant-card:hover {
	transform: translateY(-5px);
}

.consultant-image {
	width: 100%;
	height: 300px;
	object-fit: cover;
	display: block;
}

.consultant-details {
	padding: 15px;
}

.consultant-details h3,
.consultant-details h4 {
	margin: 10px 0;
}

@media (max-width: 768px) {
	.consultant-card {
		flex-basis: calc(50% - 20px);
	}
}

@media (max-width: 480px) {
	.consultant-card {
		flex-basis: 100%;
	}
}
</style>
