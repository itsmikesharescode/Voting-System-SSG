<script lang="ts">
	import { goto } from '$app/navigation';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index';

	export let showWarningModal = false;
</script>

<AlertDialog.Root bind:open={showWarningModal}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Voting System Is Not Available</AlertDialog.Title>
			<AlertDialog.Description>
				At this moment voting system is not yet activated. Tell admins to open the voting system.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Action on:click={() => goto('/')}>Agree</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
