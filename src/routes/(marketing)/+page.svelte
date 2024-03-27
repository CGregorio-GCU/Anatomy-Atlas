<script lang="ts">
	// Button component
	import { Button } from '$lib/components/ui/button';
	// Loader
	import { Loader } from 'lucide-svelte';
	// Clerk for authentication
	import ClerkLoading from 'clerk-sveltekit/client/ClerkLoading.svelte';
	import ClerkLoaded from 'clerk-sveltekit/client/ClerkLoaded.svelte';
	import SignInButton from 'clerk-sveltekit/client/SignInButton.svelte';
	import SignUpButton from 'clerk-sveltekit/client/SignUpButton.svelte';
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
</script>

<div
	class="mx-auto flex w-full max-w-[988px] flex-1 flex-col items-center justify-center gap-2 p-4 lg:flex-row"
>
	<div class="relative mb-8 h-[240px] w-[240px] lg:mb-0 lg:h-[424px] lg:w-[424px]">
		<!-- <img src="/hero.svg" alt="Hero" /> -->
	</div>
	<div class="flex flex-col items-center gap-y-8">
		<h1 class="max-w-[480px] text-center text-xl font-bold text-neutral-600 lg:text-3xl">
			Learn, practice, and master concepts about the human body with Anatomy Atlas.
		</h1>
		<div class="flex w-full max-w-[330px] flex-col items-center gap-y-3">
			<!-- If clerk isn't ready, import a loader -->
			<ClerkLoading>
				<Loader className="h-5 w-5 text-muted-foreground animate-spin" />
			</ClerkLoading>
			<!-- If clerk is loaded, display the contents -->
			<ClerkLoaded>
				<!-- If signed out, display a sign up / sign in button -->
				<SignedOut>
					<SignUpButton mode="modal" afterSignInUrl="/learn" afterSignUpUrl="/learn">
						<Button size="lg" variant="secondary" class="w-full">Get Started</Button>
					</SignUpButton>
					<SignInButton mode="modal" afterSignInUrl="/learn" afterSignUpUrl="/learn">
						<Button size="lg" variant="primaryOutline" class="w-full">
							I already have an account
						</Button>
					</SignInButton>
				</SignedOut>
				<!-- if signed in, let the user log in regardless -->
				<SignedIn>
					<Button size="lg" variant="secondary" class="w-full">
						<a href="/learn"> Continue Learning </a>
					</Button>
				</SignedIn>
			</ClerkLoaded>
		</div>
	</div>
</div>
