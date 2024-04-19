<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index';
	import { Button } from '$lib/components/ui/button/index';
	import type { Candidates } from '$lib/types';

	export let candidate: Candidates;

	let showPlatformDialog = false;
</script>

<Button class="bg-mainred active:bg-clicked" on:click={() => (showPlatformDialog = true)}
	>PLATFORM</Button
>

<AlertDialog.Root bind:open={showPlatformDialog}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>{candidate.candidateName}'s Platform</AlertDialog.Title>
			<AlertDialog.Description class="max-h-[500px] overflow-auto">
				candidate.candidateMotto Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Exercitationem quaerat non vel doloribus nostrum, soluta nulla, suscipit amet ab pariatur ea
				debitis eos modi, consectetur enim. Dignissimos vel accusantium dolor blanditiis, accusamus
				dolorum fugit deleniti eum. Minus eveniet quo natus. Omnis officiis exercitationem cumque
				expedita quasi, pariatur officia. Ex optio explicabo maxime nihil dolores adipisci ducimus.
				Fuga modi omnis quo. Animi modi quas, ipsam inventore provident voluptas expedita
				consequuntur commodi eaque autem excepturi. Quaerat modi animi esse fuga officia illo hic
				aliquam repudiandae quod perspiciatis qui, eaque accusantium? Veniam iure fuga pariatur
				repudiandae delectus magni voluptates fugiat nemo hic animi, harum dignissimos, tenetur
				dolorem illo quidem ratione eos voluptate earum quasi! Neque omnis at eum ipsam sint
				accusantium, deserunt praesentium unde impedit quam nulla reiciendis asperiores, similique
				nemo molestias alias nisi odit distinctio iste sit laborum nihil? Quae vel numquam quia modi
				dolores placeat odit, et veniam vero maxime incidunt distinctio magnam odio impedit
				suscipit. Adipisci iusto illum non. Quisquam nihil sunt in dicta architecto. Commodi
				inventore officia maiores ex esse quibusdam minima maxime molestias rem eveniet ullam nam
				vitae ratione assumenda, distinctio, velit, quam voluptatum nemo? Possimus tempora quas et
				incidunt facere necessitatibus praesentium ex dolor rem error, deserunt architecto est, sit
				corrupti sed porro iure harum! Laborum numquam veritatis velit aut non dolor quos corporis
				harum tempore animi. Iure, quam dignissimos saepe molestiae hic architecto distinctio nam
				soluta blanditiis aut magni, quidem ipsa iusto minus quibusdam nostrum! Cum corporis fugit
				reprehenderit recusandae esse corrupti saepe eius culpa quaerat doloribus, possimus, ullam
				nihil dolorem. Corrupti et nisi magnam eum repudiandae fuga expedita ut iure commodi soluta
				id repellendus quae laborum architecto incidunt dolores inventore consequuntur, culpa quos
				quam nulla officia, ea dicta nam? Sit distinctio modi numquam ipsam consequatur ex ducimus
				laboriosam accusamus iusto doloremque impedit, minima ipsum reiciendis!
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Action>Back</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
