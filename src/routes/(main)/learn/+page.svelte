<script>
    import FeedWrapper from "$lib/components/feed-wrapper.svelte";
    import UserProgress from "$lib/components/user-progress.svelte";
    import StickyWrapper from "$lib/components/sticky-wrapper.svelte";

    import {Button} from "$lib/components/ui/button";
    import {ArrowLeft} from "lucide-svelte"
</script>


<div class="flex flex-row-reverse gap-[48px] px-6">
    <StickyWrapper>
      <UserProgress
        activeCourse={{ title: "Skeletal", imageSrc: "/bone.svg" }}
        hearts={5}
        points={100}
        hasActiveSubscription={false}
      />
    </StickyWrapper>
    <FeedWrapper>
        <div class="sticky top-0 bg-white pb-3 lg:pt-[28px] lg:mt-[-28px] flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50">
            <a href="/courses">
              <Button variant="ghost" size="sm">
                <ArrowLeft class="h-5 w-5 stroke-2 text-neutral-400" />
              </Button>
            </a>
            <h1 class="font-bold text-lg">
              Skeletal System
            </h1>
            <div />
          </div>
        </FeedWrapper>
  </div>