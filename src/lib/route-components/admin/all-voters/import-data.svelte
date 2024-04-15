<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { enhance } from '$app/forms';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	let files: FileList | undefined = undefined;
	let showUploadDialog = false;
	let classificationValue = '';

	import Papa from 'papaparse';
	import { toast } from 'svelte-sonner';
	import type { MigrationFile, ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { invalidateAll } from '$app/navigation';

	let isParsing = false;
	let convertedArray: MigrationFile[] | undefined = undefined;

	//handle client convertion because server overloading is sick
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

	interface MigrationDataVal {
		classification: string[];
		migrationData: string[];
	}

	let formActionErrors: MigrationDataVal | null = null;
	let migrationLoader = false;
	const migrationActionNews: SubmitFunction = () => {
		migrationLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<{ msg: string; errors: MigrationDataVal }>;

			switch (status) {
				case 200:
					invalidateAll();
					formActionErrors = null;
					toast.success('Migration Data', { description: msg });
					migrationLoader = false;
					showUploadDialog = false;
					break;

				case 400:
					formActionErrors = errors;
					migrationLoader = false;

					break;

				case 401:
					formActionErrors = null;
					toast.error('Migration Data', { description: msg });
					migrationLoader = false;
					console.log(msg);
					break;
			}
			await update();
		};
	};

	$: !showUploadDialog && ((files = undefined), (formActionErrors = null));
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
				Make sure that you have a proper CSV file format.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<form
			method="post"
			action="APIS?/migrationAction"
			enctype="multipart/form-data"
			use:enhance={migrationActionNews}
		>
			<div class="mt-[20px] flex flex-col gap-[20px]">
				<p class={isParsing ? 'text-[14px]' : 'hidden'}>Converting...</p>

				<div class="">
					<RadioGroup.Root bind:value={classificationValue}>
						<Label>Choose Classification</Label>
						<div class="flex items-center space-x-2">
							<RadioGroup.Item value="highschool" id="highschool" />
							<Label for="highschool">High School</Label>
						</div>
						<div class="flex items-center space-x-2">
							<RadioGroup.Item value="elementary" id="elementary" />
							<Label for="elementary">Elementary</Label>
						</div>
						<RadioGroup.Input name="spacing" />
					</RadioGroup.Root>
					{#each formActionErrors?.classification ?? [] as errorMsg}
						<p class="text-[14px] text-red-600">{errorMsg}</p>
					{/each}
				</div>

				<div class="">
					<input
						class={isParsing ? 'hidden' : ''}
						type="file"
						bind:files
						accept=".csv"
						on:change={handleFileChange}
					/>
					{#each formActionErrors?.migrationData ?? [] as errorMsg}
						<p class="text-[14px] text-red-600">{errorMsg}</p>
					{/each}
				</div>
			</div>
			<input name="classification" type="hidden" value={classificationValue} />
			<input name="migrationData" type="hidden" value={JSON.stringify(convertedArray)} />
			<AlertDialog.Footer>
				<AlertDialog.Cancel disabled={isParsing || migrationLoader}>Cancel</AlertDialog.Cancel>
				{#if files && files.length && !isParsing}
					<Button
						type="submit"
						disabled={migrationLoader}
						class="{migrationLoader ? 'cursor-not-allowed bg-mainred/50' : 'bg-mainred'}
						text-[14px] font-semibold"
					>
						{#if migrationLoader}
							Uploading...
						{:else}
							Upload
						{/if}
					</Button>
				{/if}
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
