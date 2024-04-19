<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import type { ResultModel, UserListDB } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';

	export let voterClientData: UserListDB | null;

	interface UpdateAccountVal {
		password: string[];
		confirmPassword: string[];
	}

	let updateAccountLoader = false;
	let formActionErrors: UpdateAccountVal | null = null;

	const updateAccountNews: SubmitFunction = () => {
		updateAccountLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<{ msg: string; errors: UpdateAccountVal }>;

			switch (status) {
				case 200:
					toast.success('Update Account', { description: msg });
					formActionErrors = null;
					updateAccountLoader = false;
					goto('/voter/voting-process');
					break;

				case 400:
					formActionErrors = errors;
					updateAccountLoader = false;
					break;

				case 401:
					toast.error('Update Account', { description: msg });
					formActionErrors = null;
					updateAccountLoader = false;
					break;
			}
			await update();
		};
	};
</script>

<form
	method="post"
	action="?/updateAccount"
	enctype="multipart/form-data"
	use:enhance={updateAccountNews}
	class="px-[55px] py-[32px] xs:px-[40px] xs:py-[88px]"
>
	<div
		class="mx-auto mt-[90px] flex flex-col gap-[20px] xs:w-[420px] lg:w-[481px] lg:rounded-[10px] lg:bg-[#d9d9d9de] lg:px-[68px] lg:py-[18px]"
	>
		<input
			name="lrnVoterEmail"
			type="hidden"
			value={JSON.stringify({
				id: voterClientData?.id,
				email: voterClientData?.user_email,
				lrn: voterClientData?.user_lrn,
				classification: voterClientData?.classification
			})}
		/>
		<h1 class="text-[24px] font-semibold leading-[30px] text-red-900 xs:text-[28px] lg:text-center">
			UPDATE VOTER ACCOUNT
		</h1>

		<div class="grid w-full items-center gap-1.5">
			<Label class="text-red-900" for="username">LRN</Label>
			<Input
				disabled={true}
				name="lrn"
				class="text-red-900"
				type="text"
				id="username"
				placeholder="Enter LRN"
				value={voterClientData?.user_lrn}
			/>
		</div>

		<div class="grid w-full items-center gap-1.5">
			<Label class="text-red-900" for="email">Voter Email</Label>
			<Input
				disabled={true}
				class="text-red-900"
				name="email"
				type="text"
				id="email"
				value={voterClientData?.user_email}
			/>
		</div>

		<div class="grid w-full items-center gap-1.5">
			<Label class="text-red-900" for="oldPassword">Old Password</Label>
			<Input
				disabled={true}
				class="text-red-900"
				name="oldPassword"
				type="text"
				id="oldPassword"
				value={voterClientData?.user_password}
			/>
		</div>

		<div class="grid w-full items-center gap-1.5">
			<Label class="text-red-900" for="password">New Password</Label>
			<Input
				disabled={updateAccountLoader}
				class="text-red-900"
				name="password"
				type="password"
				id="password"
				placeholder="Enter new password"
			/>
			{#each formActionErrors?.password ?? [] as errorMsg}
				<p class="text-[14px] text-red-600">{errorMsg}</p>
			{/each}
		</div>

		<div class="grid w-full items-center gap-1.5">
			<Label class="text-red-900" for="confirmPassword">Confirm New Password</Label>
			<Input
				disabled={updateAccountLoader}
				class="text-red-900"
				name="confirmPassword"
				type="password"
				id="confirmPassword"
				placeholder="Confirm new password"
			/>
			{#each formActionErrors?.confirmPassword ?? [] as errorMsg}
				<p class="text-[14px] text-red-600">{errorMsg}</p>
			{/each}
		</div>

		<Button
			type="submit"
			disabled={updateAccountLoader}
			class="{updateAccountLoader ? 'cursor-not-allowed bg-clicked' : 'bg-mainred'}
			mx-auto w-[210px] rounded-[10px]  text-[14px] font-semibold transition-all"
		>
			{#if updateAccountLoader}
				Updating...
			{:else}
				Update Information
			{/if}
		</Button>
	</div>
</form>
