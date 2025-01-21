# OAuth and SSO Integration with SvelteKit and Better Auth
## Template to integrate SSO with Better Auth using an OAuth provider like github or microsoft.

Before you start, make sure you have a Better Auth instance configured. If you haven't done that yet, check out the [installation](https://www.better-auth.com/docs/installation).

### Example: Hiding your entire app behind an OAuth provider

To secure your entire application with an OAuth login provider, refer to the following example. When done, your entire app will be protected behind your chosen OAuth provider.

#### Step 1: Set up auth

For this example we will be using Github and Microsoft social providers. 

```ts title="auth.ts"
export const auth = betterAuth({
  database: new Database("./sqlite.db"), // SQLite used in this example
  socialProviders: {
    github: {
      clientId: PRIVATE_GITHUB_CLIENT_ID,
      clientSecret: PRIVATE_GITHUB_CLIENT_SECRET,
      redirectURI: "http://localhost:5173/api/auth/callback/github"
    },
    microsoft: {
      clientId: PRIVATE_AZURE_AD_CLIENT_ID,
      clientSecret: PRIVATE_AZURE_AD_CLIENT_SECRET,
      tenantId: PRIVATE_AZURE_AD_TENANT_ID,
      redirectURI: "http://localhost:5173/api/auth/callback/microsoft"
    },
  },
})
```

#### Step 2: Callback endpoint

Better Auth needs to be able to handle the callback, so you need to create a server endpoint.

```ts title="~/src/routes/api/auth/[...all]/+server.ts"
import { auth } from "$lib/auth"; // or wherever your "auth.ts" is located
import { toSvelteKitHandler } from "better-auth/svelte-kit";

const handler = toSvelteKitHandler(auth);
export { handler as GET, handler as POST }
```

#### Step 3: Create authentication hooks

The callback will then be handled by our server hooks.

```ts title="hooks.server.ts"
import { auth } from '$lib/server/auth'; // path to your auth file
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { svelteKitHandler } from 'better-auth/svelte-kit';

const setSessionHook: Handle = async ({ event, resolve }) => {
  // this hooks needs to run first in order to set session properly before running the next hook
  return svelteKitHandler({ auth, event, resolve })
};

const checkAuthHook: Handle = async ({ event, resolve }) => {
  // if user is signed in, session should be here if the setSessionHook hook has been run
  const headers = event.request.headers;
  const session = await auth.api.getSession({
    headers
  });

  if (!session) {
    // redirect if no session is found
    const res = await auth.api.signInSocial({
      body: {
        provider: 'github', // valid entries are "microsoft" and "github"
        callbackURL: '/'
      }
    });

    redirect(302, res.url!);
  }

  // set user data as you wish
  event.locals.user = {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email
  }

  // resolve as usual
  return await resolve(event);
}

export const handle = sequence(setSessionHook, checkAuthHook); // use sequence to run consecutive handle functions
```

When visiting your app, you should now be redirected to whichever auth provider that you configured. Logging in should redirect you back to your app.

#### Step 4: Display user data (optional)

If you want, you can display user data as well.

```ts title="+page.server.ts"
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
  return {
    user: locals.user // load user data from locals (set in hooks)
  };
}) satisfies PageServerLoad;
```

```ts title="+page.svelte"
<script lang="ts">
	let { data } = $props();
	let { user } = $state(data);
</script>

<div class="prose max-w-none p-4">
	<h1>Welcome to your protected app, {user.name}</h1>
	<ul>
		<li>
			id: {user.id}
		</li>
		<li>email: {user.email}</li>
	</ul>
</div>
```

