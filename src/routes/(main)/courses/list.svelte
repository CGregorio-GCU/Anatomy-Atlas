<script lang="ts">
	import { courses, userProgress } from '../../../db/schema';

	import Card from './card.svelte'; // Assuming you have a Card component

	// Define props for the List component
	export let coursesData: { id: number; title: string; imageSrc: string }[] = [];
	export let activeCourseId: number | null = null;
</script>

<div class="grid grid-cols-2 gap-4 pt-6 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
	<!-- Foreach course in coursesData -->
	{#each coursesData as course}
		<Card
			id={course.id}
			title={course.title}
			imageSrc={course.imageSrc}
			onClick={() => {}}
			active={course.id === activeCourseId}
			disabled={false}
		/>
	{/each}
</div>
