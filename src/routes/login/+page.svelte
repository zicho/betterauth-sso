<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex w-96 flex-col gap-y-4 p-8">
	<form
		use:enhance
		method="POST"
		action="?/github"
		class="w-full"
	>
		<button
			type="submit"
			class="w-full bg-emerald-700 p-4 text-white"
			>Sign in with Github</button
		>
	</form>

	<form use:enhance method="POST" action="?/microsoft">
		<button
			type="submit"
			class="w-full bg-emerald-700 p-4 text-white"
			>Sign in with Microsoft</button
		>
	</form>
</div>
