<script lang="ts">
    // this emulates the syntax seen from items in the /components/ui folder
    // Those components are from the shadcn ui library
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

    import SidebarItem from "./sidebar-item.svelte";


    //apply properties to the item inside the sidebar
    type $$Props = HTMLAttributes<HTMLDivElement>;
    
    let className: $$Props["class"] = undefined;
    // to be able to use this component in other places (such as mobile-sidebar) we need to export the sidebar
	export { className as class };
</script>

<div
class={cn("flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col", className)}
{...$$restProps}
>
<a href="/learn">
    <div class="pt-8 pl-4 pb-7 flex items-center gap-x-3">
      <img src="/atlas.svg" height={40} width={40} alt="Mascot" />
      <h1 class="text-2xl font-extrabold text-green-600 tracking-wide">
        Anatomy Atlas
      </h1>
    </div>
</a>
  <div class="flex flex-col gap-y-2 flex-1">
    <SidebarItem 
      label="Learn" 
      href="/learn"
      iconSrc="/learn.svg"
    />
    <SidebarItem 
      label="Leaderboard" 
      href="/leaderboard"
      iconSrc="/leaderboard.svg"
    />
    <SidebarItem 
      label="quests" 
      href="/quests"
      iconSrc="/quests.svg"
    />
    <SidebarItem 
      label="shop" 
      href="/shop"
      iconSrc="/shop.svg"
    />
  </div>
  <div class="p-4">
    <!-- <ClerkLoading>
      <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
    </ClerkLoading>
    <ClerkLoaded>
      <UserButton afterSignOutUrl="/" />
    </ClerkLoaded> -->
  </div>
</div>