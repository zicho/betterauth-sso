<script lang="ts">
	import { enhance } from '$app/forms';
	import { fade } from 'svelte/transition';

	let { data } = $props();
	let { user } = $state(data);

	let loading = $state(false);
	let showFinishText = $state(false);

	$effect(() => {
		if (showFinishText) {
			const timeout = setTimeout(() => {
				showFinishText = false;
			}, 2000);

			return () => clearTimeout(timeout);
		}
	});
</script>

<div class="prose max-w-none p-4">
	<h1>Welcome to your protected app, {user.name}</h1>
	<ul>
		<li>id: {user.id}</li>
		<li>email: {user.email}</li>
	</ul>

	<form
		use:enhance={() => {
			loading = true;

			return () => {
				loading = false;
				showFinishText = true;
			};
		}}
		method="post"
		class="flex max-w-xs flex-col gap-y-4"
	>
		<input
			class="border border-gray-900 p-4"
			required
			name="first_name"
		/>
		<input
			class="border border-gray-900 p-4"
			required
			name="last_name"
		/>
		<select
			name="gender"
			class="border border-gray-900 p-4"
		>
			<option value="man">Man</option>
			<option value="woman">Woman</option>
			<option value="other">Other</option>
		</select>
		<button
			disabled={loading}
			type="submit"
			class="{!loading
				? 'bg-emerald-700'
				: 'bg-emerald-800'}  p-4 text-white"
			>{!loading ? 'Add person' : 'Working...'}</button
		>
		{#if showFinishText}
			<p
				class="text-center text-emerald-800"
				transition:fade
			>
				Person was created!
			</p>{/if}
	</form>
</div>
