<script lang="ts">
	import { Check } from 'lucide-svelte';
	import { cn } from '$lib/utils';

	// implicitly define their types
	export let title: string;
	export let imageSrc: string;
	export let id: number;
	export let onClick: (id: number) => void;
	export let disabled: boolean;
	export let active: boolean;
</script>

<div
	on:click={() => onClick(id)}
	class={cn(
		'flex h-full min-h-[217px] min-w-[200px] cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-b-4 p-3 pb-6 hover:bg-black/5 active:border-b-2',
		disabled && 'pointer-events-none opacity-50'
	)}
>
	<div class="min-[24px] flex w-full items-center justify-end">
		<!-- Don't render this unless it's their active course -->
		{#if active}
			<div class="flex items-center justify-center rounded-md bg-green-600 p-1.5">
				<Check class="h-4 w-4 stroke-[4] text-white" />
			</div>
		{/if}
	</div>
	<!-- Course image -->
	<img
		src={imageSrc}
		alt={title}
		height={70}
		width={93.33}
		class="rounded-lg border object-cover drop-shadow-md"
	/>
	<!-- Course name -->
	<p class="mt-3 text-center font-bold text-neutral-700">
		{title}
	</p>
</div>
