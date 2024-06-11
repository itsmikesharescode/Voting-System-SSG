<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Send, LoaderCircle } from 'lucide-svelte';
	import { getAdminState } from '$lib/stores';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ResultModel } from '$lib/types';
	import { toast } from 'svelte-sonner';

	const adminState = getAdminState();

	let open = false;
	let mailSendLoader = false;
	const sendMailNews: SubmitFunction = () => {
		mailSendLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg }
			} = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					toast.success('Mailing System', { description: msg });
					mailSendLoader = false;
					open = false;
					break;

				case 400:
					toast.error('Mailing System', { description: msg });
					mailSendLoader = false;
					break;

				case 401:
					toast.error('Mailing System', { description: msg });
					mailSendLoader = false;
					break;

				case 500:
					toast.error('Mailing System', { description: msg });
					mailSendLoader = false;
					break;

				case 502:
					toast.error('Mailing System', { description: msg });
					mailSendLoader = false;
					break;
			}
			await update();
		};
	};
</script>

<Button
	on:click={() => (open = true)}
	class="flex items-center gap-[5px]  rounded-[10px] bg-mainred text-[14px] font-semibold"
>
	Send Mail
	<Send class="w-[15px]" />
</Button>

<AlertDialog.Root bind:open>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you sure?</AlertDialog.Title>
			<AlertDialog.Description>
				You're about to notify <b class="underline">
					total of {$adminState.allvoters.userList?.length}
					{$adminState.allvoters.filterSelection === 'unvoted'
						? 'Unvoted Voters'
						: 'Not Registered Voters'}
				</b> via email.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel disabled={mailSendLoader}>Cancel</AlertDialog.Cancel>

			<form method="post" action="APIS?/sendMail" use:enhance={sendMailNews}>
				<input
					name="serializeUsers"
					type="hidden"
					value={JSON.stringify($adminState.allvoters.userList)}
				/>
				<Button disabled={mailSendLoader} type="submit" class="flex w-full items-center gap-[5px]">
					{#if mailSendLoader}
						Sending ...
						<LoaderCircle class="w-[15px] animate-spin" />
					{:else}
						Continue
					{/if}
				</Button>
			</form>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
