<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import landingDesktopBg from '$lib/assets/landing_desktop_bg.png';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ResultModel } from '$lib/types';

	let resetPwsLoader = false;
	let formActionErrors = null;

	const resetPasswordActionNews: SubmitFunction = () => {
		return async ({ result, update }) => {
			resetPwsLoader = true;
			const { status } = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					resetPwsLoader = false;
					break;

				case 400:
					resetPwsLoader = false;
					break;

				case 401:
					resetPwsLoader = false;
					break;
			}
			await update();
		};
	};
</script>

<img
	src={landingDesktopBg}
	alt="desktopBG"
	class="fixed bottom-0 left-0 right-0 top-0 -z-10 hidden h-full w-full lg:block"
/>

<form
	method="post"
	action="/voter?/resetPasswordAction"
	enctype="multipart/form-data"
	use:enhance={resetPasswordActionNews}
	class="px-[55px] py-[32px] xs:px-[40px] xs:py-[88px]"
>
	<a href="/" class=" text-[14px] font-semibold text-red-900 underline">BACK TO HOME</a>

	<div
		class="mx-auto mt-[90px] flex flex-col gap-[20px] xs:w-[420px] lg:w-[481px] lg:rounded-[10px] lg:bg-[#d9d9d9de] lg:px-[68px] lg:py-[18px]"
	>
		<h1 class="text-[24px] font-semibold leading-[30px] text-red-900 xs:text-[28px] lg:text-center">
			FORGOT PASSWORD
		</h1>

		<div class="grid w-full items-center gap-1.5">
			<Label class="text-red-900" for="username">Email Address</Label>
			<Input class="text-red-900" type="email" id="username" placeholder="Enter email address" />
		</div>

		<Button
			type="submit"
			class=" mx-auto w-[210px] rounded-[10px] bg-red-900 text-[14px] font-semibold"
			>Send Reset Link</Button
		>

		<a
			href="/voter"
			class="mx-auto text-[14px] font-semibold text-mainred underline transition-all hover:text-[#2d2b29]"
			>Log in here</a
		>
	</div>
</form>
