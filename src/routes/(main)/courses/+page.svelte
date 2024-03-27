<script lang="ts">
	import { onMount } from 'svelte';
	// import { getCourses, getUserProgress } from "../../../db/queries.ts"
	import { getCourses } from '../../../db/queries.ts';

	import List from './list.svelte';

	// Define the type for a course
	interface Course {
		id: number;
		title: string;
		imageSrc: string;
	}

	// let courses: Course[] = [];

	let coursesData = [
		{
			id: 1,
			title: 'Skeletal System',
			imageSrc: './bone.svg'
		},
		{
			id: 2,
			title: 'Nervous System',
			imageSrc: './nerve.svg'
		},
		{
			id: 3,
			title: 'Organ System',
			imageSrc: './brain.svg'
		}
		// Add more courses as needed
	];
	// Fetch courses when the component is mounted
	onMount(async () => {
		courses = await getCourses();
	});
</script>

<!-- Display anatomy courses based on the relevant course data -->
<div class="mx-auto h-full max-w-[912px] px-3">
	<h1 class="text-2xl font-bold text-neutral-700">Anatomy Courses</h1>
	<List {coursesData} activeCourseId={1} />
</div>
