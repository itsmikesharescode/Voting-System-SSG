<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import landingDesktopBg from '$lib/assets/landing_desktop_bg.png';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ResultModel } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	interface UpdatePasswordVal {
		password: string[];
		confirmPassword: string[];
	}

	let updatePwsLoader = false;
	let formActionErrors: UpdatePasswordVal | null = null;

	const updatePasswordActionNews: SubmitFunction = () => {
		updatePwsLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<{ msg: string; errors: UpdatePasswordVal }>;

			switch (status) {
				case 200:
					goto('/voter/voting-process');
					formActionErrors = null;
					toast.success('Update Password', { description: msg });
					updatePwsLoader = false;
					break;

				case 400:
					formActionErrors = errors;
					updatePwsLoader = false;
					break;

				case 401:
					formActionErrors = null;
					toast.error('Update Password', { description: msg });
					updatePwsLoader = false;
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
	action="?/updatePasswordAction"
	enctype="multipart/form-data"
	use:enhance={updatePasswordActionNews}
	class="px-[55px] py-[32px] xs:px-[40px] xs:py-[88px]"
>
	<a href="/" class=" text-[14px] font-semibold text-red-900 underline">BACK TO HOME</a>

	<div
		class="mx-auto mt-[90px] flex flex-col gap-[20px] xs:w-[420px] lg:w-[481px] lg:rounded-[10px] lg:bg-[#d9d9d9de] lg:px-[68px] lg:py-[18px]"
	>
		<h1 class="text-[24px] font-semibold leading-[30px] text-red-900 xs:text-[28px] lg:text-center">
			UPDATE PASSWORD
		</h1>

		<p class="my-[10px] text-[14px] text-mainred lg:text-center">
			Reloading this page may lose your chance of updating your password.
		</p>

		<div class="grid w-full items-center gap-1.5">
			<Label class="text-red-900" for="password">New Password</Label>
			<Input
				disabled={updatePwsLoader}
				name="password"
				class="text-red-900"
				type="password"
				id="password"
				placeholder="Enter your new password"
			/>
			{#each formActionErrors?.email ?? [] as errorMsg}
				<p class="text-[14px] text-red-600">{errorMsg}</p>
			{/each}
		</div>

		<div class="grid w-full items-center gap-1.5">
			<Label class="text-red-900" for="password">Confirm New Password</Label>
			<Input
				disabled={updatePwsLoader}
				name="confirmPassword"
				class="text-red-900"
				type="password"
				id="password"
				placeholder="Confirm your new password"
			/>
			{#each formActionErrors?.email ?? [] as errorMsg}
				<p class="text-[14px] text-red-600">{errorMsg}</p>
			{/each}
		</div>

		<Button
			disabled={updatePwsLoader}
			type="submit"
			class="{updatePwsLoader ? 'cursor-not-allowed bg-clicked' : 'bg-mainred'}
			mx-auto w-[210px] rounded-[10px] bg-red-900 text-[14px] font-semibold"
		>
			{#if updatePwsLoader}
				Updating...
			{:else}
				Update Password
			{/if}
		</Button>
	</div>
</form>
