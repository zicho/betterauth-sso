<script lang="ts">
	let { data } = $props();
	let { user } = $state(data);
</script>

<div class="prose max-w-none p-4">
	<h1>Welcome to your protected app, {user.name}</h1>
	<ul>
		<li>id: {user.id}</li>
		<li>email: {user.email}</li>
	</ul>
</div>
