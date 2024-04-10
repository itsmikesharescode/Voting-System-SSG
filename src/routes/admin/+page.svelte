<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import landingDesktopBg from '$lib/assets/landing_desktop_bg.png';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ResultModel } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import { setAdminState } from '$lib/stores';

	interface AdminLoginVal {
		email: string[];
		password: string[];
	}

	let adminLoginLoader = false;
	let formActionErrors: AdminLoginVal | null = null;

	const adminLoginActionNews: SubmitFunction = () => {
		adminLoginLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<{ msg: string; errors: AdminLoginVal }>;

			switch (status) {
				case 200:
					formActionErrors = null;
					toast.success('Admin Login', { description: msg });
					adminLoginLoader = false;
					break;

				case 400:
					formActionErrors = errors;
					adminLoginLoader = false;
					break;

				case 401:
					formActionErrors = null;
					toast.error('Admin Login', { description: msg });
					adminLoginLoader = false;
					break;

				default:
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
	class="px-[55px] py-[32px] xs:px-[40px] xs:py-[88px]"
	method="post"
	action="?/adminLoginAction"
	enctype="multipart/form-data"
	use:enhance={adminLoginActionNews}
>
	<a href="/" class=" text-red-900 text-[14px] font-semibold underline">BACK TO HOME</a>

	<div
		class="mx-auto mt-[90px] flex flex-col gap-[20px] xs:w-[420px] lg:w-[481px] lg:rounded-[10px] lg:bg-[#d9d9d9de] lg:px-[68px] lg:py-[18px]"
	>
		<h1 class="text-red-900 text-[24px] font-semibold leading-[30px] xs:text-[28px] lg:text-center">
			ADMIN LOG IN
		</h1>

		<div class="grid w-full items-center gap-1.5 text-[14px]">
			<Label class="text-red-900 " for="username">Username</Label>
			<Input
				disabled={adminLoginLoader}
				name="email"
				class="text-red-900 text-[14px]"
				type="text"
				id="username"
				placeholder="Enter username"
			/>
			{#each formActionErrors?.email ?? [] as errorMsg}
				<p class="text-red-600 text-[14px]">{errorMsg}</p>
			{/each}
		</div>

		<div class="grid w-full items-center gap-1.5 text-[14px]">
			<Label class="text-red-900 " for="password">Password</Label>
			<Input
				disabled={adminLoginLoader}
				name="password"
				class="text-red-900 text-[14px]"
				type="password"
				id="password"
				placeholder="Enter password"
			/>
			{#each formActionErrors?.password ?? [] as errorMsg}
				<p class="text-red-600 text-[14px]">{errorMsg}</p>
			{/each}
		</div>

		<Button
			disabled={adminLoginLoader}
			type="submit"
			class="{adminLoginLoader ? 'cursor-not-allowed bg-clicked' : 'bg-red'}
			mx-auto w-[210px] rounded-[10px] text-[14px] font-semibold"
		>
			{#if adminLoginLoader}
				Logging in...
			{:else}
				Log in
			{/if}
		</Button>
	</div>
</form>
