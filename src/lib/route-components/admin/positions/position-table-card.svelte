<script lang="ts">
</script>

<div class=" mt-[10px] text-[14px] font-semibold text-white xs:text-[16px] md:text-[18px]">
	<div class="flex w-full justify-between border-b-[1px] border-b-subwhite bg-mainred p-[10px]">
		<div class=" grid w-full grid-cols-[1fr,190px,190px] gap-[20px] overflow-auto truncate">
			<div class="grid overflow-auto">
				<p class="">Positions</p>
			</div>
			<div class="grid overflow-auto">
				<p class="">Date Created</p>
			</div>

			<div class="grid overflow-auto">
				<p class="">Options</p>
			</div>
		</div>
	</div>

	<div class="max-h-[800px] w-full overflow-auto truncate bg-subwhite">
		{#each Array(20) as voterObj}
			<div
				class=" grid w-full grid-cols-[1fr,190px,190px] gap-[20px] border-b-[1px] border-mainred px-[10px] py-[5px] text-mainred"
			>
				<div class="grid overflow-auto">
					<p>Sample Name</p>
				</div>

				<div class="grid overflow-auto">
					<p>Sample ADAS</p>
				</div>

				<div class="grid overflow-auto">
					<p>Nov 6 1996</p>
				</div>

				<div class="w-full">
					<div class="flex w-full items-center gap-[10px]">
						<!-- <UpdateVoterContent {voterObj} />
						<DeleteVoter {voterObj} /> -->
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
