<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<h1>Buttons Component Testing</h1>

<div class="flex max-w-[200px] flex-col space-y-4 p-4">
	<!-- Buttons are called with different "variant" parameters to call different styles for a button -->
	<Button>Default</Button>
	<Button variant="primary">Primary</Button>
	<Button variant="primaryOutline">Primary Outline</Button>
	<Button variant="secondary">Secondary</Button>
	<Button variant="secondaryOutline">Secondary Outline</Button>
	<Button variant="danger">Danger</Button>
	<Button variant="dangerOutline">Danger Outline</Button>
	<Button variant="super">Super</Button>
	<Button variant="superOutline">Super Outline</Button>
	<Button variant="ghost">Ghost</Button>
	<Button variant="sidebar">Sidebar</Button>
	<Button variant="sidebarOutline">Sidebar Outline</Button>
</div>
