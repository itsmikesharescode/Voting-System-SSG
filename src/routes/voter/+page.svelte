<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import landingDesktopBg from '$lib/assets/landing_desktop_bg.png';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ResultModel, UserListDB } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import UpdateAccount from '$lib/route-components/voter/update-account/update-account.svelte';

	interface VoterLoginVal {
		lrn: string[];
		password: string[];
	}

	let voterClientData: UserListDB | null = null;
	let loginLoader = false;
	let formActionErrors: VoterLoginVal | null = null;

	const loginActionNews: SubmitFunction = () => {
		loginLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors, voterData }
			} = result as ResultModel<{
				msg: string;
				errors: VoterLoginVal;
				voterData: UserListDB;
			}>;

			switch (status) {
				case 200:
					toast.success('Voter Login', { description: msg });
					formActionErrors = null;
					loginLoader = false;
					break;

				case 201:
					voterClientData = voterData;
					toast.success('Voter Login', { description: msg });
					formActionErrors = null;
					loginLoader = false;
					break;

				case 400:
					formActionErrors = errors;
					loginLoader = false;
					break;

				case 401:
					toast.error('Vote Login', { description: msg });
					formActionErrors = null;
					loginLoader = false;
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

{#if voterClientData}
	<UpdateAccount {voterClientData} />
{:else}
	<form
		method="post"
		action="?/loginAction"
		enctype="multipart/form-data"
		use:enhance={loginActionNews}
		class="px-[55px] py-[32px] xs:px-[40px] xs:py-[88px]"
	>
		<a href="/" class=" text-[14px] font-semibold text-red-900 underline">BACK TO HOME</a>

		<div
			class="mx-auto mt-[90px] flex flex-col gap-[20px] xs:w-[420px] lg:w-[481px] lg:rounded-[10px] lg:bg-[#d9d9d9de] lg:px-[68px] lg:py-[18px]"
		>
			<h1
				class="text-[24px] font-semibold leading-[30px] text-red-900 xs:text-[28px] lg:text-center"
			>
				LAZARO ELECTION
			</h1>

			<div class="grid w-full items-center gap-1.5">
				<Label class="text-red-900" for="username">LRN</Label>
				<Input
					disabled={loginLoader}
					name="lrn"
					class="text-red-900"
					type="text"
					id="username"
					placeholder="Enter LRN"
				/>
				{#each formActionErrors?.lrn ?? [] as errorMsg}
					<p class="text-[14px] text-red-600">{errorMsg}</p>
				{/each}
			</div>

			<div class="grid w-full items-center gap-1.5">
				<Label class="text-red-900" for="password">Password</Label>
				<Input
					disabled={loginLoader}
					class="text-red-900"
					name="password"
					type="password"
					id="password"
					placeholder="Enter password"
				/>
				{#each formActionErrors?.password ?? [] as errorMsg}
					<p class="text-[14px] text-red-600">{errorMsg}</p>
				{/each}
			</div>

			<Button
				type="submit"
				disabled={loginLoader}
				class="{loginLoader ? 'cursor-not-allowed bg-clicked' : 'bg-mainred'}
			mx-auto w-[210px] rounded-[10px]  text-[14px] font-semibold transition-all"
			>
				{#if loginLoader}
					Logging in...
				{:else}
					Log in
				{/if}
			</Button>

			<a
				href="/voter/forgot-password"
				class="mx-auto text-[14px] font-semibold text-red-900 underline transition-all hover:text-[#2d2b29]"
				>Forgot Password</a
			>
		</div>
	</form>
{/if}
