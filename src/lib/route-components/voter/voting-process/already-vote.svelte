<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
</script>

<Card.Root class="mx-auto mt-[100px] max-w-[800px]">
	<Card.Header>
		<Card.Title
			class="text-center text-[16px] font-semibold text-mainred xs:text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px]"
			>YOU HAVE ALREADY VOTED FOR THIS ELECTION</Card.Title
		>
		<Card.Description class="text-center"
			>You can view your recent votes by clicking view ballot. You can also see the latest votes by
			clicking the View Realtime Result</Card.Description
		>
	</Card.Header>
	<Card.Content class="m-[40px] flex flex-col gap-[20px]">
		<Button>VIEW YOUR BALLOT</Button>
		<Button>VIEW REAL TIME RESULT</Button>
	</Card.Content>
</Card.Root>
