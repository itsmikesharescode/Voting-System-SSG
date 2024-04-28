<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index';
	import { Button } from '$lib/components/ui/button/index';
	import type { Candidates } from '$lib/types';
	import * as Avatar from '$lib/components/ui/avatar';
	export let candidate: Candidates;

	let showPlatformDialog = false;
</script>

<Button class="bg-mainred active:bg-clicked" on:click={() => (showPlatformDialog = true)}
	>PLATFORM</Button
>

<AlertDialog.Root bind:open={showPlatformDialog}>
	<AlertDialog.Content class=" max-w-[700px]">
		<AlertDialog.Header>
			<Avatar.Root class="h-[250px] w-full rounded-[20px]">
				<Avatar.Image src={candidate.candidatePhoto} alt="@shadcn" />
				<Avatar.Fallback>CN</Avatar.Fallback>
			</Avatar.Root>

			<AlertDialog.Title>{candidate.candidateName}'s Platform</AlertDialog.Title>
			<AlertDialog.Description class="max-h-[250px] overflow-auto "
				>{candidate.candidateMotto}
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Action>Back</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
