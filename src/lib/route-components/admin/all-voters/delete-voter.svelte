<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';

	let showDeleteVoterDialog = false;
</script>

<Button
	class="w-full transition-all hover:bg-mainred"
	on:click={() => (showDeleteVoterDialog = true)}>Delete</Button
>

<AlertDialog.Root bind:open={showDeleteVoterDialog}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				<p>
					This action cannot be undone. This will permanently delete the voter account of <b
						class="text-mainred">Mike John Eviota</b
					> and remove its data to our database.
				</p>
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action>Continue This Account</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
