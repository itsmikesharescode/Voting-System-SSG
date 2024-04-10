<script lang="ts">
	import landingDesktopBg from '$lib/assets/landing_desktop_bg.png';
</script>

<img
	src={landingDesktopBg}
	alt="desktopBG"
	class="fixed bottom-0 left-0 right-0 top-0 -z-10 hidden h-full w-full lg:block"
/>

<div class="px-[55px] py-[32px] xs:px-[40px] xs:py-[88px]">
	<a href="/admin" class=" text-[14px] font-semibold text-red-900 underline">ADMIN LOG IN</a>

	<div
		class="mt-[90px] flex flex-col lg:mx-auto lg:w-[714px] lg:rounded-[10px] lg:bg-[#d9d9d9de] lg:px-[68px] lg:py-[18px]"
	>
		<h1 class="text-[24px] font-semibold leading-[30px] text-red-900 xs:text-[28px] lg:text-center">
			Web-Based Voting System for Lazaro Francisco Integrated School (SSG)
		</h1>

		<p class="mx-auto mt-[40px] text-[14px] leading-[28px] lg:w-[500px] lg:text-center">
			Our system is designed to streamline the voting process for students, faculty, and staff of
			Lazaro Francisco Integrated School, allowing for efficient and transparent elections for the
			Student Supreme Government (SSG). With an intuitive interface and robust features, our
			platform simplifies the creation of admin accounts, the management of voter accounts, and the
			facilitation of the voting process.
		</p>

		<a
			href="/voter"
			class="hover:bg-clicked mx-auto mt-[20px] flex h-[40px] w-[210px] items-center justify-center rounded-[10px] bg-red-900 text-[14px] font-semibold text-white transition-all"
			>Click to Vote</a
		>
	</div>
</div>
