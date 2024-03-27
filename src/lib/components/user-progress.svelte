<script lang="ts">
  import { Button } from "$lib/components/ui/button"
  import { InfinityIcon } from "lucide-svelte"

  // Dynamically defining types to use as src or alt in the app
  interface ActiveCourse {
    imageSrc: string;
    title: string
  }

  export let activeCourse: ActiveCourse;
	export let points: number;
	export let hearts: number;
	export let hasActiveSubscription: Boolean;
</script>

<div class="flex items-center justify-between gap-x-2 w-full">
    <a href="/courses">
      <Button variant="ghost">
        <img
          src={activeCourse.imageSrc}
          alt={activeCourse.title}
          class="rounded-md border"
          width={32}
          height={32}
        />
      </Button>
    </a>
    <a href="/shop">
      <Button variant="ghost" class="text-orange-500">
        <img src="/points.svg" height={28} width={28} alt="Points" class="mr-2" />
        {points}
      </Button>
    </a>
    <a href="/shop">
      <Button variant="ghost" class="text-rose-500">
        <img src="/heart.svg" height={22} width={22} alt="Hearts" class="mr-2" />
        <!-- this might not get implemented haha -->
        {#if hasActiveSubscription}
          <InfinityIcon class="h-4 w-4 stroke-[3]" />
        {:else}
          {hearts}
        {/if}
      </Button>
    </a>
  </div>