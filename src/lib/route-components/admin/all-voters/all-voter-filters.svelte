<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
</script>

<div class="">
	<Tabs.Root value="voted" class="w-full">
		<Tabs.List class="">
			<Tabs.Trigger class="w-full" value="voted">Voted (1)</Tabs.Trigger>
			<Tabs.Trigger class="w-full" value="unvoted">Unvoted (20)</Tabs.Trigger>
		</Tabs.List>

		<Tabs.Content value="voted" class="mt-[30px] "></Tabs.Content>
		<Tabs.Content value="unvoted" class="mt-[30px]"></Tabs.Content>
	</Tabs.Root>
</div>
