<script lang="ts">
	import * as RadioGroup from '$lib/components/ui/radio-group/index';
	import { Label } from '$lib/components/ui/label/index';
	import { Button } from '$lib/components/ui/button';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
</script>

<div class="rounded-[20px] bg-subwhite p-[40px]">
	<p class="text-[16px] font-semibold text-mainred xs:text-[18px] sm:text-[20px] lg:text-[22px]">
		CANDIDATES FOR PRESIDENT
	</p>

	<p class="text-[14px] font-semibold text-mainred">YOU MAY SELECT 1 CANDIDATE</p>

	<div class="mt-[20px] max-h-[400px] overflow-auto">
		{#each Array(20) as sample}
			<RadioGroup.Root value="comfortable" class="flex items-center gap-[20px] p-[20px]">
				<div class="flex items-center space-x-2">
					<RadioGroup.Item value="default" id="r1" />
					<Button class="bg-mainred active:bg-clicked">PLATFORM</Button>
				</div>
				<Avatar.Root>
					<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>

				<p class="text-[14px] font-semibold text-mainred xs:text-[16px] sm:text-[18px]">
					Eviota, Mike John Baguinaon
				</p>
			</RadioGroup.Root>
		{/each}
	</div>
</div>
