<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { enhance } from '$app/forms';

	let files: FileList | undefined = undefined;
	let showUploadDialog = false;

	$: !showUploadDialog && (files = undefined);

	import Papa from 'papaparse';
	import { toast } from 'svelte-sonner';
	import type { MigrationFile } from '$lib/types';

	let isParsing = false;
	let convertedArray: MigrationFile[] | undefined = undefined;

	const handleFileChange = () => {
		if (files && files.length) {
			isParsing = true;

			const reader = new FileReader();
			reader.onload = (e: ProgressEvent<FileReader>) => {
				Papa.parse(e.target?.result as string, {
					header: true,
					complete: (results: Papa.ParseResult<MigrationFile>) => {
						isParsing = false;
						results.data.pop();
						convertedArray = results.data;
					},
					error: (error: any) => {
						isParsing = false;
						toast.error('Error converting', { description: 'Make sure you have a proper format.' });
					}
				});
			};

			reader.readAsText(files[0]);
		}
	};
</script>

<Button
	class="rounded-[10px] bg-mainred text-[14px]  font-semibold"
	on:click={() => (showUploadDialog = true)}>Import Data</Button
>

<AlertDialog.Root bind:open={showUploadDialog}>
	<AlertDialog.Content>
		<AlertDialog.Header class="">
			<AlertDialog.Title>Upload Bulk Voter Information</AlertDialog.Title>
			<AlertDialog.Description>
				Make sure that you have a proper CSV file and format.
			</AlertDialog.Description>
		</AlertDialog.Header>

		<div class="mt-[20px]">
			<p class={isParsing ? 'text-[14px]' : 'hidden'}>Converting...</p>

			<input
				class={isParsing ? 'hidden' : ''}
				name="migrationFile"
				type="file"
				bind:files
				accept=".csv"
				on:change={handleFileChange}
			/>
		</div>
		<form method="post" action="APIS?/migrationAction" enctype="multipart/form-data" use:enhance>
			<input name="migrationData" type="hidden" value={JSON.stringify(convertedArray)} />
			<AlertDialog.Footer>
				<AlertDialog.Cancel disabled={isParsing}>Cancel</AlertDialog.Cancel>
				{#if files && files.length && !isParsing}
					<Button type="submit" class=" bg-mainred text-[14px] font-semibold">Upload</Button>
				{/if}
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
