<script lang="ts">
	import { Button } from '$lib/components/ui/button';

    // implicitly define the types
	export let href :string;
	export let label: string;
	export let iconSrc: string;
</script>

<Button
      variant={"sidebarOutline"}
      class="justify-start h-[52px]"
    >
    <a href={href}>
        <img
        src={iconSrc}
        alt={label}
        class="mr-5"
        height={32}
        width={32}
        />
        {label}
    </a>
</Button>