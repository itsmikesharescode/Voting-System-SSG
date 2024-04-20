<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import landingDesktopBg from '$lib/assets/landing_desktop_bg.png';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ResultModel } from '$lib/types';
	import { toast } from 'svelte-sonner';

	interface ResetPassVal {
		email: string[];
	}

	let resetPwsLoader = false;
	let formActionErrors: ResetPassVal | null = null;

	const resetPasswordActionNews: SubmitFunction = () => {
		resetPwsLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<{ msg: string; errors: ResetPassVal }>;

			switch (status) {
				case 200:
					formActionErrors = null;
					toast.success('Forgot Password', { description: msg });
					resetPwsLoader = false;
					break;

				case 400:
					formActionErrors = errors;
					resetPwsLoader = false;
					break;

				case 401:
					formActionErrors = null;
					toast.error('Forgot Password', { description: msg });
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
			<Label class="text-red-900" for="email">Email Address</Label>
			<Input
				disabled={resetPwsLoader}
				name="email"
				class="text-red-900"
				type="email"
				id="email"
				placeholder="Enter email address"
			/>
			{#each formActionErrors?.email ?? [] as errorMsg}
				<p class="text-[14px] text-red-600">{errorMsg}</p>
			{/each}
		</div>

		<Button
			disabled={resetPwsLoader}
			type="submit"
			class="{resetPwsLoader ? 'cursor-not-allowed bg-clicked' : 'bg-mainred'}
			mx-auto w-[210px] rounded-[10px] bg-red-900 text-[14px] font-semibold"
		>
			{#if resetPwsLoader}
				Sending...
			{:else}
				Send Reset Link
			{/if}
		</Button>

		<a
			href="/voter"
			class="mx-auto text-[14px] font-semibold text-mainred underline transition-all hover:text-[#2d2b29]"
			>Log in here</a
		>
	</div>
</form>
