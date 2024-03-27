<script lang="ts">
	import { Button } from '$lib/components/ui/button';
  import { Loader } from "lucide-svelte";
  // Clerk for authentication
  // https://github.com/markjaquith/clerk-sveltekit
	import ClerkLoading from 'clerk-sveltekit/client/ClerkLoading.svelte'
	import ClerkLoaded from 'clerk-sveltekit/client/ClerkLoaded.svelte'
	import SignInButton from 'clerk-sveltekit/client/SignInButton.svelte'
	import UserButton from 'clerk-sveltekit/client/UserButton.svelte'
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte'
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte'
</script>

<div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="h-20 w-full border-b-2 border-slate-200 px-4">
        <div class="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
            <div class="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                <img src="/atlas.svg" height={40} width={40} alt="Mascot" />
                <h1 class="text-2xl font-extrabold text-cyan-600 tracking-wide">
                    Anatomy Atlas
                </h1>
            </div>
            <!-- Clerk checks if the page is loading -->
            <ClerkLoading>
              <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
            </ClerkLoading>
            <ClerkLoaded>
              <!-- If the user is signed in, display signout button -->
              <SignedIn>
                <UserButton
                  afterSignOutUrl="/"
                />
              </SignedIn>
              <!-- If the user is signed out, display a sign in button -->
              <SignedOut>
                <SignInButton
                  mode="modal"
                  afterSignInUrl="/learn"
                  afterSignUpUrl="/learn"
                >
                  <Button size="lg" variant="ghost">
                    Login
                  </Button>
                </SignInButton>
              </SignedOut>
            </ClerkLoaded>
          </div>
    </header>

    <!-- Actual contents -->
    <main class="flex-1 flex flex-col items-center justify-center">
        <!-- Slot places children elements here (like would be seen in the +page.svelte file) -->
        <slot />
    </main>

    <!-- Footer -->
    <footer class="lg:block h-20 w-full border-t-2 border-slate-200 p-2">
        <div class="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
            <Button size="lg" variant="ghost" class="w-full">
              <img 
                src="/bone.svg" 
                alt="Skeletal System" 
                height={32} 
                width={40}
                class="mr-4 rounded-md"
              />
              Skeletal System
            </Button>
            <Button size="lg" variant="ghost" class="w-full">
              <img 
                src="/nerve.svg" 
                alt="Nervous System" 
                height={32} 
                width={40}
                class="mr-4 rounded-md"
              />
              Nervous System
            </Button>
            <Button size="lg" variant="ghost" class="w-full">
              <img
                src="/brain.svg" 
                alt="Organ System" 
                height={32} 
                width={40}
                class="mr-4 rounded-md"
              />
              Organ System
            </Button>
          </div>
    </footer>

</div>
